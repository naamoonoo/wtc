import { Component } from "../../utils/wooact";
import { div, p, button } from "../../utils/wooact/defaultElements";

interface IProps {}
interface IState {
	counter: number;
}

class Counter extends Component<IProps, IState> {
	constructor() {
		const initialState: IState = {
			counter: 0,
		};
		super(null, initialState);

		Object.setPrototypeOf(this, Counter.prototype);
		this.init();
	}

	onClickHandler(numsToChange: number) {
		this.setState("counter", this.getState("counter") + numsToChange);
	}

	render() {
		const currentCounter = this.getState("counter");

		return div(
			{ className: "counter-container" },
			button({
				className: "btn",
				textContent: "+",
				onclick: () => this.onClickHandler(1),
			}),
			div({ textContent: currentCounter.toString() }),
			button({
				className: "btn",
				textContent: "-",
				onclick: () => this.onClickHandler(-1),
			})
		);
	}
}

export default Counter;
