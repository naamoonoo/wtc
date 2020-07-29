export class Diffing {
	static transformToArr(element: HTMLElement): HTMLElement[] {
		console.log("enrty is", element);
		let queue: HTMLElement[] = [element];
		const arr: HTMLElement[] = [];

		while (queue.length > 0) {
			const currentEle = queue.shift();
			if (element !== currentEle) {
				arr.push(currentEle);
			}
			const { children } = currentEle;
			if (!children) {
				continue;
			}
			const childElements = Array.from(children).map(
				(child) => child as HTMLElement
			);
			queue = [...queue, ...childElements];
		}

		return arr;
	}

	static isParentClassUpdated(
		originElement: HTMLElement,
		newElement: HTMLElement
	) {
		if (originElement.className !== newElement.className) {
			originElement.className = newElement.className;
			console.log("update only className");
			return true;
		}

		return false;
	}

	static isParentHasDiffTag(
		originElement: HTMLElement,
		newElement: HTMLElement
	) {
		return originElement.tagName !== newElement.tagName;
	}

	static getNewlyRendered(
		originElement: HTMLElement,
		newElement: HTMLElement
	): HTMLElement {
		if (this.isParentHasDiffTag(originElement, newElement)) {
			return newElement;
		}

		if (this.isParentClassUpdated(originElement, newElement)) {
			return originElement;
		}

		const originEleArr = this.transformToArr(originElement);
		const newEleArr = this.transformToArr(newElement);

		// only one tag case
		if (originEleArr.length === 0) {
			return newElement;
		}
		// has different length
		if (originEleArr.length !== newEleArr.length) {
			console.log("has diff length");
			return newElement;
		}

		const lengthOfElements = originEleArr.length;

		for (let i = 0; i < lengthOfElements; i++) {
			const originCurrentEle = originEleArr[i];
			const newCurrentEle = newEleArr[i];

			if (originCurrentEle.tagName !== newCurrentEle.tagName) {
				return newElement;
			}

			if (originCurrentEle.className !== newCurrentEle.className) {
				console.log("has diff on className");
				originCurrentEle.className = newCurrentEle.className;
				return originElement;
			}

			if (originCurrentEle.textContent !== newCurrentEle.textContent) {
				originCurrentEle.textContent = newCurrentEle.textContent;
				return originElement;
			}
		}

		console.log("it's new");
		return newElement;
	}
}
