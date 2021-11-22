import { Intro } from './intro';

export function Puzzles(){
    this.collection = this.fetch();
}

Puzzles.prototype.fetch = function(){
    return Intro;
}
Puzzles.prototype.getRandom = function(){
    let randomIndex = Math.floor(Math.random()*(this.collection.length-1));
    return this.collection[randomIndex];
}