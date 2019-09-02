/* 
 * Functional Programming Blocks from CSE 130
 * 
 */
repeat = n => f => x => {
  if (n > 0)
    return repeat (n - 1) (f) (f (x))
  else
    return x
}

times = n => f =>
  repeat (n) (i => (f(i), i + 1)) (0)

for_ = (cur, cond, next, fbody) => {
  cond (cur) ?
    (fbody(cur), cur = next(cur), for_(cur, cond, next, fbody)) : cur;
}

each = (list, f) => {
  if (list.size == 0) { return; }

  for_ (0, (x) => x < list.size, (x) => (x + 1), (x) => f(list.get(x), x));
}

/*
 *  Data Structures
 *
 */


class Node { 
	constructor(element) 
	{ 
		this.element = element; 
		this.next = null;
    this.prev = null;
	} 
} // END NODE

class DoubleLinkedList {
  constructor () {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  add (element) {
    let node = new Node (element);
    let current;

    // default
    if (this.head == null) {
      this.head = node;
      this.tail = node;
    }
    else {
      current = this.head;
      
      // iterate over list; get to end
      while (current.next) {
        current = current.next;
      }
      node.prev = current;
      current.next = node;
      this.tail = node;
    }
    this.size++;
  }
  removeElement (element) {
    let current = this.head;
    let prev = null;

    // iterate over list
    while (current != null) {
      if (current.element === element) {
        // removing head case
        if (prev == null) {
          this.head = current.next;
        }
        // update case
        else {
          prev.next = current.next;
          current.next.prev = prev; //TODO does it work?
        }
        this.size--;
        return current.element;
      }

      prev = current;
      current = current.next;
    }
    return -1;
  }

  insertAtElement (target, element) {
    let node = new Node (element);
    let current = this.head;
    let next = null;

    while (current != null) {
      if (current.element === target.element) {
        node.next = current.next;
        node.prev = current;
        current.next = node;
        this.size++;
        break;
      }

      current = current.next;
    }
    if (node.next == null) {
      this.tail = node;
    }
    return;
  }
  getRandom () {
    let current = this.head;
    let index = floor (random (this.size));
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    return current;
  }

} //end DoublyLinkedList

class LinkedList { 
	constructor() { 
		this.head = null; 
		this.size = 0; 
	} 

  add (element) {
    let node = new Node (element);
    let current;

    // default
    if (this.head == null) {
      this.head = node;
    }
    else {
      current = this.head;

      // iterate over list
      while (current.next) {
        current = current.next;
      }
      node.prev = current;
      current.next = node;
    }
    this.size++;
  }
  removeElement (element) {
    let current = this.head;
    let prev = null;

    // iterate over list
    while (current != null) {
      if (current.element === element) {
        // removing head case
        if (prev == null) {
          this.head = current.next;
        }
        // update case
        else {
          prev.next = current.next;
          current.next.prev = prev; //TODO
        }
        this.size--;
        return current.element;
      }

      prev = current;
      current = current.next;
    }
    return -1;
  }
  // not handling errors atm
  // target is already a node, element is the thing to be inserted
  insertAtElement (target, element) {
    let node = new Node (element);
    let current = this.head;
    let next = null;

    while (current != null) {
      if (current.element === target.element) {
        node.next = current.next;
        current.next = node;
        this.size++;
        return;
      }

      current = current.next;
    }
  }
  getRandom () {
    let current = this.head;
    let index = floor (random (this.size));
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    return current;
  }
}
