import Node from "./node.js";

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
    // console.log("Target not found");
    return null;
  }

  // findParent(value) {
  //   let currentNode = this.root;

  //   while (currentNode !== null) {
  //     if (currentNode.left.data === value || currentNode.right.data === value)
  //       return currentNode;

  //     if (value < currentNode.data) {
  //       currentNode = currentNode.left;
  //     } else {
  //       currentNode = currentNode.right;
  //     }
  //   }
  //   console.log("Target not found");
  //   return null;
  // }

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
      // console.log("Current Node: " + currentNode.data);

      if (currentNode.left && currentNode.left.data === value) {
        parentNode = currentNode;
        currentNode = currentNode.left;
        childIsLarger = false;
        // done = true;
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
}

export default Tree;
