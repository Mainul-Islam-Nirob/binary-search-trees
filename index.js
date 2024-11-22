class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null

    }
}

class Tree {
    constructor(array) {
        const sortedArray = [...new Set(array)].sort((a, b) => a - b);
        this.root = this.buildTree(sortedArray);
      }

    buildTree(array) {
        if (array.length === 0) return null;

        // Find the middle element
        const mid = Math.floor(array.length / 2);
        const root = new Node(array[mid]);

        // Recursively build left and right subtrees
        root.left = this.buildTree(array.slice(0, mid));
        root.right = this.buildTree(array.slice(mid + 1));

        return root;
    }

    insert(value, node = this.root) {
        if (!node) return new Node(value);
    
        if (value < node.data) {
          node.left = this.insert(value, node.left);
        } else if (value > node.data) {
          node.right = this.insert(value, node.right);
        }
        return node;
    }

    // Function to find the minimum value in a tree
    findMin(node) {
        while (node.left) {
        node = node.left;
        }
        return node;
    }

    delete(value, node = this.root) {
        if (!node) return null;
    
        if (value < node.data) {
          node.left = this.delete(value, node.left);
        } else if (value > node.data) {
          node.right = this.delete(value, node.right);
        } else {
          // Node with only one child or no child
          if (!node.left) return node.right;
          if (!node.right) return node.left;
    
          // Node with two children: get the inorder successor
          const temp = this.findMin(node.right);
          node.data = temp.data;
          node.right = this.delete(temp.data, node.right);
        }
        return node;
    }

    find(value, node = this.root) {
        if (!node || node.data === value) {
          return node;
        }
      
        if (value < node.data) {
          return this.find(value, node.left);
        }
      
        return this.find(value, node.right);
    }

    levelOrder(callback) {
        if (typeof callback !== "function") {
          throw new Error("A callback function is required.");
        }
      
        const queue = [];
        if (this.root) queue.push(this.root);
      
        while (queue.length > 0) {
          const currentNode = queue.shift(); 
          callback(currentNode);
      
          if (currentNode.left) queue.push(currentNode.left);
          if (currentNode.right) queue.push(currentNode.right);
        }
    } 

    levelOrderRecursive(callback) {
        if (typeof callback !== "function") {
          throw new Error("A callback function is required.");
        }
      
        const recursiveHelper = (queue) => {
          if (queue.length === 0) return; 
      
          const currentNode = queue.shift();
          callback(currentNode);
      
          if (currentNode.left) queue.push(currentNode.left);
          if (currentNode.right) queue.push(currentNode.right);
      
          recursiveHelper(queue);
        };
      
        if (this.root) recursiveHelper([this.root]); 
      }
      


    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (!node) return;
        if (node.right) {
        this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left) {
        this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }

}



const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 56, 44, 66, 89];
const tree = new Tree(array);

const printNode = (node) => console.log(node.data);

console.log("Iterative Level Order Traversal:");
tree.levelOrder(printNode);

console.log("\nRecursive Level Order Traversal:");
tree.levelOrderRecursive(printNode);


