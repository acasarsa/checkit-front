# Arrays

How Array grows -- 

start with initialized container that has x spaces 

when array is full - to add more what do we do? we need to make something new. Copy array and add 1 to it. so that copies each thing in old array then adds one.$$(n + 1) * x$$    n = array length. this is not efficient!! 

#### do this in an amortized constant amount of time:

some operations will take much longer than others but the average amount of time each op takes will be a constant value. 

double the size of original array. copy array and double it.  first step of copying it is 2n + 1 step to double. then you have 2n single operation adds. others take a constant time and first step takes time proportional to step before. 





