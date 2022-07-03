import { createContext, useReducer } from "react";
import { reducer, initialState } from "../reducers/reducer";
export const store = createContext();

export default function StoreProvider(props) {
	const [state, dispatch] = useReducer(reducer, initialState);
	return <store.Provider value={{ state, dispatch }}>{props.children}</store.Provider>;
}
