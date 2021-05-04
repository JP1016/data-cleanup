import { DataCleaner } from "./../src/index";
describe("Validate Processing function", () => {
  test("it should return false if property name,address or zip is invalid", () => {
    const person: Person = {
      id: "1",
      name: null,
      address: "",
      zip: "123",
    };
    expect(new DataCleaner().hasValidProperties(person)).toBe(false);
  });
  test("it should return true if property name,address or zip is valid", () => {
    const person: Person = {
      id: "1",
      name: "Jithin",
      address: "India",
      zip: "29356",
    };
    expect(new DataCleaner().hasValidProperties(person)).toBe(true);
  });
});

describe("Core Validation Function", () => {
  test("it should return true if the record is valid", () => {
    const person: Person = {
      id: "1",
      name: "Jithin",
      address: "India",
      zip: "29356",
    };
    const { isValid, id } = new DataCleaner().validatePerson(person);
    expect(isValid).toBe(true);
    expect(id).toBe("1");
  });

  test("it should return false if the record is invalid", () => {
    const person: Person = {
      id: "1",
      name: "Jithin",
      address: "India",
      zip: "1",
    };
    const { isValid, id } = new DataCleaner().validatePerson(person);
    expect(isValid).toBe(false);
    expect(id).toBe("1");
  });

  test("it should return false if the record is invalid", () => {
    const person: Person = {
      id: "1",
      name: "",
      address: "India",
      zip: "44422",
    };
    const { isValid, id } = new DataCleaner().validatePerson(person);
    expect(isValid).toBe(false);
    expect(id).toBe("1");
  });

  test("it should return false if the record is invalid", () => {
    const person: Person = {
      id: "1",
      name: "",
      address: "",
      zip: "44422",
    };
    const { isValid, id } = new DataCleaner().validatePerson(person);
    expect(isValid).toBe(false);
    expect(id).toBe("1");
  });

  test("it should return false if the record is invalid", () => {
    const person: Person = {
      id: "1",
      name: "",
      address: "",
      zip: "",
    };
    const { isValid, id } = new DataCleaner().validatePerson(person);
    expect(isValid).toBe(false);
    expect(id).toBe("1");
  });
});
