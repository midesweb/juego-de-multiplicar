import { shuffle } from './libs/shuffle-array.js';

export class MultiplicationGenerator {

  constructor(operator) {
    if (!MultiplicationGenerator.alreadyRealiced) {
      MultiplicationGenerator.alreadyRealiced = [];
    }
    this.operator1 = operator;
  }

  createQuestion() {
    // Creo un array para llevar la cuenta de los valores
    this.valueAppearances = [];
    do {
      var random = this.random(2, 9);
      console.log('intento con ', random);
    } while(this.isRepeated(random));
    let operationString = this.createOperationString(random);
    MultiplicationGenerator.alreadyRealiced.push(operationString)
    return {
      operator1: this.operator1,
      operator2: random,
      operationString: operationString,
      result: this.result(random),
      alternativeAnswers: this.createAlternativeAnswers(random),
    }
    
  }

  random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  }

  isRepeated(operator2) {
    let find = this.createOperationString(operator2);
    let findInverse = this.createInverseOperationString(operator2);
    for(let index in MultiplicationGenerator.alreadyRealiced) {
      if (MultiplicationGenerator.alreadyRealiced[index] == find || MultiplicationGenerator.alreadyRealiced[index] == findInverse) {
        return true;
      }
    }
    return false;
  }

  createOperationString(operator2) {
    return `${this.operator1} X ${operator2}`;
  } 
  createInverseOperationString(operator2) {
    return `${operator2} X ${this.operator1}`;
  } 

  result(operator2) {
    return this.operator1 * operator2;
  }

  createAlternativeAnswers(operator2) {
    let alternatives = [];
    alternatives.push(this.result(operator2));
    alternatives.push(this.wrongWithAddtion(operator2));
    alternatives.push(this.wrongWithMultiplication(operator2));
    return shuffle(alternatives);
  }

  wrongWithAddtion(operator2) {
    let diferencial;
    if(operator2 <= 3) {
      diferencial = this.random(1, 3);
    } else {
      let val = this.random(1, 10);
      if(val > 5) {
        diferencial = this.random(1, 3);
      } else {
        diferencial = this.random(-3, -1);
      }
    }
    return this.result(operator2) + diferencial;
  }

  wrongWithMultiplication(operator2) {
    if(operator2 == 2) {
      return this.result(operator2 + 1);
    }
    let val = this.random(1, 10);
    if (val > 5) {
      return this.result(operator2 + 1);
    } else {
      return this.result(operator2 - 1);
    }
  }
}