import { isValidZipCode, propertyIsNull } from "../../src/helpers/validators";

describe("Validate Helpers", () => {
  test("it should return true if property name is null or empty", () => {
    const person: Person = {
      id: "1",
      name: null,
      address: "",
      zip: "123",
    };
    expect(propertyIsNull(person.name)).toBe(true);
  });

  test("it should return false if property name is valid", () => {
    const person: Person = {
      id: "1",
      name: "Jithin",
      address: "",
      zip: "123",
    };
    expect(propertyIsNull(person.name)).toBe(false);
  });

  test("it should return true if property address is null or empty", () => {
    const person: Person = {
      id: "1",
      name: null,
      address: "",
      zip: "123",
    };
    expect(propertyIsNull(person.address)).toBe(true);
  });

  test("it should return false if property address is valid", () => {
    const person: Person = {
      id: "1",
      name: null,
      address: "Kerala",
      zip: "123",
    };
    expect(propertyIsNull(person.address)).toBe(false);
  });

  test("it should return true if property zip is null or empty", () => {
    const person: Person = {
      id: "1",
      name: null,
      address: "",
      zip: "",
    };

    expect(propertyIsNull(person.zip)).toBe(true);
  });

  test("it should return false if property zip is null or empty", () => {
    const person: Person = {
      id: "1",
      name: null,
      address: "",
      zip: "85001",
    };
    expect(propertyIsNull(person.zip)).toBe(false);
  });

  test("it should return true if zip is invalid", () => {
    const person: Person = {
      id: "1",
      name: null,
      address: "",
      zip: "85001",
    };
    expect(isValidZipCode(person.zip)).toBe(true);
  });

  test("it should return false if zip is invalid", () => {
    const person: Person = {
      id: "1",
      name: null,
      address: "",
      zip: "123",
    };
    expect(isValidZipCode(person.zip)).toBe(false);
  });

  test("it should return false if zip is invalid", () => {
    const person: Person = {
      id: "1",
      name: null,
      address: "",
      zip: "0",
    };
    expect(isValidZipCode(person.zip)).toBe(false);
  });
});
