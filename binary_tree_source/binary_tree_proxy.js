import Module from "./binary_tree_wasm.js";

class BinaryTreeProxy {
  // This class is the Javascript proxy class which
  // we use in the main data structure javascript files 
  // ('binary_tree.js). We use the 'Module' object 
  // from the generated wasm glue code to access and 
  // use the C++ functions.
  getPointer() {  
    return Module._constructor();
  }

  insert(ptr, value) {
    Module._insert(ptr, value);
  }
  
  levelOrderTraversal(ptr, size) {
    const resultCArrayPtr = Module._level_order_traversal(ptr, size);
    
    // The 'resultArray' will be a pointer to a C array so we need
    // create a new javascript array out of it.
    const resultJSArray = [];
    for (let i = 0; i < size; ++i) {
      // The next chunk of code is worth an explanation: we use the 
      // 'Module' object to access a value that is allocated on the 
      // heap by Emscripten.
      //
      // 'Module.HEAP32' is a property representing an array buffer 
      // that corresponds to the Emscripten heap, where all 32-bit 
      // integers are stored. We use this array buffer to read the 
      // data entries one-by-one by calculating the indices.
      //
      // 'resultCArrayPtr' is a pointer to a dynamically allocated 
      // array in the Emscripten heap. We calculate the index using 
      // 'Int32Array.BYTES_PER_ELEMENT' to determine the offset
      // and add 'i' to traverse through the array elements.
      const heapIndex = resultCArrayPtr / Int32Array.BYTES_PER_ELEMENT + i;
      const convertedEntry = Module.HEAP32[heapIndex];
      resultJSArray.push(convertedEntry);
    }
    // Now that we have created a javascript array out of our iriginal
    // C array, we free the array (deallocate the pointer) so that we 
    // wont suffer from any memory leaks.
    Module._free_array(resultCArrayPtr);

    return resultJSArray;
  }

  destroy(ptr) {
    Module._destructor(ptr);
  }
}

export { BinaryTreeProxy };
