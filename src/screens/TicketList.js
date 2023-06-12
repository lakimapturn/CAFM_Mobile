import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlatList, View } from "react-native";

import Loading from "../components/Loading";
import { getIssueList, getTickets } from "../store/actions/ticketActions";
import Ticket from "../components/Ticket";
import {
  filterActions,
  initalTicketFilterState,
  screens,
} from "../constants/constants";

const filterReducer = (state, action) => {
  switch (action.type) {
    case filterActions.updateDate: {
      return { ...state, fromDate: newDate() - 1, toDate: newDate() };
    }

    case filterActions.nextPage: {
      return { ...state, PageIndex: state.PageIndex + 1 };
    }

    case filterActions.setStatusId: {
      return { ...state, StatusId: action.payload };
    }

    case filterActions.prevPage: {
      return { ...state, PageIndex: state.PageIndex - 1 };
    }
  }
};

const TicketList = (props) => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.ticket.isFetching);
  const tickets = useSelector((state) => state.ticket.tickets);

  const [filterState, filterDispatch] = useReducer(
    filterReducer,
    initalTicketFilterState
  );

  const [numTicketsVisible, setNumTicketsVisible] = useState(25);
  let lastTicketNum = numTicketsVisible;

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        await dispatch(getTickets(filterState));
      } catch (error) {
        console.log(error);
      }
    };
    fetchTickets();
  }, [filterState]);

  const addTicket = () => {
    // pass a ticket id of 0 to add
  };

  const editTicket = (ticket) => {
    props.navigation.navigate(screens.addEditTicket, { ticket: ticket });
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <View>
          <FlatList
            data={tickets}
            keyExtractor={(ticket) => ticket.id}
            renderItem={({ item, index }) => (
              <Ticket
                ticket={item}
                key={item.id}
                onPressEdit={(ticket) => editTicket(ticket)}
              />
            )}
          />
        </View>
      )}
    </>
  );
};

export default TicketList;
