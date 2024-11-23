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

      inOrder(callback, node = this.root) {
        if (typeof callback !== "function") {
          throw new Error("A callback function is required.");
        }
      
        if (node !== null) {
          this.inOrder(callback, node.left);
          callback(node);
          this.inOrder(callback, node.right);
        }
      }
      

      preOrder(callback, node = this.root) {
        if (typeof callback !== "function") {
          throw new Error("A callback function is required.");
        }
      
        if (node !== null) {
          callback(node);
          this.preOrder(callback, node.left);
          this.preOrder(callback, node.right);
        }
      }
      

      postOrder(callback, node = this.root) {
        if (typeof callback !== "function") {
          throw new Error("A callback function is required.");
        }
      
        if (node !== null) {
          this.postOrder(callback, node.left);
          this.postOrder(callback, node.right);
          callback(node);
        }
      }
      
      height(node) {
        if (!node) {
          return -1; 
        }
      
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
      
        return Math.max(leftHeight, rightHeight) + 1;
      }
      

      depth(node, current = this.root, depthCount = 0) {
        if (!node) {
          throw new Error("Node must be provided.");
        }
      
        if (current === node) {
          return depthCount;
        }
      
        if (node.data < current.data && current.left) {
          return this.depth(node, current.left, depthCount + 1);
        } else if (node.data > current.data && current.right) {
          return this.depth(node, current.right, depthCount + 1);
        }
      
        throw new Error("Node is not in the tree.");
      }
      
      isBalanced(node = this.root) {
        if (!node) {
          return true; 
        }
      
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
      
        const heightDifference = Math.abs(leftHeight - rightHeight);
        const leftBalanced = this.isBalanced(node.left);
        const rightBalanced = this.isBalanced(node.right);
      
        return heightDifference <= 1 && leftBalanced && rightBalanced;
      }
      
      reBalance() {
        const inOrderTraversal = (node, result = []) => {
          if (!node) return result;
      
          inOrderTraversal(node.left, result);
          result.push(node.data);
          inOrderTraversal(node.right, result);
      
          return result;
        };
      
        const sortedValues = inOrderTraversal(this.root);
        this.root = this.buildTree([...new Set(sortedValues)]); // Remove duplicates
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


function getRandomArray(size, max) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}

function printNode(node) {
  console.log(node.data);
}

function driverScript() {
  console.log("=== Create a balanced binary search tree ===");
  const randomArray = getRandomArray(10, 100); 
  console.log("Initial Array:", randomArray);

  const tree = new Tree(randomArray);
  tree.prettyPrint();

  console.log("\n=== Confirm tree is balanced ===");
  console.log("Is tree balanced?", tree.isBalanced());

  console.log("\n=== Print tree elements in different orders ===");
  console.log("Level Order:");
  tree.levelOrder(printNode);
  console.log("Preorder:");
  tree.preOrder(printNode);
  console.log("Postorder:");
  tree.postOrder(printNode);
  console.log("Inorder:");
  tree.inOrder(printNode);

  console.log("\n=== Unbalance the tree by adding values > 100 ===");
  [110, 120, 130, 140, 150].forEach(value => tree.insert(value));
  tree.prettyPrint();

  console.log("\n=== Confirm tree is unbalanced ===");
  console.log("Is tree balanced?", tree.isBalanced());

  console.log("\n=== Rebalance the tree ===");
  tree.reBalance();
  tree.prettyPrint();

  console.log("\n=== Confirm tree is balanced ===");
  console.log("Is tree balanced?", tree.isBalanced());

  console.log("\n=== Print tree elements in different orders ===");
  console.log("Level Order:");
  tree.levelOrder(printNode);
  console.log("Preorder:");
  tree.preOrder(printNode);
  console.log("Postorder:");
  tree.postOrder(printNode);
  console.log("Inorder:");
  tree.inOrder(printNode);
}

driverScript();
