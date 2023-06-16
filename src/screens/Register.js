import { StyleSheet, View } from "react-native";
import { Button, Card, Divider, Text, TextInput } from "react-native-paper";
import { useReducer } from "react";

import { register } from "../store/actions/userActions";
import {
  colors,
  initialRegistrationState,
  messageType,
  registrationActions,
  screens,
} from "../constants/constants";
import Loading from "../components/Loading";

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
    regDispatch({ type: registrationActions.showLoading });
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
      {regState.isLoading ? (
        <Loading />
      ) : (
        <View style={styles.page}>
          <Card mode="elevated">
            <Card.Content>
              <Text style={styles.title} variant="headlineLarge">
                Register
              </Text>
            </Card.Content>
            <Divider />
            <Card.Content>
              <TextInput
                mode="outlined"
                label="First Name"
                style={styles.input}
                onChangeText={(text) =>
                  regDispatch({
                    type: registrationActions.updateFname,
                    payload: text,
                  })
                }
              />
              <TextInput
                mode="outlined"
                label="Last Name"
                style={styles.input}
                onChangeText={(text) =>
                  regDispatch({
                    type: registrationActions.updateLname,
                    payload: text,
                  })
                }
              />
              <TextInput
                mode="outlined"
                label="Mobile"
                style={styles.input}
                onChangeText={(text) =>
                  regDispatch({
                    type: registrationActions.updateMobile,
                    payload: text,
                  })
                }
              />
              <TextInput
                mode="outlined"
                label="Email"
                style={styles.input}
                onChangeText={(text) =>
                  regDispatch({
                    type: registrationActions.updateEmail,
                    payload: text,
                  })
                }
              />
              <TextInput
                mode="outlined"
                label="Site/Building Name"
                style={styles.input}
                onChangeText={(text) =>
                  regDispatch({
                    type: registrationActions.updateSite,
                    payload: text,
                  })
                }
              />
              <TextInput
                mode="outlined"
                label="Location/Room"
                style={styles.input}
                onChangeText={(text) =>
                  regDispatch({
                    type: registrationActions.updateLocation,
                    payload: text,
                  })
                }
              />
            </Card.Content>
            <Card.Actions>
              <Button onPress={returnToLogin} textColor="red" mode="text">
                Cancel
              </Button>
              <Button
                // disabled={isButtonDisabled}
                mode="contained-tonal"
                onPress={registerUser}
                buttonColor={colors.green}
                textColor={colors.white}
              >
                Register
              </Button>
            </Card.Actions>
            {regState.showError && (
              <Error
                error={regState.msg}
                visible={regState.showError}
                dismiss={(success) => dismissMessage(success)}
              />
            )}
          </Card>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  page: {
    top: "8%",
    height: "100%",
    paddingHorizontal: "8%",
  },
  title: {
    textAlign: "center",
  },
  input: {
    marginVertical: "1%",
  },
});

export default Register;
