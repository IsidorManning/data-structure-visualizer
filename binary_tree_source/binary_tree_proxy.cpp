#include "binary_tree.cpp"

// This module contains the C++ proxy functions
// based off the C++ source code for the Binary Tree
// implementation. This is the file we use for compilation
// with emscripten in order to use the Binary Tree,
// written in C++, in javascript.
extern "C" {
  BinaryTree* constructor() {
    return new BinaryTree();
  }

  void insert(BinaryTree* tree, int s) {
    tree->insert(s);
  }

  int* level_order_traversal(BinaryTree* tree, int size) {
    return tree->level_order_traversal(size);
  }

  void free_array(BinaryTree* tree, int* ptr) {
    delete[] ptr;
  }
  
  void destructor(BinaryTree* tree) {
    delete tree;
  }
}
