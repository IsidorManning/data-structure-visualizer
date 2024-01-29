#include "queue.cpp"

// This module contains the C++ proxy functions
// based off the C++ source code for the Queue 
// implementation. This is the file we use for compilation
// with emscripten in order to use the Queue,
// written in C++, in javascript.
extern "C" {
  Queue* constructor(size_t size) {
    return new Queue(size);
  }

  void enqueue(Queue* queue, int element) {
    queue->enqueue(element);
  }

  int get_last_enqueued(Queue* queue) {
    return queue->get_last_enqueued();
  }
  
  int peek(Queue* queue) {
    return queue->peek();
  }

  void destructor(Queue* queue) {
    delete queue;
  }
}
