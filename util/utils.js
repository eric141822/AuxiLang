import words from "../assets/words/data2.json";
import dictionary from "../assets/combines";
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
  Object.keys(dictionary).forEach((key) => {
    let obj = dictionary[key]["MEANINGS"];
    if (obj && !isEmpty(obj)) {
      // console.log(key, obj[Object.keys(obj)[0]]);
      let arr = obj[Object.keys(obj)[0]];
      let type = arr[0];
      let def = arr[1];
      //   console.log(key, type, def);
      wordsWithDef.push({ word: key, type: type, definition: def });
    }
  });
  return wordsWithDef;
  //   for (const word of Object.keys(dictionary)) {
  //     console.log(word);
  //     if (word["MEANINGS"]) {
  //       let arr = word["MEANINGS"][Object.keys(word["MEANINGS"][0])];
  //       let type = arr[0];
  //       let def = arr[1];
  //       console.log(type, def);
  //     }
  //     break;
  //   }
};
