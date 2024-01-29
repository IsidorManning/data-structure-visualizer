#include "linked_list.cpp"

// This module contains the C++ proxy functions
// based off the C++ source code for the Linked List 
// implementation. This is the file we use for compilation
// with emscripten in order to use the Linked List,
// written in C++, in javascript.
extern "C" {
  LinkedList* constructor() {
    return new LinkedList();
  }

  void insert_at_current(LinkedList* list, int s) {
    list->insert_at_current(s);
  }

  int get_current(LinkedList* list) {
    return list->get_current();
  }

  void remove_at_current(LinkedList* list) {
    list->remove_at_current();
  }

  void clear(LinkedList* list) {
    list->clear();
  }

  void destructor(LinkedList* list) {
    delete list;
  }
};
