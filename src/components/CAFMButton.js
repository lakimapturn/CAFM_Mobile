import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { colors } from "../constants/constants";

const theme = {
  primary: {
    fillButton: {
      background: colors.green,
      text: colors.white,
    },
    textButton: {
      text: colors.green,
    },
  },
  danger: {
    textButton: {
      text: colors.red,
    },
  },
  secondary: {
    fillButton: {
      background: colors.blue,
      text: colors.white,
    },
    textButton: {
      text: colors.blue,
    },
  },
};

const CAFMButton = (props) => {
  let bgColor = "",
    textColor = "";
  switch (props.theme) {
    case "primary": {
      if (props.mode === "text") textColor = theme.primary.textButton.text;
      else {
        bgColor = theme.primary.fillButton.background;
        textColor = theme.primary.fillButton.text;
      }
      break;
    }
    case "danger": {
      textColor = theme.danger.textButton.text;
      break;
    }
    case "secondary": {
      if (props.mode === "text") textColor = theme.secondary.textButton.text;
      else {
        bgColor = theme.secondary.fillButton.background;
        textColor = theme.secondary.fillButton.text;
      }
      break;
    }
  }
  return (
    <Button {...props} textColor={textColor} buttonColor={bgColor}>
      {props.children}
    </Button>
  );
};

const styles = StyleSheet.create({
  primaryFillButton: {
    backgroundColor: colors.green,
  },
  primaryFillText: {
    color: colors.white,
  },
  primaryText: colors.green,
});

export default CAFMButton;
