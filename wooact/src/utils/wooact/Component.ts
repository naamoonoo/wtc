import { Diffing } from "./Diffing";

abstract class Component<P, S, X> {
	protected element: HTMLElement;
	public props: P;
	private state: S;
	private store: X;

	constructor(args?: { props?: P; state?: S; store?: X }) {
		for (const key in args) {
			this[key] = args[key];
		}
		Object.setPrototypeOf(this, Component.prototype);
	}

	getElement(): HTMLElement {
		return this.element;
	}

	unmount() {
		this.comopnentWillUnmount();
		this.element.remove();
	}

	private reRender() {
		this.element = Diffing.reconciliation(this.element, this.render());
	}

	protected setState(key: keyof S, value: S[keyof S]) {
		if (!this.state) {
			return;
		}

		this.state[key] = value;
		this.reRender();
	}

	public getState(key: keyof S) {
		if (!this.state) {
			return;
		}

		return this.state[key];
	}

	protected init() {
		this.element = this.render();

		this.componentDidMount();
	}

	protected abstract render?();
	protected componentDidMount() {}
	protected comopnentWillUnmount() {}
}

export default Component;
