# Algorithms and Problem Solving Patters

### Objectives

* define what an algorithm is
* devise a plan to solve algos
* compare and contracts problem solving patters including frequency counters, two pointer problems and divide and conquer 

### What is an Algorithm?

* a process or set of steps to accomplish a certain task 

#### How to improve at doing algos?

1. devise a plan for solving problems
2. master common problem solving patters

**Problem solving**

1. Understand the Problem
2. Explore Concrete Examples
3. Break it Down
4. Solve/Simplify
5. Look Back and Refactor 

#### Understand the Problem 

1. Can I restate the problem in my own words?
2. What are the inputs that go into the problem?
3. What are the outputs that should come from the solution to the problem?
   1. what should be returned from my function 
4. Can the outputs be determined from the inputs? In other words, do I have enough information to solve the problem? \(You may not be able to answer this question until you set about solving the problem. That's okay; it's still worth considering the question at this early stage\)
5. How should I label the important pieces of data that are part of the problem?

#### Examples:

**Write a function which takes two numbers and returns their sum.** 

**Step 1: Understanding the Problem** 

1. Restate?
   * Create a function that returns the sum of its two passed in arguments.
   * Implement addition 
2. Inputs? 
   * how large are the numbers? are they floats? what language are we using? what are the upper bounds of number sizes we can add together. will we always only want to add 2 numbers together? Can you pass in a string ? 
3. What are the outputs that should come from the solution? 
   1. int? float? string? 
4. Can outputs be determined from the inputs? 
   * what happens if someone passes in just 1 number? what do we return? 
5. How should I label important pieces ?  

**Step 2: Exploring Examples** 

* can help you better understand the problem better 
* provide sanity checks that your eventual solution works how it should 
* User Stories! 
* Unit Tests! 

1. Start with simple examples with input and an output
2. Progress to More Complex Examples
3. Explore Examples with Empty Inputs 
4. Explore Examples with Invalid Inputs \(more for real world\)

**Example:**

**Write a function which takes in a string and returns counts of each character in the string.** 

_step 1: do i understand?_

* restate: count characters of a string 
* ... 

_step 2:_ 

* Simple examples

```javascript
charCount('aaa') // {a: 3} 
charCount('hello') // {h:1, e:1, l:2, o:1
```

**Ask**: do we want to include a letter key value pair set to 0 for every letter to start with? If we did that it might make our code a lot easier later on.  we just increment instead of adding a new pair each time we find it. 

* More complex examples 

```javascript
charCount('My zipcode is 11221!') 
// do we account for spaces?
// numbers? 
// special characters? 
// uppercase / lowercase? 
```

* Empty Inputs
  * what do we want to return here? 
    * empty object?
    * null?
    * undefined? 
    * error message? 
* Invalid Inputs
  * what if a number, null, object etc that is passed in? 

**Step 3: Break It Down** 

* take the steps of the problem and write them down \(not full pseudo code even just to communicate 
  * could throw in \(does that sound crazy to do it that way? or if you think that will work ;o\) get a hint maybe
* Explicitly write out the steps you need to take.
  * _this forces you to think about the code you'll write before you write it, and helps you catch any lingering conceptual issues or misunderstandings before you dive in and have to worry about details \(e.g. language syntax\) as well._ 

_using example from above_

```javascript
function charCount(str) {
    // do soemthing
    // return an object with keys that are lowercase alphanumeric characters 
    // in the string; values should be a count of each character
}

function charCount(str) {
    // make object to return at end
    // loop over string, for each character ...
        // if the char is a number/letter AND a key in object, add one to count
        // if char is a number/letter AND not in object, add it and set value to 1
        // if char is something like space, period, etc don't do anything
    // return object at end
}

function charCount(str){
    let result = {}
    for(let i = 0; i < str.length; i++) {
        let char = str[i]
        if(result[char] > 0) { 
            result[char]++;
            
        } else { 
            result[char] = 1
        }
    }
    return result
}

```

**Step 4: Solve/Simplify** 

* simplify 
  * find the core difficulty in what you're trying to do
  * temporarily ignore that difficulty
  * write a simplified solution without it
  * incorporate that difficulty back in

