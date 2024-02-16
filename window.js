import Visualizer from "./visualizer.js";
import { ElementCreater } from "./utils.js";

class Window {
  // The 'Window' class is used to manipulate the menu-window that the user see by
  // changing the main html ('index.html') and the styling of certain elements 
  // based on user actions and other events. 
  //
  // When I say "menu-window" here, I refer to the functionality and the visual 
  // elements that a user interacts with prior to visualizing some data structure.
  // For instance, this class helps with displaying data structure options that
  // the user can chose from, the input array where the user inputs their data, and
  // the back button which simply reloads the page.
  //
  // The approach used in this project is that we don't have multiple html files
  // for certain pages such as the menu page and the page where you input your data. 
  // Instead, we dynamically manipulate one single html which is the 'index.html'.
  // Again, this class is only concerned with dynamically changeing the DOM prior
  // the actual visualization of datastructures.
  constructor() {
    // The visualizer is the class that is concerned with visualizing and 
    // manipulating the 'indes.html' only for visualizing some data structure,
    // given some data.
    this.visualizer = new Visualizer();
    this.elementCreator = new ElementCreater();
    
    // The data is inputted in an input element that is initially created
    // in the 'app.js' file. The data will be 'null' from the start of
    // class initialization but when we call the 'handleUserInput', we
    // reasign the actual data to this variable.
    this.data = null;

    this.dataStructures = [
        ["Linked List", this.visualizer.linkedList.bind(this.visualizer)], 
        ["Binary Tree", this.visualizer.binaryTree.bind(this.visualizer)],
        ["Circular Queue", this.visualizer.queue.bind(this.visualizer)], 
    ];
  }

  handleUserInput() {   
    event.preventDefault();

    const input = document.getElementById("input");
    const description = document.getElementById("description");
    const inputPrompt = document.getElementById("input-prompt");

    // At this point, the 'input' element will contain the 
    // stringified version of the data the user inputted.
    this.data = input.value;

    // Here we perform simple data validation using the 'this.validateInput'
    // function. Then we manipulate the 'inputPrompt' based on the output
    // in order to handle potential error messages.
    if (this.validateInput(this.data) === false) {
      inputPrompt.innerHTML = "That doesn't look like valid data..."
      setTimeout(() => {
        inputPrompt.innerHTML = "Please Give Me An Array of Integers";
        input.value = "";
      }, 2500);
    } 

    else {
      this.displayBackButton("Try Again");

      document.getElementById("input").remove();
      document.getElementById("description").remove();

      this.displayDataStructures(); 
    }
  }

  validateInput(userInput) {
    var regexPattern = /^[0-9\s,()\[\]{}]+$/; 
    if (regexPattern.test(userInput)) return true;  
    else return false; 
  }

  displayBackButton(name) {
    const mainBody = document.getElementById("main-body");
    const button = this.elementCreator.button(name, this.reload);
    mainBody.appendChild(button);

    // Initially we have translated the button to the right so that it ends
    // up being off-screen. We set a timer and then smoothly translates the
    // button so that it appears on the screen. Again, this is because it
    // is more visually pleasing. 
    setTimeout(() => button.style.transform = "translateX(0px)", 700);
  } 

  reload() {
    location.reload();
  }

  displayDataStructures() {
    // Here we manipulate the input prompt since it now will be used
    // to tell the user to chose between the different data structure options
    const inputPrompt = document.getElementById("input-prompt");
    const promptString = "Please choose one of the following data structures that you would like to visualize.";
    inputPrompt.innerHTML = promptString;

    const optionsContainer = this.elementCreator.standardDiv("datastructures-div");
    optionsContainer.style.opacity = "0";
    const promptBody = document.getElementById("prompt-body");
    promptBody.appendChild(optionsContainer);
    
    this.fillWithDataStructures(optionsContainer);

    // This function returns a paragraph element (p) which 
    // says "Your Array: ", suffixed by the actual inputted
    // data. We create this element so that the user can
    // track what they inputted but also so that we can get access the
    // data later on when we need to preprocess it before feeding it
    // to a data structure.
    const descriptionElement = this.getUserDataDescription();
    promptBody.appendChild(descriptionElement);

    setTimeout(() => { 
      optionsContainer.style.opacity = "1"; 
      descriptionElement.style.opacity = "1";
    }, 200);
  }

  fillWithDataStructures(container) {
    // This functions iterates over the data structures and
    // generate one button for each of them. Then the function
    // adds the buttons to the specified 'container' element.  
    // Here we use the 'this.dataStructures' array previously defined
    // to set the name of the data structure and what should happen
    // when a user click that data structure button (in our case,
    // when a data structure button is clicked, the visualizer class will 
    // take it from there.
    for (let i = 0; i < this.dataStructures.length; ++i) {
      const dataStructureButton = document.createElement("button");
      
      dataStructureButton.innerHTML = this.dataStructures[i][0];
      dataStructureButton.onclick = this.dataStructures[i][1];
      dataStructureButton.className = "ds-button";

      container.appendChild(dataStructureButton);
    }
  }

  getUserDataDescription() {
    const userDataDescription = document.createElement("p");
    userDataDescription.className = "description";
    userDataDescription.id = "description"; 
    userDataDescription.style.opacity = 0;

    const descriptionString = "Your Array: " + this.data;
    userDataDescription.innerHTML = descriptionString;

    return userDataDescription;
  }
}

export default Window
