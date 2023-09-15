import Node from "./node.js";

export function sortAndRemoveDuplicates(array) {
  array.sort((a, b) => a - b);
  for (let i = 0; i < array.length; i++) {
    if (array[i] === array[i + 1]) {
      array.splice(i, 1);
    }
  }
}

function sortedArrayToBST(array, start, end) {
  if (start > end) return null;

  let mid = Math.floor((start + end) / 2);
  let root = new Node(array[mid]);

  root.left = sortedArrayToBST(array, start, mid - 1);
  root.right = sortedArrayToBST(array, mid + 1, end);

  return root;
}

class Tree {
  constructor(dataArray) {
    this.root = sortedArrayToBST(dataArray, 0, dataArray.length - 1);
  }
  insert(value) {
    if (this.find(value)) {
      console.log("Value already exist");
      return;
    }
    let currentNode = this.root;

    let done = false;
    while (!done) {
      if (value < currentNode.data) {
        if (currentNode.left === null) {
          currentNode.left = new Node(value);
          done = true;
        } else {
          currentNode = currentNode.left;
        }
      } else {
        if (currentNode.right === null) {
          currentNode.right = new Node(value);
          done = true;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
  }
  find(value) {
    let currentNode = this.root;

    while (currentNode !== null) {
      if (currentNode.data === value) return currentNode;

      if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return null;
  }

  //this can be done recursively with much cleaner code...
  delete(value) {
    let currentNode = this.root;
    let parentNode = null;
    let done = false;
    let childIsLarger = null;

    if (currentNode === null) {
      console.log("Tree is empty");
      return;
    }
    //if root has target value
    if (currentNode.data === value) {
      done = true;
    }
    //otherwise
    while (done !== true && currentNode !== null) {
      if (currentNode.left && currentNode.left.data === value) {
        parentNode = currentNode;
        currentNode = currentNode.left;
        childIsLarger = false;
        break;
      }

      if (currentNode.right && currentNode.right.data === value) {
        parentNode = currentNode;
        currentNode = currentNode.right;
        childIsLarger = true;
        // console.log("value found. Current node:  " + currentNode.data);
        // done = true;
        break;
        // console.log("done?: " + done);
      }

      if (value < currentNode.data) {
        // console.log("value " + value + " is smaller than " + currentNode.data);
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
        // console.log("value " + value + " is larger than " + currentNode.data);
      }
    }

    if (currentNode === null) {
      console.log("Value not found");
      return;
    }

    // console.log("Current node: " + currentNode);
    //if target is leaf
    if (currentNode.left === null && currentNode.right === null) {
      if (childIsLarger === false) {
        parentNode.left = null;
        return;
      }

      if (childIsLarger) {
        parentNode.right = null;
        return;
      }
    }
    //if target has a single child to the left
    if (currentNode.left !== null && currentNode.right === null) {
      if (childIsLarger) {
        parentNode.right = currentNode.left;
        return;
      }
      if (childIsLarger === false) {
        parentNode.left = currentNode.left;
        return;
      }
    }
    //if target has a single child to the right
    if (currentNode.left === null && currentNode.right !== null) {
      if (childIsLarger) {
        parentNode.right = currentNode.right;
        return;
      }
      if (childIsLarger === false) {
        parentNode.left = currentNode.right;
        return;
      }
    }
    //if target has two children
    let replacement = currentNode.right;
    let replacementParent = currentNode;
    // while (replacement.left !== null && replacement.right !== null) {
    while (replacement.left !== null) {
      if (replacement.left.left === null) {
        replacementParent = replacement;
      }
      replacement = replacement.left;
    }
    // replacementParent.left = null;
    if (replacement.data > replacementParent.data) {
      replacementParent.right = replacement.right;
    } else {
      replacementParent.left = replacement.left;
    }
    if (parentNode === null) {
      replacement.left = currentNode.left;
      replacement.right = currentNode.right;
      this.root = replacement;
    }
    if (childIsLarger) {
      parentNode.right = replacement;
    }
    if (childIsLarger === false) {
      parentNode.left = replacement;
    }

    replacement.left = currentNode.left;
    replacement.right = currentNode.right;
  }

  levelOrder(cb) {
    let currentNode = this.root;
    let list = [];
    let queue = [this.root];

    if (currentNode === null) return [];

    while (queue.length) {
      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
      cb ? cb(queue[0]) : list.push(queue[0].data);
      queue.shift();
      currentNode = queue[0];
    }

    if (cb) {
      return;
    }
    return list;
  }

  preOrder(node = this.root, cb) {
    if (node === null) return [];
    let list = [];

    if (cb) {
      cb(node);
    } else {
      list.push(node.data);
    }

    list = list.concat(this.preOrder(node.left, cb));
    list = list.concat(this.preOrder(node.right, cb));

    // if (cb) return;
    return list;
  }

  inOrder(node = this.root, cb) {
    if (node === null) return [];
    let list = [];

    list = list.concat(this.inOrder(node.left, cb));

    if (cb) {
      cb(node);
    } else {
      list.push(node.data);
    }

    list = list.concat(this.inOrder(node.right, cb));
    return list;
  }

  postOrder(node = this.root, cb) {
    if (node === null) return [];
    let list = [];

    list = list.concat(this.postOrder(node.left, cb));
    list = list.concat(this.postOrder(node.right, cb));

    if (cb) {
      cb(node);
    } else {
      list.push(node.data);
    }

    return list;
  }
  height(node) {
    if (node === null) {
      return -1;
    }

    if (node.left === null && node.right === null) return 0;

    let leftDepth = 1 + this.height(node.left);
    let rightDepth = 1 + this.height(node.right);

    return leftDepth > rightDepth ? leftDepth : rightDepth;
  }
  depth(node) {
    if (!node) {
      console.log("Node does not exist");
      return;
    }
    let currentNode = this.root;
    let counter = 0;

    while (currentNode !== null && currentNode !== node) {
      if (node.data < currentNode.data) {
        counter += 1;
        currentNode = currentNode.left;
      } else {
        counter += 1;
        currentNode = currentNode.right;
      }
    }
    return counter;
  }
  isBalanced() {
    return Math.abs(
      this.height(this.root.left) - this.height(this.root.right)
    ) <= 1
      ? true
      : false;
  }
  rebalance() {
    let newArray = this.levelOrder();
    sortAndRemoveDuplicates(newArray);
    // console.log(newArray);
    this.root = sortedArrayToBST(newArray, 0, newArray.length - 1);
  }
}

export default Tree;
