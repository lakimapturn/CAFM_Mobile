import { StyleSheet } from "react-native";
import { Portal, Dialog, Text, Button } from "react-native-paper";
import { colors, messageType } from "../constants/constants";

const Error = (props) => {
  let err;
  let color;
  if (props.error) {
    err = JSON.parse(props.error);
  }

  switch (err?.Code) {
    case messageType.error: {
      color = colors.red;
      break;
    }
    case messageType.warning: {
      color = colors.yellow;
      break;
    }
    default:
      color = colors.red;
  }

  return (
    <Portal>
      <Dialog
        style={(styles.dialog, { backgroundColor: color })}
        visible={err}
        onDismiss={props.dismissError}
      >
        <Dialog.Content style={styles.textContainer}>
          <Text style={styles.text} variant="bodyMedium">
            {err?.Text}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button textColor={colors.white} more="text" onPress={props.dismiss}>
            Dismiss
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: "red",
  },
  textContainer: {
    paddingVertical: 0,
  },
  text: {
    color: colors.white,
    padding: 0,
  },
  bgTransparent: {
    backgroundColor: "transparent",
  },
});

export default Error;
