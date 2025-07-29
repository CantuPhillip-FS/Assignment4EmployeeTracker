"use strict";

// superclass
export class Employee {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.annualSalary = 0;
    this.type = "";
  }
}

// subclass
export class Manager extends Employee {
  constructor(name, age, payrate, hours) {
    super(name, age);
    this.type = "Manager";
    this.payrate = payrate;
    this.hours = hours;
    this.calculatePay();
  }
  calculatePay() {
    this.annualSalary = this.payrate * this.hours * 52 - 1000;
  }
}

// subclass
export class PartTime extends Employee {
  constructor(name, age, payrate, hours) {
    super(name, age);
    this.type = "Part Time";
    this.payrate = payrate;
    this.hours = hours;
    this.calculatePay();
  }
  calculatePay() {
    this.annualSalary = this.payrate * this.hours * 52;
  }
}

/*
 *   Notes:
 *   Full Sail did not teach this method of exporting.
 *   I was unsure of how to export a class and so I searched.
 *   I found this article: https://dev.to/askyt/how-to-export-a-class-in-javascript-nfm
 *   I'm glad I learned this.
 */
