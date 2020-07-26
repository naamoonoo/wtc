abstract class Component<P, S> {
	protected element: HTMLElement;

	constructor(public props?: P, private state?: S) {
		Object.setPrototypeOf(this, Component.prototype);
	}

	getElement(): HTMLElement {
		return this.element;
	}

	private reRender() {
		const oldElement = this.element;
		const newElement = this.render();
		this.element.replaceWith(newElement);
		this.element = newElement;
		oldElement.remove();
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
