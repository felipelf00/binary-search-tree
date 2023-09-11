import Node from "./node.js";

function sortAndRemoveDuplicates(array) {
  array.sort();
  // console.log("sorted: " + array);
  for (let i = 0; i < array.length; i++) {
    if (array[i] === array[i + 1]) {
      array.splice(i, 1);
    }
  }
  // console.log("removed: " + array);
}

function sortedArrayToBST(array, start, end) {
  sortAndRemoveDuplicates(array);

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
}

export default Tree;
