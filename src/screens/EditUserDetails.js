import { StyleSheet, View } from "react-native";
import { Divider, Text, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {
  colors,
  formatErrorMsg,
  messageType,
  successfulOperation,
  userDetailOptions,
} from "../constants/constants";
import { updateEmail, updateMobile } from "../store/actions/userActions";
import {
  createMessageObject,
  testEmailFormat,
  testMobileFormat,
} from "../constants/functions";
import Message from "../components/Message";
import Loading from "../components/Loading";
import CAFMButton from "../components/CAFMButton";

const EditUserDetails = (props) => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.user.isFetching);

  const [value, setValue] = useState(props.route.params.value);
  const [msg, setMsg] = useState();
  const [showMsg, setShowMsg] = useState();

  const keyboardType =
    props.route.params.field == userDetailOptions.email
      ? "email-address"
      : "phone-pad";

  // determines what value is being editted on this page
  const editType =
    props.route.params.field == userDetailOptions.email ? "Email" : "Phone";

  // returns user to previous screen
  const returnToPrevScreen = () => props.navigation.pop();

  // tests format of value and then submits new data to the backend
  const onSubmit = () => {
    try {
      if (props.route.params.field === userDetailOptions.email) {
        if (!testEmailFormat(value)) {
          throw new Error(
            createMessageObject(formatErrorMsg.email, messageType.warning)
          );
        }
        dispatch(updateEmail(value, props.route.params.id));
      } else {
        if (!testMobileFormat(value)) {
          throw new Error(
            createMessageObject(formatErrorMsg.mobile, messageType.warning)
          );
        }
        dispatch(updateMobile(value, props.route.params.id));
      }
      setMsg(createMessageObject(successfulOperation, messageType.success));
      setShowMsg(true);
      returnToPrevScreen();
    } catch (error) {
      setMsg(error.message);
      setShowMsg(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} variant="headlineLarge">
        Edit {editType}
      </Text>
      <Divider bold style={styles.divider} />
      <TextInput
        value={value}
        onChangeText={(text) => setValue(text)}
        label={editType}
        mode="outlined"
        keyboardType={keyboardType}
      />
      <View style={styles.buttonContainer}>
        {isLoading ? (
          <Loading disableStyles />
        ) : (
          <>
            <CAFMButton theme="danger" mode="text" onPress={returnToPrevScreen}>
              Cancel
            </CAFMButton>
            <CAFMButton
              theme="primary"
              mode="contained-tonal"
              onPress={onSubmit}
            >
              Confirm
            </CAFMButton>
          </>
        )}
      </View>
      <Message
        error={msg}
        visible={showMsg}
        dismiss={() => setShowMsg(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, padding: "3%" },
  title: { textAlign: "center", marginVertical: "2%" },
  divider: { marginVertical: "2%" },
  buttonContainer: {
    marginVertical: "2%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default EditUserDetails;
