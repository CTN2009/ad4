import { regexFormat } from "@consts/consts";
import type { ValidationResult } from "@type/index";

export const validate = (value: string, regexValue: RegExp): boolean => {
  return regexValue.test(value);
};

export const initValidationResult = (): ValidationResult => {
  return {
    isValid: false,
    message: "",
  };
};

export const updateValidateState = (
  value: string,
  isValid: boolean,
): ValidationResult => {
  const result: ValidationResult = initValidationResult();
  if (value === "") {
    result.isValid = false;
    result.message = "入力してください";
    return result;
  }
  if (isValid) {
    result.isValid = true;
    return result;
  }
  if (!isValid) {
    result.isValid = false;
    result.message = "入力内容をご確認ください";
    return result;
  }
  return result;
};

export const genericInputHandler = (
  event: Event,
  subscript: string,
  callBack: (isValid: boolean, value: string) => void = () => {},
): ValidationResult => {
  const target = event.target as HTMLInputElement;
  const value = target.value;
  const isValid = validate(target.value, regexFormat[subscript]);
  const stateObject = updateValidateState(value, isValid);
  callBack(isValid, value);
  return stateObject;
};

export const zipcodeHandler = (
  value: string,
  subscript: string
): ValidationResult => {
  const isValid = validate(value, regexFormat[subscript]);
  const stateObject = updateValidateState(value, isValid);
  return stateObject;
};
