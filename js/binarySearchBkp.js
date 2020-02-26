function getWordIndex(wordIndexInText) {
    var l = 0;
    var r = this.wordIndicesInText.length - 1;

    while (l <= r) {
        var cur = Math.floor((l + r) / 2);

        console.log({
            wordIndexInText,
            letter: this.text[wordIndexInText],
            cur,
            l,
            r,
        });

        if (
            wordIndexInText >= this.wordIndicesInText[cur] &&
            (cur == this.wordIndicesInText.length - 1 ||
                wordIndexInText < this.wordIndicesInText[cur + 1])
        ) {
            return cur;
        }

        if (l == r) {
            return cur;
        }

        if (wordIndexInText > this.wordIndicesInText[cur]) {
            l = cur + 1;
        } else {
            r = cur - 1;
        }
    }
}
