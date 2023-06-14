import { SelectList } from "react-native-dropdown-select-list";
import { Button } from "react-native-paper";
import { StyleSheet, View } from "react-native";

import { colors, filterActions } from "../constants/constants";

const FilterView = (props) => {
  const maxHeight = 100;

  return (
    <>
      <View style={styles.container}>
        <SelectList
          setSelected={(date) => props.onSelect(filterActions.updateDate, date)}
          data={props.dates}
          save="key"
          placeholder="Select Time Period"
          search={false}
          maxHeight={maxHeight}
          boxStyles={[styles.bgWhite, styles.input]}
          dropdownStyles={styles.bgWhite}
        />
        <SelectList
          setSelected={(status) =>
            props.onSelect(filterActions.setStatusId, status)
          }
          data={props.statuses}
          save="key"
          placeholder="Select Status"
          search={false}
          maxHeight={maxHeight}
          boxStyles={[styles.bgWhite, styles.input]}
          dropdownStyles={styles.bgWhite}
        />
        <View style={styles.buttonContainer}>
          <Button mode="text" onPress={props.cancel}>
            Cancel
          </Button>
          <Button mode="elevated" onPress={props.confirm}>
            Confirm
          </Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "3%",
    marginTop: "2%",
  },
  input: {
    marginVertical: "2%",
  },
  bgWhite: {
    backgroundColor: colors.white,
  },
  buttonContainer: {
    marginHorizontal: "10%",
  },
});

export default FilterView;
