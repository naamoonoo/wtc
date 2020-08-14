import React, { createContext, Dispatch, useReducer, useContext } from "react";

type Reducer<S, A> = (state: S, action: A) => S;

type ContextCollection<S, A> = {
	StateContext: React.Context<S | undefined>;
	DispatchContext: React.Context<React.Dispatch<A> | undefined>;
};

export const contextCreator = <S, A>(
	reducer: Reducer<S, A>,
	initialState: S
) => {
	const StateContext = createContext<S | undefined>(undefined);
	const DispatchContext = createContext<Dispatch<A> | undefined>(undefined);

	const ContextProvider: React.FC = ({ children }) => {
		const [todos, dispatch] = useReducer(reducer, initialState);

		return (
			<DispatchContext.Provider value={dispatch}>
				<StateContext.Provider value={todos}>
					{children}
				</StateContext.Provider>
			</DispatchContext.Provider>
		);
	};

	const Contexts: ContextCollection<S, A> = {
		StateContext,
		DispatchContext,
	};

	return { ContextProvider, Contexts };
};

export const useCreator = <S, A>(
	Context: ContextCollection<S, A>
): [S, Dispatch<A>] => {
	const state = useContext(Context.StateContext);
	if (state === undefined) {
		throw new Error("스테이트 컨텍스트가 존재하지 않습니다");
	}

	const dispatch = useContext(Context.DispatchContext);
	if (dispatch === undefined) {
		throw new Error("디스패치 컨텍스트가 존재하지 않습니다");
	}

	return [state, dispatch];
};

export const CombineProvider = (...Providers: React.FC[]) => (App: React.FC) =>
	Providers.reduce((acc, Provider) => <Provider>{acc}</Provider>, <App />);
