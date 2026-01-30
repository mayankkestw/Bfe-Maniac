const str = "This latest React Frontend / UI framework";
const words = ["latest", "Front", "end", "work"];

// This <strong>latest</strong> React <strong>Frontend</<strong> / UI frame<strong>work</strong>

function highlight(str, words) {
  const uniqueWords = new Set(words);
  const wordsArr = str.split(" ");

  const results = wordsArr.map(w => {
    if (uniqueWords.has(w)) {
      return `<strong>${w}</strong>`;
    } else {
      for (let i = 0; i < w.length; i++) {
        const pre = w.slice(0, i + 1);
        const suff = w.slice(i + 1);

        if (uniqueWords.has(pre) && uniqueWords.has(suff)) {
          return `<strong>${w}</strong>`;
        } else if (!uniqueWords.has(pre) && uniqueWords.has(suff)) {
          return `${pre}<strong>${suff}</strong>`;
        } else if (uniqueWords.has(pre) && !uniqueWords.has(suff)) {
          return `<strong>${pre}</strong>${suff}`;
        }
      }
    }
    return w;
  });

  return results.join(" ");
}


console.log(highlight(str, words));
