export function isEmptyValue(value: string) {
  return value.trim() !== '';
}

export function isValidEmail(value: string) {
  return value.includes('@');
}

export function isValidPassword(value: string) {
  return value.length >= 8;
}
