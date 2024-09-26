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
  let value = target.value;

   // If the subscript is 'zipcode'
  if (subscript === "zipcode") {
    // Remove the '〒' character if present
    if (value.includes("〒")) {
      value = value.replace("〒", "");
    }

    // Check if full-width digits are present
    const fullWidthRegex = /[０-９]/;
    if (fullWidthRegex.test(value)) {
      // Convert full-width digits to half-width digits
      value = value.replace(/[０-９]/g, (s) =>
        String.fromCharCode(s.charCodeAt(0) - 0xFEE0)
      );
    }
  }

  const isValid = validate(value, regexFormat[subscript]); // Use the modified value for validation
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
