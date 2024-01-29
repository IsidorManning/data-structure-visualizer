import Module from './queue_wasm.js';

class QueueProxy {
  // This class is the Javascript proxy class which
  // we use in the main data structure javascript files 
  // ('queue.js). We use the 'Module' object 
  // from the generated wasm glue code to access and 
  // use the C++ functions.
  getPointer(size) {  
    // We need the size of the data in order to resize
    // the C++ std::vector in the constructor. We
    // use this vector for storing our data and
    // indexing it.
    return Module._constructor(size);
  }

  peek(ptr) {
    return Module._peek(ptr);
  }

  enqueue(ptr, elem) {
    Module._enqueue(ptr, elem);
  }

  get_last_enqueued(ptr) {
    return Module._get_last_enqueued(ptr);
  }

  destroy(ptr) {
    Module._destructor(ptr);
  }
}

export { QueueProxy };
