import Node from "./node.js";
import Tree from "./tree.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function sortAndRemoveDuplicates(array) {
  array.sort((a, b) => a - b);
  for (let i = 0; i < array.length; i++) {
    if (array[i] === array[i + 1]) {
      array.splice(i, 1);
    }
  }
}

let array = [1, 4, 5, 3, 4, 5, 7, 8, 10, 6];
// let array = [1, 2, 3, 4, 5, 10];
sortAndRemoveDuplicates(array);

let myTree = new Tree(array);

// myTree.insert(2);
myTree.find(4);
// myTree.delete(9);
// console.log(myTree.findParent(4));

prettyPrint(myTree.root);
