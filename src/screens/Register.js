import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Divider, Text } from "react-native-paper";
import { useReducer } from "react";

import { register } from "../store/actions/userActions";
import {
  initialRegistrationState,
  messageType,
  registrationActions,
  screens,
} from "../constants/constants";
import Loading from "../components/Loading";
import CAFMButton from "../components/CAFMButton";
import Message from "../components/Message";
import { createMessageObject } from "../constants/functions";
import CAFMInput from "../components/CAFMInput";

const registrationReducer = (state, action) => {
  switch (action.type) {
    case registrationActions.showLoading: {
      return { ...state, isLoading: true };
    }

    case registrationActions.hideLoading: {
      return { ...state, isLoading: false };
    }

    case registrationActions.updateFname: {
      return { ...state, fname: action.payload };
    }

    case registrationActions.updateLname: {
      return { ...state, lname: action.payload };
    }

    case registrationActions.updateMobile: {
      return { ...state, mobile: action.payload };
    }

    case registrationActions.updateEmail: {
      return { ...state, email: action.payload };
    }

    case registrationActions.updateSite: {
      return { ...state, site: action.payload };
    }

    case registrationActions.updateLocation: {
      return { ...state, location: action.payload };
    }

    case registrationActions.showMsg: {
      return { ...state, msg: action.payload, showError: true };
    }

    case registrationActions.hideMsg: {
      return { ...state, showError: false };
    }

    case registrationActions.attemptRegistration: {
      return { ...state, attemptRegistration: action.payload };
    }

    case registrationActions.reset: {
      return initialRegistrationState;
    }

    default:
      return state;
  }
};

const Register = (props) => {
  const [regState, regDispatch] = useReducer(
    registrationReducer,
    initialRegistrationState
  );

  const returnToLogin = () => {
    props.navigation.replace(screens.login);
  };

  // Dispatches request to register user
  const registerUser = async () => {
    try {
      regDispatch({ type: registrationActions.showLoading });
      regDispatch({
        type: registrationActions.attemptRegistration,
        payload: true,
      });
      const res = await register(
        regState.fname,
        regState.lname,
        regState.email,
        regState.mobile,
        regState.site,
        regState.location
      );
      regDispatch({ type: registrationActions.hideLoading });
      regDispatch({ payload: res, type: registrationActions.showMsg });
    } catch (error) {
      regDispatch({
        type: registrationActions.showMsg,
        payload: createMessageObject(error.message, messageType.warning),
      });
    } finally {
      regDispatch({
        type: registrationActions.attemptRegistration,
        payload: false,
      });
    }
  };

  // Closes dialog message
  const dismissMessage = (success) => {
    if (success) {
      regDispatch({ type: registrationActions.reset });
      returnToLogin();
    }
    regDispatch({ type: registrationActions.hideMsg });
  };

  return (
    <>
      <ScrollView style={styles.page}>
        <Card mode="elevated" style={styles.card}>
          <Card.Content>
            <Text style={styles.title} variant="headlineLarge">
              Register
            </Text>
          </Card.Content>
          <Divider />
          <Card.Content>
            <CAFMInput
              mode="outlined"
              label="First Name"
              style={styles.input}
              value={regState.fname}
              required
              onChangeText={(text) =>
                regDispatch({
                  type: registrationActions.updateFname,
                  payload: text,
                })
              }
              validate={regState.attemptRegistration}
            />
            <CAFMInput
              mode="outlined"
              label="Last Name"
              value={regState.lname}
              style={styles.input}
              onChangeText={(text) =>
                regDispatch({
                  type: registrationActions.updateLname,
                  payload: text,
                })
              }
              validate={regState.attemptRegistration}
            />
            <CAFMInput
              mode="outlined"
              label="Mobile"
              value={regState.mobile}
              type="mobile"
              required
              keyboardType="phone-pad"
              style={styles.input}
              onChangeText={(text) =>
                regDispatch({
                  type: registrationActions.updateMobile,
                  payload: text,
                })
              }
              validate={regState.attemptRegistration}
            />
            <CAFMInput
              mode="outlined"
              label="Email"
              type="email"
              value={regState.email}
              required
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
              onChangeText={(text) =>
                regDispatch({
                  type: registrationActions.updateEmail,
                  payload: text,
                })
              }
              validate={regState.attemptRegistration}
            />
            <CAFMInput
              mode="outlined"
              label="Site/Building Name"
              value={regState.site}
              required
              style={styles.input}
              onChangeText={(text) =>
                regDispatch({
                  type: registrationActions.updateSite,
                  payload: text,
                })
              }
              validate={regState.attemptRegistration}
            />
            <CAFMInput
              mode="outlined"
              label="Location/Room"
              value={regState.location}
              required
              style={styles.input}
              onChangeText={(text) =>
                regDispatch({
                  type: registrationActions.updateLocation,
                  payload: text,
                })
              }
              validate={regState.attemptRegistration}
            />
          </Card.Content>
          {regState.isLoading ? (
            <Loading disableStyles />
          ) : (
            <Card.Actions>
              <CAFMButton onPress={returnToLogin} theme="danger" mode="text">
                Cancel
              </CAFMButton>
              <CAFMButton
                theme="primary"
                mode="contained-tonal"
                onPress={registerUser}
              >
                Register
              </CAFMButton>
            </Card.Actions>
          )}
          {regState.showError && (
            <Message
              error={regState.msg}
              visible={regState.showError}
              dismiss={(success) => dismissMessage(success)}
            />
          )}
        </Card>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  page: {
    height: "100%",
    paddingHorizontal: "8%",
  },
  card: {
    marginVertical: "12%",
  },
  title: {
    textAlign: "center",
  },
  input: {
    marginVertical: "1%",
  },
});

export default Register;
