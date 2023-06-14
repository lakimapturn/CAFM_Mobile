import { useEffect, useReducer, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Divider, Text, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { SelectList } from "react-native-dropdown-select-list";
import DocumentPicker, { types } from "react-native-document-picker";

import {
  colors,
  initialTicketState,
  ticketActions,
} from "../constants/constants";
import { addEditTicket, getIssueList } from "../store/actions/ticketActions";
import {
  formatVisitTime,
  getDefaultDropdownOption,
  getDropdownData,
} from "../constants/functions";
import Message from "../components/Message";

const AddEditTicketReducer = (state, action) => {
  switch (action.type) {
    case ticketActions.updateIssueDetails: {
      return { ...state, issueDetails: action.payload };
    }

    case ticketActions.updateVisitTime: {
      return { ...state, visitTime: action.payload };
    }

    case ticketActions.setIssuesVisible: {
      return { ...state, issuesVisible: action.payload };
    }

    case ticketActions.chooseIssue: {
      return { ...state, issue: action.payload };
    }

    case ticketActions.chooseFile: {
      return { ...state, files: action.payload };
    }

    case ticketActions.showMsg: {
      return { ...state, msg: action.payload, showMsg: true };
    }

    case ticketActions.hideMsg: {
      return { ...state, showMsg: false };
    }

    default:
      return state;
  }
};

const AddEditTicket = (props) => {
  const dispatch = useDispatch();
  const issues = useSelector((state) => state.ticket.issues);
  const user = useSelector((state) => state.user);
  const [dropdownData, setDropdownData] = useState([]);

  const ticket = props.route.params?.ticketInfo;
  const dropDownDefault = getDefaultDropdownOption(ticket);

  const [ticketState, ticketDispatch] = useReducer(AddEditTicketReducer, {
    ...initialTicketState,
    issue: ticket?.IssueId,
    issueDetails: ticket?.IssueDetails,
    visitTime: formatVisitTime(ticket?.Remark),
  });

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

  useEffect(
    () => setDropdownData(getDropdownData(issues, "IssueId", "IssueName")),
    [issues]
  );

  const handleDocumentPicking = async () => {
    {
      try {
        const files = await DocumentPicker.pick({
          allowMultiSelection: true,
          type: [types.pdf, types.images],
        });

        console.log(files);
        ticketDispatch({
          type: ticketActions.chooseFile,
          payload: files.slice(0, Math.min(3, files.length - 1)),
        });
        if (files.length > 3)
          ticketDispatch({
            type: ticketActions.showMsg,
            payload: "File limit is 3. Only first 3 files were used.",
          });
      } catch (error) {
        ticketDispatch({
          type: ticketActions.showMsg,
          payload: error.message,
        });
      }
    }
  };

  const onConfirm = async () => {
    const ticket = {
      TicketId: ticket ? ticket.id : 0,
      IssueId: ticketState.issue,
      IssueDetails: ticketState.issueDetails,
      Remarks: "",
      TimeToVisit: ticketState.visitTime,
      Status: ticket ? ticket.TicketStatus : 1,
      StatusRemark: "",
      LoggedInUser: user.ProfileId,
      SiteId: user.SiteIds,
      LocationId: user.LocationId,
    };
    try {
      await dispatch(addEditTicket(ticket));
      // await dispatch(addFiles(ticketState.files));
      await props.navigation.pop();
    } catch (error) {
      ticketDispatch({ type: ticketActions.showMsg, payload: error.message });
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} variant="displaySmall">
        {ticket ? "Edit" : "Add"} Ticket
      </Text>
      <Divider horizontalInset bold style={styles.divider} />
      <View style={styles.inputContainer}>
        <SelectList
          setSelected={(issue) =>
            ticketDispatch({ type: ticketActions.chooseIssue, payload: issue })
          }
          data={dropdownData}
          save="key"
          defaultOption={dropDownDefault}
          placeholder="Issue"
          searchPlaceholder="Search Issues"
        />
        <TextInput
          mode="outlined"
          label="Issue Details"
          value={ticketState.issueDetails}
          onChangeText={(text) =>
            ticketDispatch({
              type: ticketActions.updateIssueDetails,
              payload: text,
            })
          }
          style={styles.input}
        />
        <TextInput
          mode="outlined"
          label="Good time to visit?"
          value={ticketState.visitTime}
          style={styles.input}
          onChangeText={(text) =>
            ticketDispatch({
              type: ticketActions.updateVisitTime,
              payload: text,
            })
          }
        />
        <Button onPress={handleDocumentPicking}>Choose file</Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="text" onPress={returnToPrevScreen}>
          Cancel
        </Button>
        <Button mode="contained-tonal" onPress={onConfirm}>
          Confirm
        </Button>
      </View>
      <Message
        error={ticketState.msg}
        visible={ticketState.showMsg}
        dismiss={() => ticketDispatch({ type: ticketActions.hideMsg })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  title: { textAlign: "center", marginVertical: "2%" },
  divider: { marginVertical: "2%" },
  inputContainer: { padding: "5%" },
  input: { marginVertical: "2%" },
  buttonContainer: {
    marginVertical: "2%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default AddEditTicket;
