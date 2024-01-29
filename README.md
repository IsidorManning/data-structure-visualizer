# data-structure-visualizer
An app used by a user to visualize certain data structures with their own integer data.

# The purpose of this project was to achieve two main goals

Create a data structure visualizer app that a user can use to get a visual intuition for three introductory data structures: the linked list, the binary tree, and the queue. It works by having a user input some integer data and then choosing the data structure they wish to visualize with their data.

Bridge the gap between C++ and JavaScript using WebAssembly (WASM). The implementations for the data structures themselves are written in C++. We use Emscripten to compile the C++ source code for WASM so that we can use the C++ data structures in JavaScript. This was the real challenge since it involved messing around with many proxies. 

# Details on how we visualize our three data structures

# Linked List

This is the most straightforward visualization which simply involves inserting each data entry in the list, getting the current node in the list, and adding that node into a flexbox, row container. 

One thing to note is that we use a sentinel element in the source implementation. This will always be shown as the first element in the list, preceding all other data entries. We also use horizontal arrows in the right direction to “connect” each node to each other.

# Binary Tree

Note: In the context of this project, we should NOT confuse the binary tree implementation with any other binary trees such as binary search trees (BSTs) or B-trees.

The visualization for the binary tree works in this way: we insert all of our data using the C++ source functions, and then we make a first-breadth or “level order” traversal to get an array of all of our binary-tree-like data. Next, we iterate over this array from left to right, filling the rows of the binary tree from left to right. The first row will only hold one node (the root node) and as we descend the binary tree, each row will be able to hold, at a maximum, two times the amount of nodes its preceding row can hold. 

The implementation detail of the visualization: When the bottom row is reached, for the spacing to work and for the visual representation of the tree to look correct, all the rows MUST be filled with nodes to their maximum capacity. This means that if the last row is not yet filled and we have run out of data nodes to append to it, we need to add some invisible “ghost” nodes until the bottom row is full.

# Queue

First of all, the low-level implementation of this queue is a circular queue, meaning that the element that comes after the first element that was enqueued (the front element of the queue), is the last element that was enqueued (the back element of the queue). 

Secondly, the way we visualize is by having three columns: a left column, a middle column, and a right column. The way we would navigate through the queue is in a clockwise manner; we start at the top data node in the middle column (now we are at the back of the queue), we then proceed to the top right element in the right column, follow all the nodes in the right columns all the way down, turn left to the bottom element of the middle column, turn left, to the bottom element in the left column, and lastly follow all the nodes in the left column all the way up (now we are at the front of the queue). As you can see, the middle column can, at maximum, hold two data nodes and the left column will always hold the same amount of nodes as the right column (this is if the size of the data is even) or one more data node (if the size of the data is odd)

# Standards used throughout this project that are worth noting 

You will see me creating elements in the DOM and initially setting them to have an opacity of 0. Whenever you see me using the “setTimeout” function at the end of a method, it is pretty much always in favor of a visually pleasing effect. In most cases, within the function, we set the opacity to 1 (sometimes we also change the padding). This is so that when we dynamically modify the main HTML (index.html), adding new elements and deleting old elements, they fade in and out smoothly instead of rapidly getting deleted from the DOM (when deleting elements, we delete them AFTER the visual fade-out is finished when we exit the “setTimeout” function).

We have some asynchronous functions just for the sake of visual pleasure. The “visualization transition” is a function we await for which simply is a loading animation that acts as a smooth and fun transition between the part when a user has chosen their data structure to visualize and when the final visualization appears on screen. We await for this function (which means that we temporarily stop the sequential execution) to finish before we move on to building and then showing the visualization of the user’s chosen data structure.

I use modular programming in this project since I believe it is a good practice. I try to encapsulate every single functionality in its class and in its own appropriate module. This is why we have a lot of different source files. However, I find that this helps with keeping the project well organized. Subsequently, this style of programming also makes it much easier and more convenient to expand this project if I want to add more functionality or data structures in the future. 

# Additional notes

Regarding having the data structure implementation written in pure C++, I could have avoided a lot of pain by implementing them in JavaScript. However, the goal was not only to make the visualizer app work but also to familiarize myself with WASM. This is why I restricted myself from writing the code for all of the data structures in C++. 

The files “linked_list_wasm.js”, “binary_tree_wasm.js”, and “queue_wasm.js” are glue codes that Emscripten generates when compiling to WASM. This is not the code I have written. All I have done in these files was to add an export statement at the end of the files which default exports the ‘Module’ object. We use this object in JavaScript to access our C++ functions that have been allocated on the Emscripten Heap. 

If you read through the C++ source code for the data structures, you might realize that we don’t use all of the functions included in the data structures. I decided not to delete them since I could see them coming in handy if I were to expand the project in the future and add more functionality and customization for the user.
