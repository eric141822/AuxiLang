import words from "../assets/words/data2.json";
import dictionary from "../assets/combines";
import intro_vocab from "../assets/words/intro_vocab.json";
export const getAllWords = function () {
  let allWords = [];
  for (let arr of Object.values(words)) {
    allWords = allWords.concat(arr);
  }
  return allWords;
};

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

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export const getLargeWordsList = function () {
  const wordsWithDef = [];
  let counter = 0;
  Object.keys(dictionary).forEach((key) => {
    let obj = dictionary[key]["MEANINGS"];
    if (obj && !isEmpty(obj)) {
      let arr = obj[Object.keys(obj)[0]];
      let type = arr[0];
      let def = arr[1];
      wordsWithDef.push({
        word: key,
        type: type,
        definition: def,
        id: counter,
        error: 0,
      });
      counter++;
    }
  });
  return wordsWithDef;
};

let largeList = getLargeWordsList();

export const getQuestionAcqHard = function () {
  let item = largeList[(Math.random() * largeList.length) | 0];
  let word = item.word.toUpperCase().split("");
  let hint = item.type + ", " + item.definition;
  let idx = (Math.random() * item.word.length) | 0;
  let answer = word[idx];
  let q = word.slice(0);
  q[idx] = "-";
  return { hint: hint, word: word, answer: answer, q: q, isChecked: false };
};

export const getQuestionAcqIntro = function (intro_vocab) {
  let item = intro_vocab[(Math.random() * intro_vocab.length) | 0];
  let word = item.word.toUpperCase().split("");
  let hint = item.type + ", " + item.definition;
  let idx = (Math.random() * item.word.length) | 0;
  let answer = word[idx];
  let q = word.slice(0);
  q[idx] = "-";
  return { hint: hint, word: word, answer: answer, q: q, isChecked: false };
};
