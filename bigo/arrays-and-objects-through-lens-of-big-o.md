# Arrays and Objects

Outline:

1. understand how objects and arrays work, thru lens of Big O
2. why adding elements to beginning of an array is costly
3. compare and contrast the runtime for arrays and objects, as well as built-in methods

### Objects

#### When to use objects

* when you don't need order
* when you need fast access / insertion and removal

#### Big O of Objects

* Insertion - $$O(1)$$ 
* Removal - $$O(1)$$ 
* Searching - $$O(n)$$ 
* Access - $$O(1)$$ 

#### Big O of Object Methods

* Object.keys - $$O(n)$$ 
* Object.values - $$O(n)$$ 
* Object.entries - O\(n\)
* hasOwnProperty - O\(1\)

would be using those methods when you are compiling the information into an array for example 

### Arrays

#### When to use arrays

* when you need ordered lists
  * order can come at a cost to efficiency 

#### Big O of Arrays

* Insertion - it depends...
* removal - it depends...
* Searching - O\(n\)
* Access - O\(1\) 

#### Insertion / removal

* add / remove from end - O\(1\)
  * push / pop
* add / remove from start - O\(n\) 
  * shift / unshift

#### Array Methods

* push / pop - O\(1\)
* shift / unshift - O\(n\)
* concat - O\(n\) - adds to arrays together could argue its O\(n + m\)
* slice - O\(n\)
* splice - O\(n\)
* sort - O\(n \* log n\)
* forEach/map/filter/reduce/etc - O\(n\)

