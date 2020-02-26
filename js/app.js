function main() {
  var stree = new SuffixTree();

  var words = ["Azee", "Mississipi", "zee", "Banana", "nana"];

  words.forEach(word => {
    stree.addString(word);
  });

  console.dir(stree);
  //stree.print();
}