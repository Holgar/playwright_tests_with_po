const { faker } = require('@faker-js/faker');
const { expect } = require("@playwright/test");

export function createRandomUser(){
  return {
    firstName: faker.string.uuid(),
    lastName: faker.person.lastName(),
    postalCode: faker.location.zipCode()
  };
}

export function parsePrice(inputString) {
    const numberString = inputString.replace(/[^0-9.]/g, '');
    const number = parseFloat(numberString);
    return number;
  } 
  
  
  