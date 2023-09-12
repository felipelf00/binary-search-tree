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
    console.log("Value not found");
    return null;
  }
  // delete(value) {
  //   let currentNode = this.root;

  // }
}

export default Tree;
