import { RootState } from "./Root";

// Define action types
export type ActionType =
  | { type: "INIT"; payload: Pick<RootState, "users" | "searchStr"> }
  | { type: "DELETE"; payload: string }
  | { type: "SELECT"; payload: string }
  | { type: "LOADING" };

// Define the reducer function
const reducer = (state: RootState, action: ActionType): RootState => {
  switch (action.type) {
    case "INIT": {
      const { users, searchStr } = action.payload;

      const filteredUsers = users.filter(
        (user) =>
          !searchStr ||
          Object.values(user)
            .join("")
            .toLowerCase()
            .includes(searchStr.toLowerCase())
      );

      return {
        ...state,
        searchStr,
        users: filteredUsers,
        loading: false,
      };
    }
    case "LOADING": {
      return { ...state, loading: true };
    }
    case "DELETE": {
      const id = action.payload;
      return {
        ...state,
        users: state.users.filter((user) => !(id === "all" || user.id === id)),
      };
    }
    // case "SELECT": {
    //   const { paginatedUsers, selectedUserIds } = state;
    //   let userIds = selectedUserIds;
    //   if (action.payload === "all") {
    //     userIds =
    //       selectedUserIds.length === 0
    //         ? paginatedUsers.map((user) => user.id)
    //         : [];
    //   } else if (selectedUserIds.includes(action.payload)) {
    //     userIds = [...selectedUserIds, action.payload];
    //   } else {
    //     userIds = selectedUserIds.filter((id) => id !== action.payload);
    //   }
    //   return { ...state, selectedUserIds: userIds };
    // }
    default:
      return state;
  }
};

export default reducer;
