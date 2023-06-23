import { useEffect, useReducer, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  Divider,
  IconButton,
  List,
  Text,
  TextInput,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { SelectList } from "react-native-dropdown-select-list";
import DocumentPicker, { types, isCancel } from "react-native-document-picker";
// import * as DocumentPicker from "expo-document-picker";

import {
  colors,
  initialTicketState,
  messageType,
  successfulOperation,
  ticketActions,
} from "../constants/constants";
import {
  addEditTicket,
  getIssueList,
  getTicketDocuments,
} from "../store/actions/ticketActions";
import {
  createMessageObject,
  formatVisitTime,
  getDefaultDropdownOption,
  getDropdownData,
} from "../constants/functions";
import Message from "../components/Message";
import Loading from "../components/Loading";
import CAFMButton from "../components/CAFMButton";

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

    case ticketActions.setFiles: {
      return {
        ...state,
        files: action.payload.map((file) => ({
          name: file.OriginalDocName,
          DocID: file.DocID,
        })),
        deletedFiles: [],
      };
    }

    case ticketActions.addFile: {
      return {
        ...state,
        files: [
          ...state.files,
          ...action.payload.splice(
            0,
            Math.min(3 - state.files.length, action.payload.length)
          ),
        ],
      };
    }

    case ticketActions.deleteFile: {
      state.deletedFiles.push(state.files.splice(action.payload, 1)[0]);

      return {
        ...state,
        files: state.files,
        deletedFiles: state.deletedFiles,
      };
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
  const files = useSelector((state) => state.ticket.files);
  const user = useSelector((state) => state.user);
  const isLoading = useSelector((state) => state.ticket.isFetching);
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

    // only get documents if we are editing a ticket
    if (ticket) {
      const getFiles = async () => {
        try {
          await dispatch(getTicketDocuments(ticket?.TicketId));
        } catch (error) {
          console.log(error);
        }
      };
      getFiles();
    }
  }, []);

  useEffect(() => {
    ticketDispatch({ type: ticketActions.setFiles, payload: files });
  }, [files]);

  useEffect(() => {
    setDropdownData(getDropdownData(issues, "IssueId", "IssueName"));
  }, [issues]);

  const handleDocumentPicking = async () => {
    {
      try {
        const docs = await DocumentPicker.pick({
          allowMultiSelection: true,
          type: [types.pdf, types.images],
        });

        ticketDispatch({
          type: ticketActions.addFile,
          payload: docs,
        });

        if (ticketState.files.length > 3)
          ticketDispatch({
            type: ticketActions.showMsg,
            payload: createMessageObject(
              "File limit is 3. Only first 3 files were used.",
              messageType.warning
            ),
          });
      } catch (error) {
        if (!isCancel(error))
          ticketDispatch({
            type: ticketActions.showMsg,
            payload: createMessageObject(error.message, messageType.error),
          });
      }
    }
  };

  const onConfirm = async () => {
    const data = {
      TicketId: ticket ? ticket.TicketId : 0,
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
      await dispatch(
        addEditTicket(data, ticketState.files, ticketState.deletedFiles)
      );
      await ticketDispatch({
        type: ticketActions.showMsg,
        payload: createMessageObject(successfulOperation, messageType.success),
      });
      props.navigation.pop();
    } catch (error) {
      ticketDispatch({
        type: ticketActions.showMsg,
        payload: createMessageObject(error.message, messageType.error),
      });
    }
  };

  const onDismissMessage = (success) => {
    ticketDispatch({ type: ticketActions.hideMsg });
    if (success) props.navigation.pop();
  };

  const removeFile = (index) => {
    ticketDispatch({
      type: ticketActions.deleteFile,
      payload: index,
    });
  };

  return (
    <ScrollView style={styles.container}>
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
        {ticketState.files?.length <= 3 && (
          <CAFMButton
            theme="secondary"
            mode="text"
            onPress={handleDocumentPicking}
          >
            Choose file
          </CAFMButton>
        )}
        <Text variant="labelSmall" style={styles.fileUploadHelperText}>
          {ticketState.files.length}/3 Files Uploaded
        </Text>
        {ticketState.files?.length > 0 && (
          <>
            <List.Subheader>Selected Files</List.Subheader>
            <Divider />
            {ticketState.files.map((file, index) => (
              <>
                <List.Item
                  key={index}
                  title={file.name}
                  right={(props) => (
                    <IconButton
                      {...props}
                      icon="delete"
                      iconColor={colors.red}
                      size={15}
                      onPress={() => removeFile(index)}
                    />
                  )}
                />
                <Divider />
              </>
            ))}
          </>
        )}
      </View>
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
              onPress={onConfirm}
            >
              Confirm
            </CAFMButton>
          </>
        )}
      </View>
      <Message
        error={ticketState.msg}
        visible={ticketState.showMsg}
        dismiss={(success) => onDismissMessage(success)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  title: { textAlign: "center", marginVertical: "2%" },
  divider: { marginVertical: "2%" },
  inputContainer: { padding: "5%" },
  input: { marginVertical: "2%" },
  fileUploadHelperText: { textAlign: "center" },
  buttonContainer: {
    marginVertical: "2%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default AddEditTicket;
