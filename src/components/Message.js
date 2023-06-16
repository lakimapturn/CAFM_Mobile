import { StyleSheet } from "react-native";
import { Portal, Dialog, Text, Button } from "react-native-paper";
import { colors, messageType } from "../constants/constants";

const Message = (props) => {
  let err;
  let color;
  let icon;

  if (props.error) {
    try {
      err = JSON.parse(props.error);
    } catch (error) {
      err = props.error;
    }
  }

  switch (err?.MessageTypeValue) {
    case messageType.error: {
      color = colors.red;
      icon = "alpha-x-circle";
      break;
    }
    case messageType.warning: {
      color = colors.yellow;
      icon = "alert-circle-outline";
      break;
    }
    case messageType.success: {
      color = colors.green;
      icon = "check-decagram-outline";
      break;
    }
    default:
      color = colors.grey;
  }

  if (!err) return;

  const onDismissMessage = () => {
    props.dismiss(messageType.success === err?.MessageTypeValue);
  };

  return (
    <Portal>
      <Dialog
        style={(styles.dialog, { backgroundColor: color, borderColor: color })}
        visible={props.visible}
        onDismiss={props.dismiss}
      >
        {icon && <Dialog.Icon icon={icon} color={colors.white} size={35} />}
        <Dialog.Content style={styles.textContainer}>
          <Text style={styles.text} variant="titleMedium">
            {err?.Text}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            textColor={colors.white}
            more="contained"
            onPress={onDismissMessage}
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
    borderWidth: 2,
    opacity: 0.5,
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
