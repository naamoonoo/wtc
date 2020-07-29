import { fireEvent } from "@testing-library/dom";
import { Component } from "../";
import { createElement } from "../createElement";
import { div } from "../defaultElements";

describe("[createElement]", () => {
	test("div 태그를 넣고 생성하면, div엘리먼트를 제대로 생성해야한다", () => {
		const tagName = "div";
		const $newElement = createElement(tagName, { className: "" });

		expect($newElement instanceof HTMLDivElement).toBeTruthy();
		expect($newElement.tagName).toEqual(tagName.toUpperCase());
	});

	test("두번째 인자로 받는 attribute 중에, className는 항상 존재해야 한다", () => {
		//given
		const tagName = "div";
		const className = "block";

		// when
		const $newElement = createElement(tagName, { className });

		// then
		expect($newElement.className).not.toBe("");
		expect($newElement.className).toBe(className);
	});

	test("두번째 인자 attribute에 text값을 받으면 text노드를 렌더링한다.", () => {
		// given
		const text = "test";

		// when
		const $newElement = createElement("div", {
			className: "",
			textContent: text,
		});

		// then
		expect($newElement.textContent).toBe(text);
		// 더 고민해보기
	});

	test("attribute로 이벤트와 이벤트 리스너를 받으면 element에 해당 이벤트를 바인딩한다.", () => {
		const eventName = "onclick" as const;
		const eventHandler = (e) => (e.currentTarget.dataset.isClicked = true);

		const $newElement = createElement("div", {
			className: "",
			[eventName]: eventHandler,
		});

		expect($newElement.dataset.isClicked).toBeFalsy(); // false인지 체크한다.
		fireEvent($newElement, new MouseEvent("click"));
		expect($newElement.dataset.isClicked).toBeTruthy();
	});

	test("세번째 인자로 받는 child는, 해당 엘리먼트의 자식 노드로 존재해야 한다", () => {
		//given
		const $childElement = createElement("p", {});

		// when
		const $parentElement = div({}, $childElement);

		// then
		expect($parentElement.hasChildNodes()).toBe(true);
		const childNodes = Array.from($parentElement.childNodes);
		expect(childNodes.length).toBe(1);

		const childNode = $parentElement.childNodes[0] as HTMLElement;
		expect(childNode.tagName).toBe("P");
	});

	test("세번째 인자로 받은 child가 createElement function이면 함수를 실행하여 자식으로 append한다.", () => {
		const CURRENT_CLASS_NAME = "parent";
		const CHILD_CLASS_NAME = "child";

		const $newElement = div(
			{ className: CURRENT_CLASS_NAME },
			div({ className: CHILD_CLASS_NAME })
		);

		expect($newElement.hasChildNodes()).toBeTruthy();
		expect($newElement.className).toBe(CURRENT_CLASS_NAME);

		const childNode = $newElement.childNodes[0] as HTMLElement; // 타입을 HTMLElement로 선언
		expect(childNode.className).toBe(CHILD_CLASS_NAME);
	});

	test("세번째 인자로 받은 child가 Component이면 DOM 요소를 가져와서 현재요소에 append 해준다.", () => {
		// given
		const PARENT_CLASS_NAME = "parent";
		const CHILD_CLASS_NAME = "child";
		const TEXT_CONTENT = "childText";

		interface IProps {}
		class TestComponent extends Component<any, any> {
			protected componentDidMount: undefined;

			constructor() {
				super();

				Object.setPrototypeOf(this, TestComponent.prototype);
				this.init();
			}

			render() {
				return div({
					className: CHILD_CLASS_NAME,
					textContent: TEXT_CONTENT,
				});
			}
		}

		// when
		const $newElement = div(
			{ className: PARENT_CLASS_NAME },
			new TestComponent()
		);

		// then
		expect($newElement.hasChildNodes()).toBeTruthy();
		const $childElement = Array.from(
			$newElement.childNodes
		)[0] as HTMLElement;
		expect($childElement.className).toBe(CHILD_CLASS_NAME);
		expect($childElement.textContent).toBe(TEXT_CONTENT);
	});
});
