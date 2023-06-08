import { View } from "react-native";
import { useState, useEffect } from "react";
import {
  Card,
  TextInput,
  TextInputMask,
  Button,
  Text,
  Banner,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { authenticate } from "../store/actions/userActions";
import { screens } from "../constants/constants";
import Loading from "../components/Loading";

const Login = (props) => {
  const dispatch = useDispatch();

  const [mobileNum, setMobileNum] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // Function that runs everytime mobileNum or password change.
  useEffect(() => {
    if (mobileNum.length > 2 && password.length > 2) setIsButtonDisabled(false);
    else setIsButtonDisabled(true);
  }, [mobileNum, password]);

  const login = async () => {
    setIsLoading(true);
    try {
      await dispatch(authenticate(mobileNum, password));
      props.navigation.replace(screens.tickets);
      setMobileNum("");
      setPassword("");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const registerNewUser = () => {
    props.navigation.reset({
      index: 0,
      routes: [{ name: screens.register }],
    });
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <View style={{ padding: "5%" }}>
          <Card mode="elevated">
            <Card.Content>
              <TextInput
                mode="outlined"
                label="Mobile"
                //   render={(props) => (
                //     <TextInputMask {...props} mask="+[00] [000] [000] [000]" />
                //   )}
                right={<TextInput.Icon icon="cellphone" />}
                onChangeText={(text) => setMobileNum(text)}
              />
              <TextInput
                mode="outlined"
                label="Password"
                secureTextEntry
                right={<TextInput.Icon icon="key" />}
                onChangeText={(text) => setPassword(text)}
              />
              <Button
                disabled={isButtonDisabled}
                mode="elevated"
                onPress={login}
              >
                Login
              </Button>
            </Card.Content>
            <Card.Actions>
              <Button mode="elevated" onPress={registerNewUser}>
                Register new user
              </Button>
            </Card.Actions>
          </Card>
          {/* <Banner visible={error}>{error}</Banner> */}
        </View>
      )}
    </>
  );
};

export default Login;
