# Suffix tree

## I. OVERVIEW

A "trie" is a tree-like data structure whose nodes store the letters of an alphabet. A Suffix tree is simply a compressed "trie" for all suffixes of a given text, and is extremely useful in searching for patterns.

A regular Suffix tree is made of a single string, but in order to store multiple strings, a Generalized Suffix tree is used, which is also discussed in this document.

This document provides the basics of using a Suffix Tree, and the details of building a suffix tree is provided here:
[Building the Generalized Suffix Tree](buildingASuffixTree.md)

## II. HOW DOES IT WORK?

A Suffix Tree works by storing all the suffixes of the word(s) in a tree like structure.

For example, the suffixes of the word "Banana" are:
- Banana
- anana
- nana
- ana
- na
- a

So, the suffixes of the word "Banana" can be respresented in a tree like structure like this:

[Step 1] (images/SuffixTreeBuildStep1.jpg)

This section explains in detail how the data structure works and how someone might go about implementing it in real code. If the student is writing about an existing STL implementation, this section still explains how the data structure works but focuses on the STL API instead of implementation details. This section should most likely be a mixture of natural language as well as short code snippets. Students should feel free to create diagrams if they would illustrate your point well. The tutorial should refer to the example code in the repository where appropriate. In short, the author should do whatever he or she feels is most appropriate to convey the information in an effective and interesting way.

Students do not necessarily need to describe time and memory complexity for the data structure (Big-O notation), but that may be helpful in the description depending on your approach. It will likely be difficult to give a complete picture of the data structure without explaining (at least casually) the time complexity of adding, removing, and accessing elements.

## III. HOW IS THIS DATA STRUCTURE USEFUL?

What sorts of data is this structure commonly used for? Why is it a better solution for certain applications than similar data structures? This section should discuss these generalities but also describe at least one specific example of an appropriate usage (For example, queues are ideal for handling OS input events such as key presses and mouse movements in the order the user makes them).

## IV. FURTHER READING

Students should cite any sources they used in preparing this tutorial (with inline citations in the text, as appropriate). It is okay to base an implementation on an existing one as long as the student makes significant changes to the code and properly credits the source. This section may also include recommendations for other sources the reader may find helpful. These sources can be URLs or traditional Works Cited entries for published material.

It is important to correctly cite the sources used. It is okay to look at other code. It is not okay to turn in other people's code and misrepresent it as your own.

