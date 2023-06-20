import { useEffect, useState } from "react";
import { View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import { colors } from "../constants/constants";
import { testEmailFormat, testMobileFormat } from "../constants/functions";

const validationReasons = {
  minimumLength: "MIN_LENGTH",
  required: "REQUIRED",
  maximumLength: "MAX_LENGTH",
  inputMismatch: "INPUT_MISMATCH",
  none: "NONE",
};

const inputTypes = {
  mobile: "mobile",
  email: "email",
};

const CAFMInput = (props) => {
  const [error, setError] = useState();
  const [color, setColor] = useState();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!isValid && error) setColor(colors.red);
    else if (isValid && !error && props.value.length > 0)
      setColor(colors.green);
  }, [error, props.value]);

  // causes a force validation when the user presses the register button
  useEffect(() => {
    if (props.validate) validate(props.value);
  }, [props.validate]);

  const getInvalidationType = (text = "") => {
    if (props.required && text.length === 0) return validationReasons.required;

    if (props.minLength && text.length < props.minLength)
      return validationReasons.minimumLength;
    switch (props.type) {
      case inputTypes.mobile: {
        if (!testMobileFormat(text)) return validationReasons.inputMismatch;
      }
      case inputTypes.email: {
        if (!testEmailFormat(text)) return validationReasons.inputMismatch;
      }
    }
    return validationReasons.none;
  };

  const validate = (text) => {
    const invalidReason = getInvalidationType(text);
    console.log(invalidReason, text);
    // revert back to if statements after pushing this commit
    switch (invalidReason) {
      case validationReasons.required: {
        setError("This is a required field!");
        break;
      }
      case validationReasons.minimumLength: {
        setError(`Inputted text must be atleast ${props.minLength} characters`);
        break;
      }
      case validationReasons.inputMismatch: {
        setError("Please enter a valid input");
        break;
      }
      default: {
        setError();
        setIsValid(true);
        return;
      }
    }
    setIsValid(false);
  };

  const onChangeTextHandler = (text) => {
    props.onChangeText(text);
    validate(text);
  };

  return (
    <View>
      <TextInput
        {...props}
        outlineColor={color}
        onChangeText={(text) => onChangeTextHandler(text)}
        label={`${props.label} ${props.required ? "*" : ""}`}
      />
      {error && (
        <HelperText type="error" visible={error}>
          {error}
        </HelperText>
      )}
    </View>
  );
};

export default CAFMInput;
