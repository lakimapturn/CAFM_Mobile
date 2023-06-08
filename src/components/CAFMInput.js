import { View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

const CAFMInput = (props) => {
  return (
    <View>
      <TextInput label={props.label} />
      <HelperText type="error" visible={props.error}>
        {props.error}
      </HelperText>
    </View>
  );
};
