import { Component } from "../../utils/wooact";
import { div, h1 } from "../../utils/wooact/defaultElements";
import Counter from "../Counter/Counter";

interface IProps {}
interface IState {}

class App extends Component<IProps, IState> {
	constructor(props: IProps, state: IState) {
		super(props, state);

		Object.setPrototypeOf(this, App.prototype);
		this.init();
	}

	render() {
		console.log("App rerendered");
		return div(
			{
				className: "container",
			},
			h1({ textContent: "우아한 뤼액트" }),
			new Counter()
		);
	}
}

export default App;
