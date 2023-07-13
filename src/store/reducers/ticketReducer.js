import {
  ADD_TICKET,
  GET_TICKETS,
  FETCHING,
  EDIT_TICKET,
  GET_ISSUE_LIST,
  GET_PARAMETERS,
  STOP_FETCHING,
  GET_TICKET_DOCS,
  CLEAR_TICKET_DOCS,
} from "../actions/ticketActions";

const initialState = {
  isFetching: false,
  // title: "",
  // description: "",
  // TicketId: 0,
  // TicketNo: "",
  // TicketDate: "", // is this string or date type
  // ReportedByName: "",
  // ReportedBy: 0,
  // IssueId: 0,
  // TicketTypeName: "",
  // IssueDetails: "test",
  // Priority: 0,
  // AssignedTo: null,
  // AssignedToName: "",
  // TicketType: 0,
  // AssetId: 0,
  // LocationId: 0,
  tickets: [],
  files: [],
  statuses: [],
  dates: [],
  issues: [],
  totalTickets: 0,
};

const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING: {
      return Object.assign({}, state, {
        ...state,
        isFetching: true,
      });
    }

    case STOP_FETCHING: {
      return Object.assign({}, state, {
        ...state,
        isFetching: false,
      });
    }

    case GET_TICKETS: {
      return Object.assign({}, state, {
        ...state,
        isFetching: false,
        tickets: action.payload.tickets,
        totalTickets: action.payload.totalTickets,
      });
    }

    // case ADD_TICKET: {
    //   return Object.assign({}, state, {
    //     ...state,
    //     isFetching: false,
    //     tickets: [action.payload, ...state.tickets],
    //   });
    // }

    // case EDIT_TICKET: {
    //   // updating existing state to contain new ticket
    //   const edittedTickets = state.tickets;
    //   edittedTickets[
    //     state.tickets.findIndex((ticket) => ticket.id === action.payload.id)
    //   ] = action.payload.id;

    //   return Object.assign({}, state, {
    //     ...state,
    //     isFetching: false,
    //     tickets: edittedTickets,
    //   });
    // }

    case GET_TICKET_DOCS: {
      return Object.assign({}, state, {
        ...state,
        isFetching: false,
        files: action.payload.Documents,
      });
    }

    case CLEAR_TICKET_DOCS: {
      return Object.assign({}, state, {
        ...state,
        isFetching: false,
        files: [],
      });
    }

    case GET_ISSUE_LIST: {
      return Object.assign({}, state, {
        ...state,
        isFetching: false,
        issues: action.payload.IssueList,
      });
    }

    case GET_PARAMETERS: {
      return Object.assign({}, state, {
        ...state,
        isFetching: false,
        statuses: action.payload.filter((item) => item.ParameterTypeId === 5),
        dates: action.payload.filter((item) => item.ParameterTypeId === 63),
      });
    }

    default: {
      return state;
    }
  }
};

export default ticketReducer;
