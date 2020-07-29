import { Component } from "./Component";

export type HTMLELementTagName = keyof Omit<
	HTMLElementTagNameMap,
	"var" | "object" | "acronym"
>;
type HTMLElementTagType = HTMLElementTagNameMap[HTMLELementTagName];
export type IAttribute = Partial<HTMLElementTagType>;

export interface VirtualDom {
	tagName: HTMLELementTagName;
	attributes: IAttribute;
	children: (VirtualDom | null)[];
}

export type CreateElement = (
	tagName: string,
	attributes: IAttribute,
	...childNodes: (VirtualDom | null)[]
) => VirtualDom;

export const createElement: CreateElement = (
	tagName: HTMLELementTagName,
	attributes: IAttribute,
	...children: (VirtualDom | null)[]
): VirtualDom => {
	return {
		tagName,
		attributes,
		children,
	};

	// for (const [key, value] of Object.entries(attributes)) {
	// 	if (key === "className") {
	// 		newElement.setAttribute("class", value);
	// 		continue;
	// 	}

	// 	// text
	// 	if (key === "textContent") {
	// 		const textNode = document.createTextNode(value);
	// 		newElement.appendChild(textNode);
	// 		continue;
	// 	}

	// 	// event
	// 	if (typeof value === "function") {
	// 		const eventName = key.slice(2);
	// 		newElement.addEventListener(eventName, value);
	// 		// window.addEventListener(eventName, value);
	// 		// eventHandlerAssigner(eventName, attributes.className, value);
	// 		continue;
	// 	}

	// 	newElement.setAttribute(key, value);
	// }

	// // childNodes
	// const fragment = document.createDocumentFragment();
	// for (const node of childNodes) {
	// 	if (node === null) {
	// 		continue;
	// 	}
	// 	// comopnent
	// 	if (node instanceof Component) {
	// 		fragment.appendChild(node.getElement());
	// 		continue;
	// 	}

	// 	fragment.appendChild(node);
	// }
	// newElement.appendChild(fragment);

	// return newElement;
};
