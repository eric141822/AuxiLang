import words from "../assets/words/data2.json";
export const randomProperty = function (obj) {
  var keys = Object.keys(obj);
  var key = keys[(keys.length * Math.random()) | 0];
  return { word_arr: obj[key], key: key };
};

export const randomWord = function () {
  let obj = randomProperty(words);
  return {
    hint: obj.key,
    word: obj.word_arr[(Math.random() * obj.word_arr.length) | 0]
      .toUpperCase()
      .split(""),
  };
};

export const questionAcq = function (obj) {
  let idx = (Math.random() * obj.word.length) | 0;
  obj.answer = obj.word[idx];
  obj.q = obj.word.slice(0);
  obj.q[idx] = "-";
  return obj;
};
