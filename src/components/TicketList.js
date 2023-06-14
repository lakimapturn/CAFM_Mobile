import { useEffect, useState } from "react";
import { IconButton, Text } from "react-native-paper";
import { StyleSheet, View, FlatList } from "react-native";

import Ticket from "./Ticket";
import { useSelector } from "react-redux";
import { initialTicketFilterState } from "../constants/constants";

const TicketList = (props) => {
  const totalTickets = useSelector((state) => state.ticket.totalTickets);

  const [isPrevButtonDisabled, setPrevButtonDisabled] = useState(false);
  const [isNextButtonDisabled, setNextButtonDisabled] = useState(false);

  useEffect(() => {
    if (initialTicketFilterState.PageSize * props.page > totalTickets)
      setNextButtonDisabled(true);
    else setNextButtonDisabled(false);

    if (props.page === 1) setPrevButtonDisabled(true);
    else setPrevButtonDisabled(false);
  }, [props.page]);

  return (
    <>
      <View style={styles.listControlsContainer}>
        <IconButton
          disabled={isPrevButtonDisabled}
          icon="chevron-left"
          size={20}
          onPress={props.prevPage}
        />
        <Text>Page {props.page}</Text>
        <IconButton
          disabled={isNextButtonDisabled}
          icon="chevron-right"
          size={20}
          onPress={props.nextPage}
        />
      </View>
      <FlatList
        data={props.tickets}
        keyExtractor={(ticket) => ticket?.id}
        renderItem={({ item, index }) => (
          <Ticket
            ticket={item}
            key={item?.id}
            onPressEdit={(ticket) => props.editTicket(ticket)}
          />
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  listControlsContainer: {
    paddingHorizontal: "2%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default TicketList;
