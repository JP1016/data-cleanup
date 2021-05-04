export function propertyIsNull(property: null | undefined | string): boolean {
  return !property;
}

export function isValidZipCode(zipCode: string | undefined | null): boolean {
  return !!zipCode && /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode);
}
