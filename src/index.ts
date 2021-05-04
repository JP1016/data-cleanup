import StreamArray from "stream-json/streamers/StreamArray";
import fs from "fs";

import { isValidZipCode, propertyIsNull } from "./helpers/validators";

export class DataCleaner {
  // seenHashes holds the hash of person, by combining name,address and zip if all are valid values.
  private seenHashes: Record<string, string> = {};

  // Checks if the person has valid values for name, address and zip
  hasValidProperties(person: Person): boolean {
    const isNameNull = propertyIsNull(person.name);
    const isAddressNull = propertyIsNull(person.address);
    const isValidZip = isValidZipCode(person.zip);

    if (isNameNull || isAddressNull || !isValidZip) {
      return false;
    }
    return true;
  }

  // Check for duplicates in the seenhashes
  checkForDuplicate(person: Person): boolean {
    const personHash = person.name! + person.address! + person.zip;
    const hashPresent = personHash in this.seenHashes;

    return hashPresent;
  }

  // Adds an entry to seen hashes
  addToSeenHashes(person: Person) {
    const personHash = person.name! + person.address! + person.zip;
    this.seenHashes[personHash] = person.id;
  }

  // Performs validation of person, name,address, zip and duplicate check.
  validatePerson(person: Person) {
    if (this.hasValidProperties(person)) {
      // If the validations for address, name and zip are passed
      // proceed to check for duplicate check
      const hashPresent = this.checkForDuplicate(person);
      if (!hashPresent) {
        this.addToSeenHashes(person);
        return { isValid: true, id: person.id, hashPresent };
      }

      // Print the id of the person, as the hash is already present in the lookup list.
      return { isValid: false, id: person.id, hashPresent };
    } else {
      // If name, address or zip code is not valid
      // Print the id of the person
      return { isValid: false, id: person.id, hashPresent: false };
    }
  }

  process() {
    const jsonStream = StreamArray.withParser() as any;
    fs.createReadStream("./src/data/details.json").pipe(jsonStream.input);

    // Process the json by chunks and validating them.
    jsonStream.on("data", ({ value: person }: { value: Person }) => {
      const { isValid, id, hashPresent } = this.validatePerson(person);
      if (!isValid) {
        console.log(id);
      }
      if (!isValid && hashPresent) {
        // To print the id of the duplicate element
        const personHash = person.name! + person.address! + person.zip;
        console.log(this.seenHashes[personHash]);
      }
    });
  }
}

if (process.env.JEST_WORKER_ID === undefined) {
  new DataCleaner().process();
}
