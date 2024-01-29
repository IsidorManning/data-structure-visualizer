import { BinaryTreeProxy } from "./binary_tree_proxy.js";
import { ElementCreater } from "../utils.js";

class BinaryTree {
  // This class is used to visualize the binary tree data structure 
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
  // to the binary tree visualiation (such as creating a header) 
  // before it shows the visualization to the user. 
  constructor(data) {
    this.data = data;
    this.elementCreator = new ElementCreater();

    this.instance = new BinaryTreeProxy();
    // 'this.pointer' will be a pointer to the C++ proxy class 
    // (in 'binary_tree.cpp'). From initilization of the
    // 'BinaryTree' class, it will be set to null since we 
    // will get the pointer later on by using the 'getPointer'
    // function from the javascript proxy class, 'BinaryTreeProxy'
    // (in 'binary_tree_proxy.js').
    this.pointer = null;
  }

  build(containerDomElement) {
    // Hide the container from the user while we build out the
    // visualization in it.
    containerDomElement.style.opacity = "0";

    this.pointer = this.instance.getPointer();

    // In this first loop we feed all of our data to the binary tree
    // data structure. 
    for (let i = 0; i < this.data.length; ++i) {
      var currentData = this.data[i];
      this.instance.insert(this.pointer, currentData);
    }

    // Before we start with the visualization, we set some variables:
    // 'dataTraversal' returns a javascript array which represents
    // in order traversal (also known as a first-breadth traversal).
    // 
    // 'maxNodesAllowed' is a counter for keeping track of how many
    // data nodes are allowed in the current row of the binary tree.
    // It starts from 1 and gets multiplied by 2 each time we descend
    // to the next row.
    // 
    // 'currentRow' is self-expanatory but it is essentially the
    // current 'div' element which represents the current row of our
    // binary tree in which we add our data elements. 
    const dataTraversal = this.instance.levelOrderTraversal(this.pointer, this.data.length);
    let maxNodesAllowed = 1;
    let currentRow = this.elementCreator.binaryTreeRow();

    for (let i = 0; i < this.data.length; ++i) {
      const currentRowCount = currentRow.childElementCount;
      let currentData = dataTraversal[i];

      if (currentRowCount == maxNodesAllowed) {
        // If the current row contains the max amount of data elements,
        // we need to descend and create a new row in which we can
        // add the rest of data elements in.
        const newRow = this.elementCreator.binaryTreeRow();
        containerDomElement.appendChild(currentRow);
        currentRow = newRow;
        
        // Add the current data element to the new row we just created
        const circleElement = this.elementCreator.circle(currentData);
        currentRow.appendChild(circleElement);

        // As we established before, 'maxNodesAllowed' gets multiplied 
        // by 2 each time we descend to the next row.
        maxNodesAllowed *= 2;
      } else {
        // If we still have space left in our current binary tree row,
        // we add another data element to it.
        const circleElement = this.elementCreator.circle(currentData);
        currentRow.appendChild(circleElement);
      }

      if (i === dataTraversal.length - 1) {
        // In order for our flexbox spacing to work and in order for our
        // visualization too look correct and good, we need to fill
        // our last binary tree row (the bottom row) with as many
        // nodes as necessary until it becomes full). These extra
        // nodes that gets added will be invisible and instead of any
        // data being contained in their inner html, they will have
        // a underscore.
        while (maxNodesAllowed != currentRow.childElementCount) {
          const dataElement = this.elementCreator.circle("_");
          dataElement.style.opacity = "0";
          currentRow.appendChild(dataElement);
        }
        containerDomElement.appendChild(currentRow);
      }
    }
    this.reScaleWidth(currentRow); // 'currentRow' is the bottom row.
  }  

  reScaleWidth(bottomRow) {
    // This function is used at the end of the 'this.build' function
    // to ensure that the visualization will look good no matter how
    // many elements gets added in the binary tree. 
    //
    // The inputted 'bottomRow' of the binary tree will ALWAYS be the 
    // widest. So after all elements are added, we simply get 
    // the bottom column's width and set the width of all of the above
    // rows to it.
    const maxWidth = bottomRow.offsetWidth + "px";
    const styleTag = document.createElement('style');
    styleTag.textContent = `.binary-tree-row { width: ${maxWidth}; }`;
    document.head.appendChild(styleTag);
  }

  show(containerDomElement) {
    // Now we show the container in which we now have finished building
    // the visualization in.
    setTimeout(() => { containerDomElement.style.opacity = "1"; }, 400); 

    // This line is crucial: now that we have used the pointer to our
    // C++ data structure to store our data in, we will need to destroy 
    // the pointer. This line simply calls the C++ destructor of the 
    // 'BinaryTree.cpp' class (in 'binary_tree.cpp'). This is done
    // to avoid any memory leaks.
    this.instance.destroy(this.pointer);
  }
}

export { BinaryTree };
