import { View } from "react-native";
import { Button, Card, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { register } from "../store/actions/userActions";
import { colors, screens } from "../constants/constants";

const Register = (props) => {
  const dispatch = useDispatch();

  const [response, setResponse] = useState();

  const returnToLogin = () => {
    props.navigation.replace(screens.login);
  };

  const registerUser = async () => {
    const res = await dispatch(register());
    setResponse(res);
  };

  return (
    <View style={{ padding: "5%" }}>
      <Card mode="elevated">
        <Card.Content>
          <TextInput
            mode="outlined"
            label="First Name"
            onChangeText={(text) => setMobileNum(text)}
          />
          <TextInput
            mode="outlined"
            label="Last Name"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            mode="outlined"
            label="Mobile"
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            mode="outlined"
            label="Email"
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            mode="outlined"
            label="Site/Building Name"
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            mode="outlined"
            label="Location/Room"
            onChangeText={(text) => setPassword(text)}
          />
        </Card.Content>

        <Card.Actions>
          {response ? (
            <>
              <Text>{response}</Text>
              <Button onPress={returnToLogin}>Return to login</Button>
            </>
          ) : (
            <>
              <Button onPress={returnToLogin} textColor="red" mode="elevated">
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
            </>
          )}
        </Card.Actions>
      </Card>
    </View>
  );
};

export default Register;
