import { View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const Loading = (props) => {
  return (
    <View style={props.disableStyles ? styles.marginSmall : [styles.center]}>
      <ActivityIndicator size={props.large && "large"} />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  marginSmall: {
    margin: "2%",
  },
});

export default Loading;
