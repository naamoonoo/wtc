// import { promiseHandler } from "./promiseHandler";
import { Dispatch } from "react";

type Method = "GET" | "UPDATE" | "DELETE" | "CREATE";

type Action = {
	type: string;
};

export type Payload<T> = {
	data: T | null;
	error: string | null;
	loading: boolean;
};

type ActionMap<P> = Action & Partial<Payload<P>>;

// export const getState = <P>(actions: ActionMap<P>) => {
// 	switch (actions.type) {
// 	}
// };

// export const initialAsyncState: Payload<any> = {
// 	loading: false,
// 	data: null,
// 	error: null,
// };

// const loadingState: Payload<any> = {
// 	loading: true,
// 	data: null,
// 	error: null,
// };

// const success = <T>(data: T): Payload<T> => ({
// 	loading: false,
// 	error: null,
// 	data,
// });

// const error = (error: string): Payload<any> => ({
// 	loading: false,
// 	data: null,
// 	error: error,
// });

// const getUpdatedState = (state: Payload<T>, action: ActionMap<T>) => {
// 	switch (action.type) {
// 		case DISPATCH:
// 			return {
// 				...state,
// 				loading: true,
// 				data: null,
// 				error: null,
// 			};
// 		case SUCCESS:
// 			return {
// 				...state,
// 				loading: false,
// 				error: null,
// 				data: action.data,
// 			};
// 		case ERROR:
// 			return {
// 				loading: false,
// 				data: null,
// 				error: action.error,
// 			};
// 		default:
// 			return state;
// 	}
// };

export const createAsyncHandler = <T>(
	type: string,
	method: Method,
	promiseFunction: Promise<T>
): [
	<T>(dispatch: Dispatch<ActionMap<T>>) => Promise<void>,
	(state: Payload<T> | undefined, action: ActionMap<T>) => Payload<T>,
	{ DISPATCH: string; SUCCESS: string; ERROR: string }
] => {
	const DISPATCH = `${type}/${method}`;
	const SUCCESS = `${type}/${method}_SUCCESS`;
	const ERROR = `${type}/${method}_ERROR`;

	const iniitialAsyncState: Payload<T> = {
		loading: false,
		data: null,
		error: null,
	};

	const actionHandler = async <T>(dispatch: Dispatch<ActionMap<T>>) => {
		dispatch({ type: DISPATCH });

		// const [data, error] = await promiseHandler(promiseFunction);

		// if (error) {
		// 	return dispatch({ type: ERROR, error });
		// }

		// dispatch({
		// 	type: SUCCESS,
		// 	data,
		// });
	};

	const reducerHander = (
		state: Payload<T> = iniitialAsyncState,
		action: ActionMap<T>
	): Payload<T> => {
		switch (action.type) {
			case DISPATCH:
				return {
					...state,
					loading: true,
					data: null,
					error: null,
				};
			case SUCCESS:
				return {
					...state,
					loading: false,
					error: null,
					data: action.data as T,
				};
			case ERROR:
				return {
					loading: false,
					data: null,
					error: action.error as string,
				};
			default:
				return state;
		}
	};
	return [actionHandler, reducerHander, { DISPATCH, SUCCESS, ERROR }];
};
