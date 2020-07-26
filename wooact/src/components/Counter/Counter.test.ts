import { default as Counter } from "./Counter";
import { domRenderer } from "../../utils/wooact";
import { button } from "../../utils/wooact/defaultElements";
import { fireEvent } from "@testing-library/dom";

let counterComponent: Counter;
let counterElement: HTMLElement;
let app: HTMLElement = null;

beforeAll(() => {
	document.body.innerHTML = "<div id=Test>" + "</div>";
	app = document.querySelector("#Test");
});

beforeEach(() => {
	counterComponent = new Counter();
	domRenderer(counterComponent, app);
	counterElement = counterComponent.getElement();
});

afterEach(() => {
	counterElement.remove();
});

afterAll(() => {
	app.remove();
});

describe("[Counter]", () => {
	test("component properly rendered", () => {
		// app has only one child, counter
		expect(app.childElementCount).toBe(1);
		expect(app.contains(counterElement)).toBeTruthy();
		// check if counter is instance of element
		expect(counterElement).toBeInstanceOf(window.Element);
	});

	test("has three child", () => {
		expect(counterElement.hasChildNodes()).toBeTruthy();
		expect(counterElement.childElementCount).toBe(3);
	});

	test("has button element, with class btn", () => {
		const buttons = Array.from(counterElement.querySelectorAll("button"));
		// console.log(Array.from(counterElement.querySelectorAll("button"))
		// expect(button.length).toBe(2);

		// expect(button[0].parentNode === counterElement).toBeTruthy();
		// expect(button[0].textContent).toMatch("+");
		// expect(button[0].textContent).toMatch("-");
	});

	test("[onclick] event handler", () => {
		const minusButton = document.querySelector(".btn.minus");
		const plusButton = document.querySelector(".btn.add");
		fireEvent.click(minusButton);
		expect(counterComponent.getState("counter")).toBe(-1);
		fireEvent.click(plusButton);
		expect(counterComponent.getState("counter")).toBe(0);
		const counterText = document.querySelector("#counter-text");
		expect(counterText.textContent).toBe("0");
	});
});
