#include <string>
#include <vector>
#include <sstream>

class Queue {
private:
  std::vector<int> _data;
  size_t _head, _tail;
  static int _sentinel;

public:
  int LAST_ENQUEUED;

  // Constructor to initialize the Queue with a given size
  Queue(int size);

  void set_last_enqueued(int elem) { LAST_ENQUEUED = elem; }
  int get_last_enqueued() { return LAST_ENQUEUED; }

  bool is_empty() const { return (_head == _tail); }
  size_t size() const { return (_tail - _head + _data.size()) % _data.size(); }
  void resize(size_t size);
  
  // Method to get the value at the front of the queue without 
  // removing it Returns the front element if the queue is not empty, 
  // otherwise returns the sentinel value
  int peek() const;
  // Method to remove the front element from the queue
  // Does nothing if the queue is empty
  void dequeue();
  // Method to add a new element to the end of the queue
  // Does nothing if the queue is full
  void enqueue(int elem);
};

// Static member initialization
int Queue::_sentinel = int();

// Constructor to initialize the Queue with a given size
Queue::Queue(int size) {
  _data.resize(size + 1);

  _head = 0;  
  _tail = 0;
}

// Method to get the value at the front of the queue without removing it
int Queue::peek() const {
  if (is_empty()) return _sentinel;

  return _data[_head];
}

// Method to add a new element to the end of the queue
void Queue::enqueue(int elem) {
  if (_head == (_tail + 1) % _data.size()) return;

  set_last_enqueued(elem);

  _data[_tail] = elem;
  ++_tail;
}

// Method to remove the front element from the queue
void Queue::dequeue() {
  if (is_empty()) return;

  _data[_head] = 0;
  ++_head;
}

// Method to resize the queue to a new size
void Queue::resize(size_t size) {
  // The resizing method involves creating a new Queue instance 
  // with the desired size, then transferring elements from the 
  // current queue to the new_queue using enqueue and dequeue 
  // operations. Finally, the state of the current instance is 
  // updated to match the new_queue, effectively resizing the 
  // underlying vector.

  // Create a new Queue instance with the desired size
  Queue new_queue(size);

  // Transfer elements from the current queue to the 'new_queue'
  while (!(is_empty())) {
    int front_element = peek();

    new_queue.enqueue(front_element);
    dequeue();
  }
  // Update the current instance's state to match the new_queue
  _data = new_queue._data;
  _head = new_queue._head;
  _tail = new_queue._tail;
}

// Function to remove all elements from a Queue
void popalot(Queue& q) { 
  while (!q.is_empty()) {
    q.dequeue();
  }
}
