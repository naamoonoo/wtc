import { Component } from "./Component";
import { VirtualDom } from "./createElement";

export class WooactDom {
	private currentDomQueue = [];
	private currentDom = null;
	private newDomQueue = [];
	private newDom = null;

	constructor() {}

	private renderTo(tragetElement: HTMLElement) {
		tragetElement.appendChild(this.currentDom);
	}

	render(component: Component<any, any>, tragetElement: HTMLElement) {
		if (!this.newDom) {
			this.initializeDom(component);
			this.renderTo(tragetElement);
			return;
		}
	}

	private transformToQueue() {
		const dequeue: VirtualDom[] = [this.newDom];
		this.newDomQueue = [this.newDom];

		while (dequeue) {
			const currentDom = dequeue.shift();
			this.newDomQueue.push(currentDom);

			currentDom.children.forEach((childDom) => dequeue.push(childDom));
		}
	}

	private initializeDom(component: Component<any, any>) {
		this.newDom = component.getVirtualDom();
		this.transformToQueue();
	}
}
