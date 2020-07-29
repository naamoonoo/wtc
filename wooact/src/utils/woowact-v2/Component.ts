import { VirtualDom } from "./createElement";

export abstract class Component<P, S> {
	protected virtualDom: VirtualDom;

	constructor(public props?: P, private state?: S) {
		Object.setPrototypeOf(this, Component.prototype);
	}

	getVirtualDom(): VirtualDom {
		return this.virtualDom;
	}

	private reRender() {
		this.virtualDom = this.render();
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
		this.virtualDom = this.render();
		this.componentDidMount();
	}

	protected remove() {
		this.virtualDom = null;
		this.comopnentWillUnmount();
	}

	protected abstract render(): VirtualDom;
	protected componentDidMount() {}
	protected comopnentWillUnmount() {}
}
