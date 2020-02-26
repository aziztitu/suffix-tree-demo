/*
Based on Ukkonen's algorithm: https://www.cs.helsinki.fi/u/ukkonen/SuffixT1withFigs.pdf

References:
http://www.allisons.org/ll/AlgDS/Tree/Suffix/
https://stackoverflow.com/questions/9452701/ukkonens-suffix-tree-algorithm-in-plain-english
*/

class SuffixTree {
    constructor() {
        this.text = '';
        this.str_list = [];
        this.nextStrIndex = 0;
        this.seps = [];
        this.root = new Node();
        this.bottom = new Node();
        this.root.suffixLink = this.bottom;
        this.s = this.root;
        this.k = 0;
        this.i = -1;
    }

    addString(str) {
        var sep = "#"+this.nextStrIndex+"#";
        str += sep;
        this.nextStrIndex++;

        var temp = this.text.length;
        this.text += str;
        this.seps.push(sep);
        this.str_list.push(str);
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
            var traNs = s.transition[this.text[k]];
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
            if (!s.transition[t]) return [false, s];
            else return [true, s];
        }
    }

    canonize(s, k, p) {
        if (p < k) return [s, k];
        else {
            var traNs = s.transition[this.text[k]];
            var s2 = traNs[0],
                k2 = traNs[1],
                p2 = traNs[2];

            while (p2 - k2 <= p - k) {
                k = k + p2 - k2 + 1;
                s = s2;

                if (k <= p) {
                    var traNs = s.transition[this.text[k]];
                    s2 = traNs[0];
                    k2 = traNs[1];
                    p2 = traNs[2];
                }
            }

            return [s, k];
        }
    }
}

class Node {
  constructor() {
      this.transition = [];
      this.suffixLink = null;
  }

  addTransition(node, start, end, t) {
      this.transition[t] = [node, start, end];
  }

  isLeaf() {
      return Object.keys(this.transition).length === 0;
  }
}