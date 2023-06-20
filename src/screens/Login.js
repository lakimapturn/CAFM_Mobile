import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import { Card, TextInput, Divider, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { authenticate, syncUserData } from "../store/actions/userActions";
import { formatErrorMsg, messageType, screens } from "../constants/constants";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { createMessageObject, testMobileFormat } from "../constants/functions";
import CAFMButton from "../components/CAFMButton";
import CAFMInput from "../components/CAFMInput";

const Login = (props) => {
  const dispatch = useDispatch();

  const [mobileNum, setMobileNum] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [showError, setShowError] = useState(false);
  const [attemptRegistration, setAttemptRegistration] = useState(false);

  const login = async () => {
    setIsLoading(true);
    setAttemptRegistration(true);
    try {
      await dispatch(authenticate(mobileNum, password));
      await props.navigation.replace(screens.home);
    } catch (err) {
      setError(err.message);
      setShowError(true);
    } finally {
      setIsLoading(false);
      setAttemptRegistration(false);
    }
  };

  // Sends user to registration screen
  const registerNewUser = () => {
    props.navigation.replace(screens.register);
  };

  // Closes Error Dialog
  const dismissError = () => {
    setShowError(false);
    setError();
  };

  useEffect(() => {
    const loginUser = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("user");
        if (jsonValue !== null) {
          await dispatch(syncUserData(jsonValue));
          await props.navigation.replace(screens.home);
        }
      } catch (err) {
        setError(err);
        setShowError(true);
      }
    };
    loginUser();
  }, []);

  return (
    <View style={styles.page}>
      <Card style={styles.card} mode="elevated">
        <Card.Content>
          <Text style={styles.title} variant="headlineLarge">
            Login
          </Text>
        </Card.Content>
        <Divider />
        <Card.Content>
          <CAFMInput
            mode="outlined"
            label="Mobile"
            required
            value={mobileNum}
            type="mobile"
            right={<TextInput.Icon icon="cellphone" />}
            onChangeText={(text) => setMobileNum(text)}
            style={styles.input}
            keyboardType="phone-pad"
            validate={attemptRegistration}
          />
          <CAFMInput
            mode="outlined"
            label="Password"
            value={password}
            required
            secureTextEntry
            right={<TextInput.Icon icon="key" />}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            validate={attemptRegistration}
          />
          <View style={styles.buttonContainer}>
            {isLoading ? (
              <Loading disableStyles />
            ) : (
              <>
                <CAFMButton
                  mode="elevated"
                  theme="primary"
                  onPress={login}
                  style={styles.authButton}
                >
                  Login
                </CAFMButton>
                <CAFMButton
                  theme="secondary"
                  style={styles.authButton}
                  mode="text"
                  onPress={registerNewUser}
                >
                  Register new user
                </CAFMButton>
              </>
            )}
          </View>
        </Card.Content>
      </Card>
      <Message error={error} visible={showError} dismiss={dismissError} />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    top: "16%",
    height: "100%",
  },
  card: {
    margin: "10%",
  },
  input: {
    marginVertical: "1.5%",
  },
  buttonContainer: {
    marginTop: "2%",
  },
  authButton: {
    marginHorizontal: "5%",
    marginVertical: "2%",
  },
  title: {
    textAlign: "center",
  },
});

export default Login;
