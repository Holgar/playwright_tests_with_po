const { faker } = require('@faker-js/faker');

export function createRandomUser(){
  return {
    firstName: faker.string.uuid(),
    lastName: faker.person.lastName(),
    postalCode: faker.location.zipCode()
  };
}