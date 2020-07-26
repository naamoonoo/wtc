import { Component } from "./";

const domRenderer = (element: Component<any, any>, container: HTMLElement) => {
	container.appendChild(element.getElement());
};

export default domRenderer;
