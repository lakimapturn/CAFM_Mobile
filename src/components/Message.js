import { StyleSheet } from "react-native";
import { Portal, Dialog, Text, Button } from "react-native-paper";
import { colors, messageType } from "../constants/constants";

const Message = (props) => {
  let err;
  let color;

  if (props.error) {
    err = JSON.parse(props.error);
  }

  switch (err?.MessageTypeValue) {
    case messageType.error: {
      color = colors.red;
      break;
    }
    case messageType.warning: {
      color = colors.yellow;
      break;
    }
    case messageType.success: {
      color = colors.green;
    }
  }

  if (!err) return;

  return (
    <Portal>
      <Dialog
        style={(styles.dialog, { backgroundColor: color })}
        visible={props.visible}
        onDismiss={props.dismiss}
      >
        <Dialog.Content style={styles.textContainer}>
          <Text style={styles.text} variant="bodyLarge">
            {err?.Text}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            textColor={colors.white}
            more="contained"
            onPress={props.dismiss}
          >
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

export default Message;
