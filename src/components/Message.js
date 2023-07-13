import { StyleSheet } from "react-native";
import { Portal, Dialog, Text, Button, Snackbar } from "react-native-paper";
import { colors, messageType } from "../constants/constants";
import { memo } from "react";

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

  const success = messageType.success === err?.MessageTypeValue;

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
    props.dismiss(success);
  };

  return (
    <Portal>
      <Snackbar
        style={(styles.dialog, { backgroundColor: color, borderColor: color })}
        visible={props.visible}
        onDismiss={props.dismiss}
        action={{
          label: "Dismiss",
          onPress: onDismissMessage,
          textColor: colors.white,
        }}
        duration={2000}
      >
        <Text
          style={[styles.text, { textAlign: success ? "center" : "left" }]}
          variant="titleSmall"
        >
          {err?.Text}
        </Text>
      </Snackbar>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    borderWidth: 2,
    opacity: 0.5,
  },
  textContainer: {
    paddingVertical: "2%",
  },
  text: {
    color: colors.white,
    padding: 0,
  },
  bgTransparent: {
    backgroundColor: "transparent",
  },
});

export default memo(Message);
