#include <sstream>

class LinkedList {
private:
  struct Node {
    int data;
    Node *next;
    // Constructor for the Node structure, initializes data and next pointer
    Node(int s = 0) : data(s), next(nullptr) {}
  };
  Node *_head, *_tail, *_prev_to_current;
  size_t _size;

public:
  // Constructor to initialize the linked list
  LinkedList() {
    _head = new Node(-1); // Sentinel node to simplify boundary checks
    _tail = _head; 
    _prev_to_current = _head;
    _size = 0;
  }

  // Destructor to clean up memory when the linked list is destroyed
  ~LinkedList() {
    clear();
    _head = nullptr;
  }

  // Method to insert a new node with data 's' at the current position
  // Returns a pointer to the modified LinkedList
  LinkedList *insert_at_current(int s) {
    Node* new_node = new Node(s); // Create a new node with the given data
    new_node->next = _prev_to_current->next;
    _prev_to_current->next = new_node; // Insert the new node at the current position
    if (_prev_to_current == _tail) _tail = new_node; // Update the tail if necessary
    ++_size; // Increment the size of the linked list
    return this;
  }
  
  // Method to get the data of the node at the current position
  int get_current() const {
    static int sentinel = -1;
    if (_prev_to_current->next == nullptr) return sentinel;
    return _prev_to_current->next->data;
  }

  // Method to remove the node at the current position
  // Returns a pointer to the modified LinkedList
  LinkedList *remove_at_current() {
    // Remove the node at the current position and then
    // decrement the size of the linked list
    _prev_to_current->next = _prev_to_current->next->next;
    --_size;
    return this;
  }

  // Method to get the size of the linked list
  size_t get_size() const {
    return _size;
  }

  // Method to clear the linked list and release allocated memory
  void clear() {
    _prev_to_current = _head;
    while (_prev_to_current->next != nullptr) {
      remove_at_current(); // Remove all nodes in the linked list
    }
    _prev_to_current = _head; _tail = _head; // Reset pointers
    _head->next = nullptr; // Set the next pointer of the sentinel node to null
  }
};
