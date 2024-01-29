class DataHandler {
  getData = () => {
    // We keep the stringified data in the 'description' element after the 
    // user inputted it through the input element. 
    const description = document.getElementById("description");
    const rawStringData = description.innerHTML;
    // We slice the data since the inner html of the "description element"
    // will always look like this: "Your Data: ", followed by what the user
    // actually inputted. This preceding section is redundant for us since we
    // only want the raw data. This is why we slice the data in the next line.
    const sliced = rawStringData.slice(12, rawStringData.length);
    return this.encodeUserData(sliced);
  }

  encodeUserData(rawDataString) {
    // This is the main data encoder which takes a serialized version of 
    // data and which then outputs an array of the data that we can do
    // further processing with. 

    const splitData = this.splitData(rawDataString);
    return this.convertDataToIntegers(splitData);
  }

  splitData(rawDataString) {
    // We create a regular expression (RE) using certain symbols.
    const symbolsAllowed = [",", ";", "|", " ", ":", "[", "]"];
    const pattern = new RegExp("[" + symbolsAllowed
      // In this next line we escape all special characters which
      // might have a special meaning in the context of RE.
      .map(symbol => "\\" + symbol) 
      // After we are donw with this mapping, the symbols (now escaped)
      // are joined into a single string. The pipe character is used
      // as a seperator. lastly, we use the global flag "g" to indicate 
      // that the RE should match all occurences.
      .join("|") + "]", "g");

    // split the data based on the pattern we just defined.
    return rawDataString.split(pattern);
  }

  convertDataToIntegers(dataArrayOfStrings) {
    // here we convert each item, which currently is a string, to an
    // integer. We also use the 'filter' function to remove items 
    // that are not valid integers such as items that now have become
    // 'NaN' after the initial conversion with the 'map' function.
    dataArrayOfStrings = dataArrayOfStrings
      .map(item => parseInt(item))
      .filter(item => !isNaN(item));

    return dataArrayOfStrings;
  }
}

class ElementCreater {
  // This class is used to generate various elements. It is used in
  // almost all classes since we rely a lot on dynamically generating 
  // certain elements.
  //
  // Some functions of this class generates very specific elements such as the
  // 'this.sentinel' function which only is used to generate a sentinel element
  // for the linked list visualization. However, most functions are used
  // to generate general elements that are used throughout all of the 
  // data structure visualizations. For example, the 'this.circle' function
  // is used to generate a circle which, in this context, will represent
  // one data entry in the data structures.
  standardDiv(details) {
    const div = document.createElement("div");
    div.className = details;
    div.id = details;

    return div;
  }

  standardImage(src, className) {
    const img = document.createElement("img");
    img.src = src;
    img.className = className;

    return img;
  }

  circle(name) {
    const circle = document.createElement("div");
    circle.innerHTML = name;
    circle.className = "circle font lighter-blue";
  
    return circle;
  }

  mainHeader(header) {
    const h2 = document.createElement("h2");
    h2.className = "datastructure-header font";
    h2.innerHTML = "Here's how your " + header + " could look like";
  
    return h2;
  }

  dataStructureContainer(className) {
    const div = document.createElement("div");
    div.className = "datastructure-outer-container " + className;
    
    const mainBody = document.getElementById("main-body");
    mainBody.appendChild(div);
  
    return div;
  }

  button(name, onclick) {
    const button = document.createElement("button");
    button.className = "main-button";
    button.id = "main-button";
    button.style.transform = "translateX(200px)";
    button.innerHTML = name;
    button.onclick = onclick;
  
    return button;
  }

  sentinel() {
    const div = document.createElement("div");
    div.innerHTML = "_SENTINEL_";
    div.className = "sentinel font blue";

    return div;
 }

 rightArrow() {
    const arrowContainer = document.createElement("div");
    arrowContainer.className = "arrow-div";

    const arrowStickElement = document.createElement("div");
    arrowStickElement.className = "arrow-stick";
    arrowContainer.append(arrowStickElement);

    const arrowHeadElement = document.createElement("div");
    arrowHeadElement.className = "arrow-head";
    arrowContainer.append(arrowHeadElement);

    return arrowContainer;
 }
 
  binaryTreeRow() {
    const div = this.standardDiv("binary-tree-row");
    
    return div;
  }

  queueLeftSideColumn() {
    const div = this.standardDiv("queue-column-left-side");

    return div;
  }

  queueMiddleColumn() {
    const div = this.standardDiv("queue-column-middle");

    return div;
  }

  queueRightSideColumn() {
    const div = this.standardDiv("queue-column-right-side");

    return div;
  }
}

function makeDraggable(element) {
  // this nested function provides the ability for an element
  // (which it takes as its only parameter) to become draggable.
  // This means that a user can drag the 'element' up and down
  // without the need to manually toggle the X and Y scrollbars
  // and scroll to their desired position in the div.

  // Initilize the positions
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  element.onmousedown = function (event) {
    event.preventDefault();
    pos3 = event.clientX;
    pos4 = event.clientY;

    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  };

  function elementDrag(event) {
    event.preventDefault();
    pos1 = pos3 - event.clientX;
    pos2 = pos4 - event.clientY;
    pos3 = event.clientX;
    pos4 = event.clientY;

    // Calculate the new position
    let newTop = element.scrollTop + pos2;
    let newLeft = element.scrollLeft + pos1;

    // Update the scroll position
    element.scrollTop = newTop;
    element.scrollLeft = newLeft;
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

export { DataHandler, ElementCreater, makeDraggable };
