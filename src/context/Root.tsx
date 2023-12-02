"use client";

import UsersService from "@/services/users";
import { User } from "@/types/User";
import { useSearchParams } from "next/navigation";
import {
  ReactNode,
  createContext,
  useReducer,
  Dispatch,
  useEffect,
} from "react"; // Import Dispatch
import reducer, { ActionType } from "./reducer";

// Define the shape of your state
export interface RootState {
  users: User[];
  loading: boolean;
  searchStr: string;
  selectedUserIds: string[];
}

const INITIAL_STATE: RootState = {
  users: [],
  loading: true,
  searchStr: "",
  selectedUserIds: [],
};

// Export the types for your context
export type RootContextType = RootState & {
  dispatch: Dispatch<ActionType>;
};

export const root = createContext<RootContextType | undefined>(undefined);
export const rootDispatch = createContext<Dispatch<ActionType> | undefined>(
  undefined
);

const RootProvider = ({ children }: { children: ReactNode }) => {
  const params = useSearchParams();

  const searchString = params.get("search") || "";

  const [state, dispatch] = useReducer(reducer, {
    ...INITIAL_STATE,
  });

  console.log(state);

  useEffect(() => {
    (async () => {
      try {
        const users = await UsersService.getAllUsers();
        dispatch({
          type: "INIT",
          payload: { users, searchStr: searchString },
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [searchString]);

  return (
    <root.Provider
      value={{
        ...state,
        dispatch,
      }}>
      <rootDispatch.Provider value={dispatch}>{children}</rootDispatch.Provider>
    </root.Provider>
  );
};

export default RootProvider;
