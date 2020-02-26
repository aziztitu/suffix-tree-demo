var suffixTree = new SuffixTree();
var wordsTextArea;
var patternInput;
var matchesDiv;
var readyStatus;

function main() {
  wordsTextArea  = $("#words");
  patternInput = $("#pattern");
  matchesDiv = $("#matches");
  readyStatus = $("#readyStatus");

  readyStatus.hide();

  // var testWords = ["Azee", "Mississipi", "zee", "Banana", "nana"];

  // testWords.forEach(word => {
  //   suffixTree.addString(word);
  // });

  //console.dir(suffixTree);
  //suffixTree.print();
}

function preprocess() {
  var words = wordsTextArea.val().split(/(\s+)/);
  console.log(wordsTextArea.val());
  console.log(words);

  words.forEach(word => {
    suffixTree.addString(word);
  });

  wordsTextArea.val("");

  readyStatus.show();

  console.dir(suffixTree);

  search();
}

function search() {
  var pattern = patternInput.val();
  console.log("Pattern: " + pattern);

  var matches = suffixTree.search(pattern);

  console.log(matches);


  var matchesStr = "";
  matches.forEach(match => {
    matchesStr += match + "<br/>";
  });
  matchesDiv.html(matchesStr);
}

function reset() {
  wordsTextArea.val("");
  patternInput.val("");
  matchesDiv.html("");
  suffixTree.clear();
  readyStatus.hide();
}