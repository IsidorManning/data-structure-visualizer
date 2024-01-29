import Module from "./linked_list_wasm.js";

class LinkedListProxy {
  // This class is the Javascript proxy class which
  // we use in the main data structure javascript files 
  // ('linked_list.js). We use the 'Module' object 
  // from the generated wasm glue code to access and 
  // use the C++ functions.
  getPointer() {  
    return Module._constructor();
  }

  insertAtCurrent(ptr, value) {
    Module._insert_at_current(ptr, value);
  }

  getCurrent(ptr) {
    return Module._get_current(ptr);
  }

  removeAtCurrent(ptr) {
    Module._remove_at_current(ptr);
  }

  clear(ptr) {
    Module._clear(ptr);
  }

  destroy(ptr) {
    Module._destructor(ptr);
  }
}

export { LinkedListProxy };
