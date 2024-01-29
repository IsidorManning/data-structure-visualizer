#include <iostream>
#include <vector>
#include <queue>

class BinaryTree {
private:
  struct Node {
    // Node structure to represent each node in the binary tree
    int data;
    Node* left;
    Node* right;

    // Constructor for the Node structure, initializes data, left,
    // and right pointers
    Node(int value) : data(value), left(nullptr), right(nullptr) {}
  };

  Node* root; // Pointer to the root of the binary tree

  // Recursive method to insert a value into the binary tree
  // This method takes a root node and a value to insert. If the
  // root node is null, it creates a new node with the given value. If 
  // the value is less than the current root's data, it recursively calls
  // insert_recursive on the left subtree. If the value is greater, it 
  // recursively calls insert_recursive on the right subtree.
  // Returns the modified root node.
  Node* insert_recursive(Node* root, int value) {
    if (root == nullptr) return new Node(value);

    if (value < root->data) 
      root->left = insert_recursive(root->left, value);
    else 
      root->right = insert_recursive(root->right, value);
    
    return root;
  }

public:
  // Constructor to initialize the binary tree with a null root
  BinaryTree() : root(nullptr) {}

  // Method to insert a value into the binary tree
  void insert(int value) {
    root = insert_recursive(root, value);
  }

  // Method to perform level order traversal and return an array 
  // containing the node values. This method uses a breadth-first
  // traversal approach using a queue. It starts from the root
  // and enqueues each node's left and right children while dequeuing
  // nodes one by one. The process continues until all nodes
  // are visited, and the array is filled with the node values in 
  // level order.
  int* level_order_traversal(int size) {
    int* result = new int[size];
    
    if (root == nullptr) return result; // Return an empty array if the tree is empty

    std::queue<Node*> q;
    q.push(root);

    int index = 0;  // Initialize index to 0

    while (!q.empty()) {
      Node* current = q.front();
      q.pop();

      result[index++] = current->data;  // Store data at the correct index

      // Enqueue the left and right children if they exist
      if (current->left) q.push(current->left);
      if (current->right) q.push(current->right);
    }

    return result;
  }

  // Method to free memory allocated for an array
  void free_array(int* ptr) {
    delete[] ptr;
  }
};
