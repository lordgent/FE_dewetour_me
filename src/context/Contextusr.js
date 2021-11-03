import { createContext, useReducer } from "react";
export const UserContext = createContext();

const initialState = {
  stsLogin: false,
  user: {},
  order: {},
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_TRIP":
      localStorage.setItem("ordertrip", JSON.stringify(payload));
      return {
        ...state,
        order: payload,
      };
    case "LOGIN_SUCCESS":
      localStorage.setItem("tokenkey", payload.token);
      return {
        ...state,
        stsLogin: true,
        user: payload,
      };
    case "LOGOUT":
      localStorage.removeItem("tokenkey");

      return {
        ...state,
        stsLogin: false,
        user: {},
      };

    default:
      throw new Error();
  }
};

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
