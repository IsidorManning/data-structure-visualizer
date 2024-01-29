import { LinkedListProxy } from "./linked_list_proxy.js";
import { ElementCreater } from "../utils.js";

class LinkedList {
  // This class is used to visualize the linked list data structure
  // and is used within the 'Visualizer' class (in 'visualizer.js').
  // It contains two main functions that are used in the 'Visualizer'
  // class: 'this.build' and 'this.show'.
  //
  // 'this.build': This function generates the visualization within
  // some 'div' container which it takes in as its only parameter.
  // It returns nothing.
  //
  // 'this.show': After the visualization has been 'built' within
  // some 'div' container, this functions makes some last changes 
  // to the linked list visualiation (such as creating a header)
  // before it shows the visualization to the user. 
  constructor(data) {
    this.data = data;
    this.elementCreator = new ElementCreater();

    this.instance = new LinkedListProxy();
    // 'this.pointer' will be a pointer to the C++ proxy class 
    // (in 'linked_list_proxy.cpp'). From initilization of the
    // 'LinkedList' class, it will be set to null since we 
    // will get the pointer later on by using the 'getPointer'
    // function from the javascript proxy class, 'LinkedListProxy'
    // (in 'linked_list_proxy.js').
    this.pointer = null;
  }

  build(containerDomElement) {
    // Hide the container from the user while we build out the
    // visualization in it.
    containerDomElement.style.opacity = "0"; 

    this.pointer = this.instance.getPointer(); 

    // This chunk of code generates the sentinel element and 
    // appends it in the container. This is NOT an element
    // that holds any relevant data but it is a part of how
    // we implement the linked list data structure in the 
    // first place (in 'linked_list.cpp').
    const sentinel = this.elementCreator.sentinel();
    containerDomElement.appendChild(sentinel);

    // We added a element to the container and since we will
    // connect elements with horizontal arrows for this data
    // structure we also create and then append the first arrow 
    // to the container. 
    const arrow = this.elementCreator.rightArrow();
    containerDomElement.appendChild(arrow);

    for (let i = 0; i < this.data.length; ++i) {
      this.instance.insertAtCurrent(this.pointer, this.data[i]);
      
      const currentData = this.instance.getCurrent(this.pointer);
      const dataElement = this.elementCreator.circle(currentData);
      containerDomElement.appendChild(dataElement);

      // We will add a right arrow after all of our newly appended
      // data elements IF we are not at the last element, since then
      // there will be no succeding element.
      if (i < this.data.length - 1) {
        const arrow = this.elementCreator.rightArrow();
        containerDomElement.appendChild(arrow);
      }
    }
  }

  show(containerDomElement) {
    // Now we show the container in which we now have finished building
    // the visualization in.
    setTimeout(() => { containerDomElement.style.opacity = "1"; }, 400); 

    // This line is crucial: now that we have used the pointer to our
    // C++ data structure to store our data in, we will need to destroy 
    // the pointer. This line simply calls the C++ destructor of the 
    // 'LinkedList' class (in 'linked_list.cpp'). This is done to
    // avoid any memory leaks.
    this.instance.destroy(this.pointer); 
  }
}

export { LinkedList };
