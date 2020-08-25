import { shuffle } from './libs/shuffle-array.js';

export class MultiplicationGenerator {

  constructor(operator) {
    if (!MultiplicationGenerator.alreadyRealiced) {
      MultiplicationGenerator.alreadyRealiced = [];
    }
    this.operator1 = operator;
  }

  createQuestion(operator) {
    this.operator1 = operator;
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
    return `${this.operator1} x ${operator2}`;
  } 
  createInverseOperationString(operator2) {
    return `${operator2} x ${this.operator1}`;
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
    let operator = this.minimum(this.operator1, operator2);
    console.log('el minimo es ', operator);
    switch (operator) {
      case 2:
        diferencial = 1;
        break;
      case 3:
        diferencial = this.random(1, 2);
        break;
      default:
        diferencial = this.random(1, 3);
    }
    if(this.randomBoolean) {
      return this.result(operator2) + diferencial;
    }
    return this.result(operator2) - diferencial;  
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

  minimum(val1, val2) {
    if(val1 <= val2) {
      return val1;
    }
    return val2;
  }

  randomBoolean() {
    let val = this.random(1, 10);
    if(val > 5) {
      return true;
    }
    return false;
  }
}
