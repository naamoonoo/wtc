import { Component } from "./";

export type CreateElement = <T>(
	tagName: string,
	attributes: IAttribute,
	...childNodes: (HTMLElement | Component<any, any> | null)[]
) => HTMLElement;

export interface IAttribute
	extends Partial<
		HTMLElement &
			Element &
			HTMLDivElement &
			HTMLAnchorElement &
			HTMLParagraphElement &
			HTMLSpanElement &
			HTMLButtonElement &
			HTMLInputElement &
			HTMLFormElement &
			HTMLLabelElement &
			HTMLQuoteElement
	> {
	// className: string;
}

export const generateElement: CreateElement = (
	tagName: string,
	attributes: IAttribute,
	...childNodes: (HTMLElement | Component<any, any> | null)[]
): HTMLElement => {
	const newElement = document.createElement(tagName);

	for (const [key, value] of Object.entries(attributes)) {
		if (key === "className") {
			newElement.setAttribute("class", value);
			continue;
		}

		// text
		if (key === "textContent") {
			const textNode = document.createTextNode(value);
			newElement.appendChild(textNode);
			continue;
		}

		// event
		if (typeof value === "function") {
			const eventName = key.slice(2);
			newElement.addEventListener(eventName, value);
			// window.addEventListener(eventName, value);
			// eventHandlerAssigner(eventName, attributes.className, value);
			continue;
		}

		newElement.setAttribute(key, value);
	}

	// childNodes
	const fragment = document.createDocumentFragment();
	for (const node of childNodes) {
		if (node === null) {
			continue;
		}
		// comopnent
		if (node instanceof Component) {
			fragment.appendChild(node.getElement());
			continue;
		}

		fragment.appendChild(node);
	}
	newElement.appendChild(fragment);

	return newElement;
};
