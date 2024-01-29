import { QueueProxy } from "./queue_proxy.js";
import { ElementCreater } from "../utils.js";

class Queue {
  // This class is used to visualize the queue data structure and
  // is used within the 'Visualizer' class (in 'visualizer.js').
  // It contains two main functions that are used in the 'Visualizer'
  // class: 'this.build' and 'this.show'.
  //
  // 'this.build': This function generates the visualization within
  // some 'div' container which it takes in as its only parameter.
  // It returns nothing.
  //
  // 'this.show': After the visualization has been 'built' within
  // some 'div' container, this functions makes some last changes 
  // to the queue visualiation (such as creating a header) before
  // it shows the visualization to the user. 
  constructor(data) {
    this.data = data;
    this.elementCreator = new ElementCreater();

    this.instance = new QueueProxy();
    // 'this.pointer' will be a pointer to the C++ proxy class 
    // (in 'queue.cpp'). From initilization of the 'Queue'
    // class, it will be set to null since we will get the
    // pointer later on by using the 'getPointer' function
    // from the javascript proxy class, 'QueueProxy'
    // (in 'queue.js').
    this.pointer = null;
  }

  build(containerDomElement) {
    // Hide the container from the user while we build out the
    // visualization in it.
    containerDomElement.style.opacity = "0";

    this.pointer = this.instance.getPointer(this.data.length);

    // Here we initilize the max nodes allowed for the first column
    // which ALWAYS will be the left column. If the size of our data
    // is even, both of our side columns (the left- and right columnn)
    // will contain exactly the same amount of dataelements. However,
    // if the size of our data is odd, then we will have one additional
    // data element in our left column.
    if (this.data.length % 2 === 0) {
      var maxNodesAllowed = (this.data.length - 2) / 2;
    } else {
      var maxNodesAllowed = (this.data.length - 1) / 2;
    }

    // I'll admit that there is some ambiguity in the context of the
    // 'currentColumn' variable. When we initilize the variable,
    // it will always be the left column since this is the first column
    // that we will start to add data elements in. However, after the
    // left column is full (when the amount of its child elements
    // exceed the 'maxNodesAllowed'), it will be set to the middle column.
    // Similarly, after the middle column is full, it finally be set to 
    // the right column.
    let currentColumn = this.elementCreator.queueLeftSideColumn();
    containerDomElement.appendChild(currentColumn);

    for (let i = 0; i < this.data.length; ++i) {
      this.instance.enqueue(this.pointer, this.data[i]);
      const currentData = this.instance.get_last_enqueued(this.pointer);
      const dataElement = this.elementCreator.circle(currentData);

      if (currentColumn.childElementCount < maxNodesAllowed) {
        // If the current column still has room for more data elements,
        // we add them to it.
        currentColumn.appendChild(dataElement);
      } 
      else if (containerDomElement.childElementCount === 1) {
        // If we make it to this point in the execution of the code,
        // we know that the current column is full and no more data 
        // elements can be added to it. Furthermore, if the 
        // outer 'div' container only has one single child element 
        // (which would be the left column), we now need to create
        // the middle column for our queue visualization. 
        currentColumn = this.elementCreator.queueMiddleColumn();
        containerDomElement.appendChild(currentColumn);
        // The tricky part with our implementation is that we can't
        // simply continuing adding data elements in the middle
        // column until it becomes full (it can only hold two 
        // data elements). This is because the two data entries
        // that should be contained in the middle column aren't
        // adjacent to eachother in the data array. Therefore,
        // at this stage, we can only add the first element of the 
        // middle column. We will add the other data element later.
        //
        // Since we want to use the middle column later to add the
        // last data element, we create the 'middleColumnHolder'.
        var middleColumnHolder = currentColumn; 
        maxNodesAllowed = 1;
        currentColumn.appendChild(dataElement);
      } 
      else if (containerDomElement.childElementCount === 2) {
        // If we make it to this point in the execution of the code,
        // we know that the current column is full and no more data 
        // elements can be added to it. Furthermore, if the outer
        // 'div' container has two child elements (which would
        // be the left column and the middle column), we now need
        // to create the last column for our queue visualization,
        // the right column.
        currentColumn = this.elementCreator.queueRightSideColumn();
        containerDomElement.appendChild(currentColumn);
        // We follow the exact same procedure to reset the value
        // for the 'maxNodesAllowed' as we did initially before
        // we entered the loop.
        if (this.data.length % 2 === 0) {
          maxNodesAllowed = (this.data.length - 2) / 2;
        } else {
          maxNodesAllowed = (this.data.length - 2) / 2 - 1;
        }
        currentColumn.appendChild(dataElement);
      }
      else {
        // At last, we are now ready to add final data element of our 
        // middle column. We reset the 'currentColumn' to the middle
        // column.
        currentColumn = middleColumnHolder;
        currentColumn.appendChild(dataElement);
      }
    }
    this.reScaleHeight();
  }

  reScaleHeight() {
    // This function is used at the end of the 'this.build' function
    // to ensure that the visualization will look good no matter how
    // many elements gets added in the queue. 
    //
    // The left column of the queue will ALWAYS contain the most amount
    // of data elements. So after all elements are added, we simply get 
    // the left column's height and set the height of the middle- and
    // right columns to it. 
    const leftColumn = document.getElementById("queue-column-left-side");
    const maxHeight = leftColumn.offsetHeight + "px";
    document.getElementById("queue-column-right-side").style.height = maxHeight;
    document.getElementById("queue-column-middle").style.height = maxHeight;
  }

  show(containerDomElement) {
    // We add a short description after the queue visualization in the 
    // 'mainBody'container element which tells the user where their queue 
    // starts and ends, as well as how to navigate through the queue; 
    // we do this via showing a picture of arrows going in a circular,  
    // clockwise way, since this is the way to navigate through the queue.
    const queueFront = this.instance.peek(this.pointer);
    const queueBack = this.instance.get_last_enqueued(this.pointer);
    const description = document.createElement("h2");
    description.className = "font queue-description";
    description.innerHTML = "The queue starts at the upper node in the middle column with a value of " + queueBack + " (back) and ends at the upper node in the left column node with a value of " + queueFront + " (front). Let the arrows guide you.";
    const mainBody = document.getElementById("main-body");
    mainBody.appendChild(description);
    // In the next chunk of code we add the image of circular arrows.
    const arrowsImgUrl = "./assets/clockwise-arrows.png";
    const img = this.elementCreator.standardImage(arrowsImgUrl, "queue-arrows");
    mainBody.appendChild(img);

    // Now we show the container in which we now have finished building
    // the visualization in.
    setTimeout(() => { containerDomElement.style.opacity = "1"; }, 400); 

    // This line is crucial: now that we have used the pointer to our
    // C++ data structure to store our data in, we will need to destroy 
    // the pointer. This line simply calls the C++ destructor of the 
    // 'Queue' class (in 'queue.cpp'). This is done to avoid any 
    // memory leaks.
    this.instance.destroy(this.pointer);
  }
}

export { Queue };
