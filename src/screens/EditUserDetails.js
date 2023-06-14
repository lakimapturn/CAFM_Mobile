import { StyleSheet, View } from "react-native";
import { Button, Divider, Text, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { colors, userDetailOptions } from "../constants/constants";
import { updateEmail, updateMobile } from "../store/actions/userActions";

const EditUserDetails = (props) => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(props.route.params.value);

  const editType =
    props.route.params.field == userDetailOptions.email ? "Email" : "Phone";

  const onChangeTextHandler = (text) => {
    setValue(text);
  };

  const returnToPrevScreen = () => props.navigation.pop();

  const onSubmit = () => {
    if (props.route.params.field === userDetailOptions.email)
      dispatch(updateEmail(value, props.route.params.id));
    else dispatch(updateMobile(value, props.route.params.id));

    returnToPrevScreen();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} variant="headlineLarge">
        Edit {editType}
      </Text>
      <Divider bold style={styles.divider} />
      <TextInput
        value={value}
        onChangeText={(text) => onChangeTextHandler(text)}
        label={editType}
        mode="outlined"
      />
      <View style={styles.buttonContainer}>
        <Button mode="text" onPress={returnToPrevScreen}>
          Cancel
        </Button>
        <Button mode="contained-tonal" onPress={onSubmit}>
          Confirm
        </Button>
      </View>
      {/* <Message
        error={ticketState.msg}
        visible={ticketState.showMsg}
        dismiss={() => ticketDispatch({ type: ticketActions.hideMsg })}
      /> */}
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
