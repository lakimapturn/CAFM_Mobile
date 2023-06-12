import { StyleSheet, View } from "react-native";
import { Button, Divider, Text, TextInput } from "react-native-paper";
import { colors } from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getIssueList } from "../store/actions/ticketActions";

const AddEditTicket = (props) => {
  const dispatch = useDispatch();
  const issues = useSelector((state) => state.ticket.issues);

  const returnToPrevScreen = () => props.navigation.pop();

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        await dispatch(getIssueList());
      } catch (error) {
        console.log(error);
      }
    };
    fetchIssues();
  }, []);

  const ticket = props.route.params?.ticket;

  return (
    <View style={{ height: "100%", backgroundColor: colors.white }}>
      <Text style={styles.title} variant="displaySmall">
        {ticket ? "Edit" : "Add"} Ticket
      </Text>
      <Divider horizontalInset bold style={styles.divider} />
      <View>
        <TextInput
          mode="outlined"
          label="Issue"
          value={ticket?.issue}
          style={styles.input}
        />
        <TextInput
          mode="outlined"
          label="Issue Details"
          value={ticket?.IssueDetails}
          style={styles.input}
        />
        <TextInput
          mode="outlined"
          label="Good time to visit?"
          value={ticket?.Remark}
          style={styles.input}
        />
        {/* File input field goes here */}
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="text" onPress={returnToPrevScreen}>
          Cancel
        </Button>
        <Button mode="contained-tonal">Confirm</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: { textAlign: "center", marginVertical: "2%" },
  divider: { marginVertical: "2%" },
  input: { marginVertical: "2%" },
  buttonContainer: {
    marginVertical: "2%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default AddEditTicket;
