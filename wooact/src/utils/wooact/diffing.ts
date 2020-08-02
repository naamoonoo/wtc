export class Diffing {
	static lengthDiff;
	// replace original element to new element
	static replaceElement(originElement: HTMLElement, newElement: HTMLElement) {
		const origin = originElement;
		origin.replaceWith(newElement);
		origin.remove();
	}

	// return type of children is a array-like
	// so need to convert it for easy-use
	static getChildArr(element: HTMLElement): HTMLElement[] {
		const { children } = element;
		if (!children) {
			return [];
		}

		const childElements = Array.from(children).map(
			(child) => child as HTMLElement
		);
		return childElements;
	}

	// flatten dom tree to HTMLElement[]
	static transformToArr(element: HTMLElement): HTMLElement[] {
		let queue: HTMLElement[] = [element];
		const arr: HTMLElement[] = [];

		while (queue.length > 0) {
			const currentEle = queue.shift();
			arr.push(currentEle);
			const childElements = this.getChildArr(currentEle);
			queue = [...queue, ...childElements];
		}

		return arr;
	}

	// update className attribute
	static injectNewClassOrNot(
		originElement: HTMLElement,
		newElement: HTMLElement
	) {
		if (originElement.className !== newElement.className) {
			originElement.className = newElement.className;
		}
	}

	// update textcontent
	static updateTextOrNot(
		originElement: HTMLElement,
		newElement: HTMLElement
	) {
		if (originElement.textContent === newElement.textContent) {
			return;
		}
		if (
			newElement instanceof HTMLInputElement ||
			newElement instanceof HTMLTextAreaElement
		) {
			return;
		}
		const newText = newElement.textContent;
		if (this.getChildArr(originElement).length > 0) {
			return;
		}

		if (newText.includes("\n")) {
			return;
		}

		originElement.textContent = newText;
	}

	// update parent, when child is added or remove,
	// update child's attribute is not handled in here
	static hasDiffChildThenReplace(
		originElement: HTMLElement,
		newElement: HTMLElement
	) {
		const originChilds = this.getChildArr(originElement);
		const newChilds = this.getChildArr(newElement);

		if (originChilds.length === newChilds.length) {
			return false;
		}

		this.replaceElement(originElement, newElement);
		return true;
	}

	// when tag/component has been changed then
	static hasDiffTagThenReplace(
		originElement: HTMLElement,
		newElement: HTMLElement
	) {
		if (originElement.tagName !== newElement.tagName) {
			this.replaceElement(originElement, newElement);
			return true;
		}
		return false;
	}

	static reconciliation(
		originElement: HTMLElement,
		newElement: HTMLElement
	): HTMLElement {
		// enrty point has been changed
		if (this.hasDiffTagThenReplace(originElement, newElement)) {
			return newElement;
		}
		// flatten to arr
		const originEleArr = this.transformToArr(originElement);
		const newEleArr = this.transformToArr(newElement);

		// [bad algorithm] need to fix
		// when has more than one child diff just rerender
		if (Math.abs(originEleArr.length - newEleArr.length) > 1) {
			this.replaceElement(originElement, newElement);
			return newElement;
		}

		const lengthOfElements = originEleArr.length;

		for (let i = 0; i < lengthOfElements; i++) {
			const originCurrentEle = originEleArr[i];
			const newCurrentEle = newEleArr[i];

			if (
				!originElement.contains(originCurrentEle) &&
				originElement.contains(newCurrentEle)
			) {
				// when parent replaced,
				// then old child is not gonna be used anymore
				continue;
			}

			if (this.hasDiffTagThenReplace(originCurrentEle, newCurrentEle)) {
				if (newCurrentEle.id === "item-83") {
				}
				// when it has diff tag, then just replace to new one
				continue;
			}

			// when children has been added or removed replace parent to new one
			if (this.hasDiffChildThenReplace(originCurrentEle, newCurrentEle)) {
				continue;
			}

			// update attribute, at this time only text and class
			this.injectNewClassOrNot(originCurrentEle, newCurrentEle);
			this.updateTextOrNot(originCurrentEle, newCurrentEle);
		}

		return originElement;
	}
}
