/*
Based on Ukkonen's algorithm: https://www.cs.helsinki.fi/u/ukkonen/SuffixT1withFigs.pdf

References:
http://www.allisons.org/ll/AlgDS/Tree/Suffix/
https://stackoverflow.com/questions/9452701/ukkonens-suffix-tree-algorithm-in-plain-english
https://stackoverflow.com/questions/28278802/ukkonens-algorithm-for-generalized-suffix-trees
*/

class SuffixTree {
    constructor() {
        this.clear();
    }

    clear() {
        this.text = '';

        this.words = [];
        this.nextStrIndex = 0;
        this.delimiters = [];

        this.root = new Node();
        this.bottom = new Node();
        this.root.suffixLink = this.bottom;

        this.s = this.root;
        this.k = 0;
        this.i = -1;
    }

    addString(str) {
        str = str.replace(/[^a-zA-Z0-9]/g, '').trim();

        if (str.length == 0) {
          return;
        }

        //var sep = str[str.length-1];
        var sep = '#' + this.nextStrIndex + '#';
        str += sep;
        this.nextStrIndex++;

        var temp = this.text.length;
        this.text += str.toLowerCase();
        this.delimiters.push(sep);
        this.words.push(str);
        var s, k, i;
        s = this.s;
        k = this.k;
        i = this.i;

        for (var j = temp; j < this.text.length; j++) {
            this.bottom.addTransition(this.root, j, j, this.text[j]);
        }

        while (this.text[i + 1]) {
            i++;
            var up = this.update(s, k, i);
            up = this.canonize(up[0], up[1], i);
            s = up[0];
            k = up[1];
        }

        this.s = s;
        this.k = k;
        this.i = i;
        return this;
    }

    update(s, k, i) {
        var oldr = this.root;
        var endAndr = this.testAndSplit(s, k, i - 1, this.text[i]);
        var endPoint = endAndr[0];
        var r = endAndr[1];

        while (!endPoint) {
            r.addTransition(new Node(), i, Infinity, this.text[i]);

            if (oldr != this.root) {
                oldr.suffixLink = r;
            }

            oldr = r;
            var sAndk = this.canonize(s.suffixLink, k, i - 1);
            s = sAndk[0];
            k = sAndk[1];
            endAndr = this.testAndSplit(s, k, i - 1, this.text[i]);
            var endPoint = endAndr[0];
            var r = endAndr[1];
        }

        if (oldr != this.root) {
            oldr.suffixLink = s;
        }

        return [s, k];
    }

    testAndSplit(s, k, p, t) {
        if (k <= p) {
            var traNs = s.transitions[this.text[k]];
            var s2 = traNs[0],
                k2 = traNs[1],
                p2 = traNs[2];
            if (t == this.text[k2 + p - k + 1]) {
                return [true, s];
            } else {
                var r = new Node();
                s.addTransition(r, k2, k2 + p - k, this.text[k2]);
                r.addTransition(s2, k2 + p - k + 1, p2, this.text[k2 + p - k + 1]);
                return [false, r];
            }
        } else {
            if (!s.transitions[t]) return [false, s];
            else return [true, s];
        }
    }

    canonize(s, k, p) {
        if (p < k) return [s, k];
        else {
            var traNs = s.transitions[this.text[k]];
            var s2 = traNs[0],
                k2 = traNs[1],
                p2 = traNs[2];

            while (p2 - k2 <= p - k) {
                k = k + p2 - k2 + 1;
                s = s2;

                if (k <= p) {
                    var traNs = s.transitions[this.text[k]];
                    s2 = traNs[0];
                    k2 = traNs[1];
                    p2 = traNs[2];
                }
            }

            return [s, k];
        }
    }

    search(pattern) {
        pattern = pattern.toLowerCase();

        var matchedWordIds = [];

        var curNode = this.root;
        var curPatternIndex = 0;

        while (curNode != null) {
            var selectedTrans = null;
            for (let key in curNode.transitions) {
                if (key === pattern[curPatternIndex]) {
                    selectedTrans = curNode.transitions[key];
                    break;
                }
            }

            if (selectedTrans == null) {
                return [];
            }

            let textIndex = selectedTrans[1];
            for (; textIndex <= selectedTrans[2]; textIndex++) {
                if (this.text[textIndex] === pattern[curPatternIndex]) {
                    curPatternIndex++;
                    if (curPatternIndex >= pattern.length) {
                        break;
                    }
                } else {
                    // Transition Fails
                    return [];
                }
            }

            if (curPatternIndex >= pattern.length) {
                matchedWordIds = this.selectWordsUnder(selectedTrans);
                console.log('Got words under');
                console.log(selectedTrans);
                console.log(matchedWordIds);

                curNode = null;
            } else {
                curNode = selectedTrans[0];
            }
        }

        return Array.from(matchedWordIds).map((matchedWordId) =>
            this.words[matchedWordId].slice(0, this.words[matchedWordId].length - 3)
        );
    }

    selectWordsUnder(transition) {
        let curTransitions = [transition];

        let matchedTransitions = [];

        while (curTransitions.length > 0) {
            var curTransition = curTransitions.pop();
            if (Object.keys(curTransition[0].transitions).length == 0) {
                matchedTransitions.push(curTransition);
            } else {
                for (var key in curTransition[0].transitions) {
                    /*let keyPos = curNode.transitions[key][1];
                        if (keyPos > 0 && keyPos < this.text.length) {
                        if (this.text[keyPos - 1] === '#' && this.text[keyPos + 1] === '#') {
                            continue;
                        }
                    }*/
                    curTransitions.push(curTransition[0].transitions[key]);
                }
            }
        }

        var matchedWordIds = new Set();
        matchedTransitions
            .map((transition) => {
                for (let i = transition[1]; i < this.text.length; i++) {
                    if (i > 0 && i < this.text.length - 1) {
                        if (this.text[i - 1] === '#' && this.text[i + 1] === '#') {
                            return +this.text[i];
                        }
                    }

                    if (i < this.text.length - 3) {
                        if (this.text[i + 1] === '#' && this.text[i + 3] === '#') {
                            return +this.text[i + 2];
                        }
                    }

                    if (this.text[i] === '#' && i > 1 && this.text[i - 2] == '#') {
                        return +this.text[i - 1];
                    }

                    if (
                        this.text[i] === '#' &&
                        i < this.text.length - 2 &&
                        this.text[i + 2] == '#'
                    ) {
                        return +this.text[i + 1];
                    }
                }
            })
            .forEach((matchedWordId) => matchedWordIds.add(matchedWordId));

        return matchedWordIds;
    }
}

class Node {
    constructor() {
        this.transitions = [];
        this.suffixLink = null;
    }

    addTransition(node, start, end, t) {
        this.transitions[t] = [node, start, end];
    }

    isLeaf() {
        return Object.keys(this.transitions).length === 0;
    }
}
