import { Diffing } from "./Diffing";

abstract class Component<P, S> {
	protected element: HTMLElement;

	constructor(public props?: P, private state?: S) {
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
		const diffUpdatedElement = Diffing.getNewlyRendered(
			this.element,
			this.render()
		);

		if (this.element === diffUpdatedElement) {
			return;
		}
		const oldElement = this.element;
		this.element = diffUpdatedElement;
		oldElement.remove();
	}

	// need to update value's type

	protected setState(key: keyof S, value: S[keyof S]) {
		if (!this.state) {
			return;
		}

		// if (typeof this.state[key] !== typeof value){
		// 	console.error(`Cannot change the type of state's ${key}`)
		// 	return ;
		// }
		// // typeof array
		// // same length -> update
		// if (value instanceof Array && value.length !== this.state[key].length){

		// }

		// diff length -> just new render

		// element's contain old state -> update

		// element's attribute diff,

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
	// private replaceWithNewElement() {
	// 	const oldElement = this.element;
	// 	const newElement = this.render();
	// 	this.element = newElement;
	// 	oldElement.remove();
	// }

	// private updateTextValue() {}
}

export default Component;
