import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View } from "react-native";

import Loading from "../components/Loading";
import { getTickets } from "../store/actions/ticketActions";

const TicketView = (props) => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.ticket.isFetching);
  const tickets = useSelector((state) => state.ticket.tickets);

  //   useEffect(async () => {
  //     await dispatch(getTickets());
  //   }, []);

  const addTicket = () => {
    // pass a ticket id of 0 to add
  };

  return <>{isLoading ? <Loading /> : <View></View>}</>;
};

export default TicketView;
