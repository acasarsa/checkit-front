---
description: >-
  big o tells us which way of solving a problem is the best (ie uses least
  memory)
---

# BigO

### summary:

* to analyze the performance of an algo, we use Big O notation 
* Big O Notation can give us a high level understanding of the time and space complexity of an algorithm
* Big O doesn't care about precision, only about general trends \(linear? quadratic? constant?\) 
* The time or space complexity \(as measured by Big O\) depends only on the algorithm, not the hardware used to run the algorithm
* Big O Notation is everywhere, so get lots of practice!

1. General
   1. gives precise vocab to talk about how our code performs
   2. useful for discussing trade-offs btwn dif approaches
   3. in case of crashes or slowdowns id'ing parts of the code that are inefficient can help us find pain points in our application 
   4. important for interviews  
2. what is Big O Notation 
   1. Count number of simple operations rather than time it takes
   2. a way to formalize fuzzy counting
   3. allows us to talk formally about how the runtime of an algorithm grows as the inputs grow
3. Simplify Big O Expressions
   1. an algorithm is O\(f\(n\)\) if the number of simple operations the cpu has to do is eventually less than a constant times f\(n\), as n increases
      1. f\(n\) could be constant \(f\(n\) = 1\) 
         1. big O of 1 
         2. O\(1\) =&gt; as function grows run time has no change
         3. ex: n \* \(n +1\) / 2
         4. can simplify log\(n\), n^2, 1 to O\(1\) a constant or flat cost 
      2. f\(n\) could b linear \(f\(n\) = n\)
         1. a for loop - \# of operations increases as n increases
         2. doesn't matter what's before n or added to n 
      3. f\(n\) could be quadratic \(f\(n\) = n^2\) 
         1. a nested for loop 
         2. increases at n^2 as n increases
      4. f\(n\) could be something entirely different! 
4. Time Complexity - _analyzing the runtime of an algorithm as the size of the input increases_
   1. Constants Don't Matter
      1. O\(500\) == O\(1\) ---&gt; very fast
      2. O\(2n\) == O\(n\) ---&gt; medium fast
      3. $$O(13n^2) == O(n^2)$$  ---&gt; slow
   2. Smaller Terms Don't Matter
      1. can remove anything small 
   3. Big O Shorthands
      1. arithmetic operations are constant
      2. variable assignment is constant 
      3. accessing elements in an array \(by index\) or object \(by key\) is constant run time
      4. in a loop, the complexity is the length of the loop \* the complexity of whatever happens inside of the loop \(think there could be a nested loop\)
   4. Examples 
      1. `for loop with i < = Math.max( 5, n) will be O(n)`
      2. `for loop with i <= Math.min( 5, n) will be O(1)` 
         1. constant because can only run max of 5 times and it will then be a constant 5 operations if n &gt;= 5
      3. [https://repl.it/@AndrewCasarsa/only-elements-at-Even-Index\#index.js](https://repl.it/@AndrewCasarsa/only-elements-at-Even-Index#index.js)
5. Space Complexity - analyze the space needed based on the algorithm used
   * auxiliary space only refers to the space taken up by the algo itself not the inputs

   1. Most primitives \(booleans, numbers, undefined, null\) are constant space
   2. Strings require O\(n\) space \(where n is the string length\)
   3. Reference types are generally O\(n\), where n is the length \(for arrays\) or the number of keys \(for objects\)

   * **Examples**

### O\(1\) space

```javascript
function sum(arr) {
    let total = 0 
    // total is a var representing 1 number
    for (let i = 0; i < arr.length; i++) {
    // i is a var representing another number 
        total += arr[i]
    }
    return total;
}

// total amount of space used is constant with just 2 
// O(1) no matter the size of the input
```

**O\(n\) space**

```javascript
function double(arr) { 
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
        newArr.push(2 * arr[i]
        // this makes array longer proportional to n
    }
    return newArr
}
```

1. Evaluate TC and SC of dif algos using big o notation
   1. quizzes i guess
2. What is a logarithm 
   1. inverse of exponentiation
      1.  \(like / and \* are a pair, exponent exponentiation and logarithms are a pair\)
   2. $$logˇ2(8) = 3$$ 
      1. log base 2 of 8 equals 3
      2. 2 to what power equals 8?
         1. $$2^x = 8$$ 
            1. $$2^3 = 8$$ 
   3. $$logˇ(value) = expression === 2^expression = value$$ 

* logs
  * common types
    * binary log is log 2 
    * log 10 
    * log e
  * we'll omit the 2 / 10 / e 
  * log === log2
  * the log of a number roughly measure the number of times you can ÷ that number by 2 \(or base\) before you get a value that's ≤ 1 
    1. 8 ÷ 2 = 4
    2. 4 ÷ 2 = 2
    3. 2 ÷ 2 = 1

    * log\(8\) = 3
* where will we see logs?
  * certain searching algorithms have logarithmic time complexity
  * efficient sorting algorithms involve logarithms
  * recursion sometimes involves logarithmic space complexity

---------------------------------------------------------------------------

### What Is BigO - counting operations 

Write efficient code that doesn't use up very much memory and is still readable 

examples: 

* [https://repl.it/@AndrewCasarsa/sumAllNum](https://repl.it/@AndrewCasarsa/sumAllNum)
  * calculate sum of all num from 1 up to and including n
  * /Users/acasarsa/development/mod6/algos/algo\_class/

Count number of simple operations rather than time it takes to run this bigO

* counting operations:
  * $$n * (n + 1)  /  2$$ 
    * 1 multiplication
    * 1 addition
    * 1 division
  * it has 3 simple operations

```javascript
function addUpTo(n) {
    let total = 0 
    for (let i = 1; i <= n; i++) {
        total += i;
    }
    return total;
}
```

* += 
  * since + is in a loop we perform that as many times as n is = to
  * n additions and n assignments  \(note that assignment isn't really much memory\)
* i++ 
  * n additions, n assignments
* total = 0 
  * 1 assignment
* i = 1 
  * 1 assignment
* i &lt;= n 
  * n comparisons 

**number of operations grows in rough proportion with n** 

\*\*\*\*

