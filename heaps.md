# Heaps

* priority queue is what you want to do and a heap is the implementation of it. 
* binary search tree -
  * children to the left &lt; than parent
  * children to the right &gt; than the parent
    * recursive
  * useful for searching for particular elements
* For Max Heap
  * higher priority to hirer values
  * parent node always has hire value than children - this way highest value is at the root always. 
  * To remove max value:
    * swap root with last element in array and pop it off
    * then readjust the heap by checking to see if children are larger than parent and  if so swapping the greatest value of those children
  * comparisons = height of tree - 1 
  * $$O(n*height)$$ 
  * $$O(n*log(n))$$ 
  * n = \# of node elements 
  * how to calculate height of tree. log2\(n +1\) 
    *  7 + 1 = 8  log2\(8\) = 3 because 2^3 = 8 



