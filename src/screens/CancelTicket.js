import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Text, TextInput } from "react-native-paper";
import { useState } from "react";

import Message from "../components/Message";
import CAFMButton from "../components/CAFMButton";
import Loading from "../components/Loading";
import {
  colors,
  messageType,
  successfulOperation,
} from "../constants/constants";
import { addEditTicket } from "../store/actions/ticketActions";
import { createMessageObject } from "../constants/functions";

const CancelTicket = (props) => {
  const dispatch = useDispatch();

  const ticket = props.route.params.ticket;

  const isViewing = ticket.TicketStatus === 8;

  const [reason, setReason] = useState(isViewing ? ticket.Remark : "");
  const [msg, setMsg] = useState("");
  const [showMsg, setShowMsg] = useState();

  const isLoading = useSelector((state) => state.ticket.isFetching);

  const returnToPrevScreen = () => {
    props.navigation.pop();
  };

  const onSubmit = () => {
    const data = { ...ticket, StatusRemark: reason, Status: 8 };
    try {
      if (reason === "") throw new Error("Please enter a reason");
      dispatch(addEditTicket(data));
      returnToPrevScreen();
      setMsg(createMessageObject(successfulOperation, messageType.success));
      setShowMsg(true);
    } catch (error) {
      setMsg(createMessageObject(msg.message, messageType.warning));
      setShowMsg(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} variant="headlineLarge">
        Cancel Ticket
      </Text>
      <Divider bold style={styles.divider} />
      {isViewing && (
        <TextInput
          editable={false}
          label="Cancelled On"
          value={ticket.ModifiedDate}
          mode="outlined"
          style={styles.input}
        />
      )}
      <TextInput
        numberOfLines={3}
        editable={!isViewing}
        value={reason}
        style={styles.input}
        onChangeText={(text) => setReason(text)}
        label={`Reason${isViewing ? "" : "*"}`}
        mode="outlined"
      />
      {!isViewing && (
        <View style={styles.buttonContainer}>
          {isLoading ? (
            <Loading disableStyles />
          ) : (
            <>
              <CAFMButton
                theme="danger"
                mode="text"
                onPress={returnToPrevScreen}
              >
                Return
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
      )}
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
  input: { marginVertical: "2%" },
  divider: { marginVertical: "2%" },
  buttonContainer: {
    marginVertical: "2%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default CancelTicket;
