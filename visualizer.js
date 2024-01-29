import { DataHandler, ElementCreater, makeDraggable } from "./utils.js";
import { LinkedList } from "./linked_list_source/linked_list.js";
import { BinaryTree } from "./binary_tree_source/binary_tree.js";
import { Queue } from "./queue_source/queue.js";

class Visualizer {
  // This class is used to visualize the data structures with 
  // the data the user inputted.
  //
  // Each of the main functions (this.linkedList, this.binaryTree, 
  // this.queue) follow a very similar structure
  constructor() { 
    this.dataHandler = new DataHandler();
    this.elementCreator = new ElementCreater();
  }
  
  linkedList = async () => {
    // Get the data contained in the inner html of the 'description' 
    // element and then hide the element.
    const data = this.dataHandler.getData();
    this.hideData();

    // The next chunk does some visuals; a transition which we wait
    // for until it is done and then we generate a header for the
    // Linked List data structure.
    await this.visualizingTransition();
    const header = this.elementCreator.mainHeader("Linked List");
    document.getElementById("main-body").appendChild(header);

    // Here we do all of the actual visualization. We create a 'LinkedList',
    // we build the data structure visualization in the created
    // container, and finally we show the container in 
    // which we now have built the data structure visualization in.
    const linkedList = new LinkedList(data);
    const container = this.elementCreator.dataStructureContainer("linked-list");
    linkedList.build(container);
    makeDraggable(container);
    linkedList.show(container);
  }
  
  binaryTree = async () => {
    // Get the data contained in the inner html of the 'description' 
    // element and then hide the element.
    const data = this.dataHandler.getData();
    this.hideData();

    // The next chunk does some visuals; a transition which we wait
    // for until it is done and then we generate a header for the
    // Binary Tree data structure.
    await this.visualizingTransition();
    const header = this.elementCreator.mainHeader("Binary Tree");
    document.getElementById("main-body").appendChild(header);

    // Here we do all of the actual visualization. We create a 'BinaryTree',
    // we build the data structure visualization in the created
    // container, and finally we show the container in 
    // which we now have built the data structure visualization in.
    const binaryTree = new BinaryTree(data);
    const container = this.elementCreator.dataStructureContainer("binary-tree");
    binaryTree.build(container);
    makeDraggable(container);
    binaryTree.show(container);
  }
  
  queue = async () => {
    // Get the data contained in the inner html of the 'description' 
    // element and then hide the element.
    const data = this.dataHandler.getData();
    this.hideData();

    // The next chunk does some visuals; a transition which we wait
    // for until it is done and then we generate a header for the
    // Queue data structure.
    await this.visualizingTransition();
    const header = this.elementCreator.mainHeader("Circular Queue");
    document.getElementById("main-body").appendChild(header);
    
    // Here we do all of the actual visualization. We create a 'Queue',
    // we build the data structure visualization in the created
    // container, and finally we show the container in 
    // which we now have built the data structure visualization in.
    const queue = new Queue(data);
    const container = this.elementCreator.dataStructureContainer("queue");
    queue.build(container);
    makeDraggable(container);
    queue.show(container);
  }

  hideData() {
    document.getElementById("description").style.opacity = "0";
  }

  async visualizingTransition() {
    // This function is used to show a cool transition or a
    // type of loading animation when visualizing the data structures. 
    const inputPrompt = document.getElementById("input-prompt");
    const dataStructuresContainer = document.getElementById("datastructures-div");
    dataStructuresContainer.style.padding = "25px";
    dataStructuresContainer.style.opacity = "0";
    inputPrompt.style.opacity = "0";
    
    const header = document.getElementById("main-header");
    header.innerHTML = "Visualizing";
    
    // The 'Promise' object we define here will be resolved after a 
    // specified delay (in ms) has passed.
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    for (let i = 0; i < 5; ++i) {
      await delay(1000); // wait for one second to pass

      if (header.innerHTML.length === 14) header.innerHTML = "Visualizing.";
      else header.innerHTML += ".";

      header.style.opacity = 0;
      header.style.transform = "scale(0.7)";
    }
    // At the end of the visualization we remove the prompt since we don't 
    // need the element anymore.
    document.getElementById("prompt-body").remove();
  }
}

export default Visualizer;
