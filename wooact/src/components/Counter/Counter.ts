import { Component } from "../../utils/wooact";
import { div, p, button } from "../../utils/wooact/defaultElements";

interface IProps {}
interface IState {
	counter: number;
	isVisible: boolean;
}

class Counter extends Component<IProps, IState> {
	constructor() {
		const initialState: IState = {
			counter: 0,
			isVisible: false,
		};
		super(null, initialState);

		Object.setPrototypeOf(this, Counter.prototype);
		this.init();
	}

	toggleVisibility() {
		this.setState("isVisible", !this.getState("isVisible"));
	}

	onClickHandler(numsToChange: number) {
		const currentValue = this.getState("counter") as number;
		this.setState("counter", currentValue + numsToChange);
	}

	render() {
		const currentCounter = this.getState("counter");
		const isVisible = this.getState("isVisible");
		return div(
			{ className: `counter-container ${isVisible ? "visible" : ""}` },
			button({
				className: "btn plus",
				textContent: "+",
				onclick: () => this.onClickHandler(1),
			}),
			div({ textContent: currentCounter.toString() }),
			button({
				className: "btn minus",
				textContent: "-",
				onclick: () => this.onClickHandler(-1),
			}),
			button({
				className: "visibiliy",
				textContent: "good",
				onclick: () => this.toggleVisibility(),
			})
		);
	}
}

export default Counter;
