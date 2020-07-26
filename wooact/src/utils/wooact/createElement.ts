import { Component } from ".";
import { eventHandler } from "./eventHandler";

export type CreateElement = <T>(
	tagName: string,
	attributes: IAttribute,
	...childNodes: (HTMLElement | Component<any, any> | null)[]
) => HTMLElement;

export type HTMLELementTagName = keyof Omit<
	HTMLElementTagNameMap,
	"var" | "object"
>;
type HTMLElementTagType = HTMLElementTagNameMap[HTMLELementTagName];
export type IAttribute = Partial<HTMLElementTagType>;

export const createElement: CreateElement = (
	tagName: HTMLELementTagName,
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
			eventHandler.assignEventToWindow(
				eventName,
				attributes.className,
				value
			);
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
