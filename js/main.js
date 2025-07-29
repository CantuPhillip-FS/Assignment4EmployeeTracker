"use strict";

import { PartTime, Manager } from "./employee.js";

// The main class
class Main {
  constructor() {
    this.employees = [];
    this.initialData();
    this.displayMenu();
  }

  initialData() {
    const employee1 = new PartTime("John", 37, 20, 20);
    const employee2 = new PartTime("Sarah", 25, 30, 25);
    const manager1 = new Manager("Dave", 37, 25, 40);
    this.employees.push(employee1, employee2, manager1);
    console.log("ID\tName\tSalary\thrs\tpay\tFT/PT");
    this.employees.forEach((e, index) => {
      console.log(
        `${index + 1}\t${e.name}\t${e.annualSalary}\t${e.hours}\t${
          e.payrate
        }\t${e.type}`
      );
    });
  }

  displayMenu() {
    let selection = parseInt(
      prompt(
        "Main Menu \n" +
          "1. Add Employee \n" +
          "2. Remove Employee \n" +
          "3. Edit Employee \n" +
          "4. Display Employee \n\n" +
          "Enter Selection"
      )
    );
    selection === 1
      ? this.addEmployee()
      : selection === 2
      ? this.removeEmployee()
      : selection === 3
      ? this.editEmployee()
      : selection === 4
      ? this.displayEmployee()
      : alert("There was an error. Refresh the page and try again.");
  }

  addEmployee() {
    let rawData = prompt(
      `What is the new employee's name, age, payrate, and hours?\nSeperate data by commas (i.e. Jason,18,15,20)`
    );
    let newData = rawData.split(","); //create array

    if (newData[3] >= 40) {
      let newManager = new Manager(
        newData[0],
        newData[1],
        newData[2],
        newData[3]
      );
      this.employees.push(newManager);
      console.clear();
      console.log("ID\tName\tSalary\thrs\tpay\tFT/PT");
      this.employees.forEach((e, index) => {
        console.log(
          `${index + 1}\t${e.name}\t${e.annualSalary}\t${e.hours}\t${
            e.payrate
          }\t${e.type}`
        );
      });
    } else {
      let newPartTime = new PartTime(
        newData[0],
        newData[1],
        newData[2],
        newData[3]
      );
      this.employees.push(newPartTime);
      console.clear();
      console.log("ID\tName\tSalary\thrs\tpay\tFT/PT");
      this.employees.forEach((e, index) => {
        console.log(
          `${index + 1}\t${e.name}\t${e.annualSalary}\t${e.hours}\t${
            e.payrate
          }\t${e.type}`
        );
      });
    }
    alert("Employee Added");
    this.displayMenu();
  }

  removeEmployee() {
    let input = prompt("Please enter the Name or ID number of the employee:");
    let emp = null;
    let index = -1; // Convert input to index (ID starts at 1, array starts at 0)

    // Check if input is a number (ID)
    if (!isNaN(input)) {
      index = parseInt(input) - 1;
      if (index >= 0 && index < this.employees.length) {
        emp = this.employees[index];
      }
    } else {
      // Otherwise, search by name (case-insensitive)
      index = this.employees.findIndex(
        (e) => e.name.toLowerCase() === input.toLowerCase()
      );
      if (index !== -1) {
        emp = this.employees[index];
      }
    }
    // If no employee found
    if (!emp) {
      alert("Invalid input. No employee found.");
      this.displayMenu();
      return;
    }

    // Confirm deletion
    const confirmDelete = confirm(
      `Are you sure you want to remove ${emp.name}?`
    );

    if (confirmDelete) {
      this.employees.splice(index, 1);
      console.clear();
      console.log("ID\tName\tSalary\thrs\tpay\tFT/PT");
      this.employees.forEach((e, idx) => {
        console.log(
          `${idx + 1}\t${e.name}\t${e.annualSalary}\t${e.hours}\t${
            e.payrate
          }\t${e.type}`
        );
      });
      alert(`${emp.name} has been removed.`);
    } else {
      alert("Deletion cancelled.");
    }

    this.displayMenu();
  }

  editEmployee() {
    let input = prompt("Please enter the Name or ID number of the employee:");
    let emp = null;
    let index = -1;

    // Check if input is an ID (number)
    if (!isNaN(input)) {
      index = parseInt(input) - 1;
      if (index >= 0 && index < this.employees.length) {
        emp = this.employees[index];
      }
    } else {
      // Otherwise, search by name (case-insensitive)
      index = this.employees.findIndex(
        (e) => e.name.toLowerCase() === input.toLowerCase()
      );
      if (index !== -1) {
        emp = this.employees[index];
      }
    }

    // If no employee is found
    if (!emp) {
      alert("Invalid input. No employee found.");
      this.displayMenu();
      return;
    }

    // Ask for the new pay rate
    let newRate = parseFloat(
      prompt(
        `You've selected ${emp.name}.\n\n` +
          `What is ${emp.name}'s new pay rate?\n` +
          `Please omit the $ dollar i.e. "15.25"`
      )
    );

    // Validate pay rate
    if (isNaN(newRate) || newRate <= 0) {
      alert("Invalid pay rate. Please try again.");
      this.displayMenu();
      return;
    }

    // Update payrate and recalculate salary
    emp.payrate = newRate;
    emp.calculatePay();

    console.clear();
    console.log("ID\tName\tSalary\thrs\tpay\tFT/PT");
    this.employees.forEach((e, idx) => {
      console.log(
        `${idx + 1}\t${e.name}\t${e.annualSalary}\t${e.hours}\t${e.payrate}\t${
          e.type
        }`
      );
    });

    alert(`${emp.name}'s new pay rate has been updated to $${newRate}/hr`);

    this.displayMenu();
  }

  displayEmployee() {
    let input = prompt("Please enter the ID number of the employee:\ni.e. 1");

    // Convert input to index (ID starts at 1, array starts at 0)
    let index = parseInt(input) - 1;

    // Validate input
    if (isNaN(index) || index < 0 || index >= this.employees.length) {
      alert("Invalid ID. Please try again.");
    } else {
      const emp = this.employees[index];
      alert(
        "Here's your requested data:\n\n" +
          `Name: ${emp.name}\n` +
          `Age: ${emp.age}\n` +
          `Payrate: $${emp.payrate}/hr\n` +
          `Hours: ${emp.hours}/wk\n` +
          `Type: ${emp.type}\n` +
          `Annual Salary: $${emp.annualSalary.toLocaleString()}`
      );
    }
    console.clear();
    console.log("ID\tName\tSalary\thrs\tpay\tFT/PT");
    this.employees.forEach((e, index) => {
      console.log(
        `${index + 1}\t${e.name}\t${e.annualSalary}\t${e.hours}\t${
          e.payrate
        }\t${e.type}`
      );
    });
    this.displayMenu(); // Return to menu
  }
}

// IIFE to run to initiate a new instance of the main class
(() => {
  const app = new Main();
})();
