import { fireEvent } from "@testing-library/dom";
import { div, p } from "../defaultElements";
import { Component, domRenderer } from "../";

let testComponent;
let app: HTMLElement = null;

beforeAll(() => {
	document.body.innerHTML = '<div id="Test">' + "</div>";
	app = document.querySelector("#Test");
});

beforeEach(() => {});

afterEach(() => {
	testComponent.getElement().remove();
});

afterAll(() => {
	app.remove();
});

describe("[test component which extends Component]", () => {
	test("props만 가진 컴포넌트를 렌더했을 때, 정상적으로 등록된다", () => {
		//given
		const name = "andy";
		interface IProps {
			name: string;
		}
		class TestComponent extends Component<IProps, {}> {
			protected componentDidMount: undefined;

			constructor(props: IProps) {
				super(props);

				Object.setPrototypeOf(this, TestComponent.prototype);
				this.init();
			}

			render() {
				return div({ textContent: "andy" });
			}
		}

		// when
		testComponent = new TestComponent({ name });
		domRenderer(testComponent, app);

		// then
		expect(document.hasChildNodes).toBeTruthy();
		expect(document.contains(testComponent.getElement())).toBeTruthy();
		const child = app.querySelector("div");
		expect(child.textContent).toBe(name);
	});

	test("state를 가진 컴포넌트를 생성했을 때, 스테이트가 변경되면 변경된 값을 기반으로 다시 렌더된다", () => {
		//given
		const counter = 0;

		interface IState {
			counter: number;
		}
		class TestComponent extends Component<any, IState> {
			// protected componentDidMount: undefined

			constructor({}, state: IState) {
				super({}, state);

				Object.setPrototypeOf(this, TestComponent.prototype);
				this.init();
			}

			onClickHandler(e: Event) {
				this.setState("counter", this.getState("counter") + 1);
			}

			render() {
				return div(
					{},
					div({
						className: "add-btn",
						textContent: "add",
						onclick: (e: Event) => this.onClickHandler(e),
					}),
					p({ textContent: this.getState("counter").toString() })
				);
			}
		}

		// when
		testComponent = new TestComponent({}, { counter });
		domRenderer(testComponent, app);

		// then
		const counterElement = testComponent
			.getElement()
			.querySelector("p") as HTMLElement;
		console.log(app.querySelector("p"));
		expect(counterElement.textContent).toBe(counter.toString());
		const addButton = app.querySelector(".add-btn");
		fireEvent.click(addButton);
		const updatedCounterElement = app.querySelector("p") as HTMLElement;

		expect(updatedCounterElement.textContent).toBe(
			(counter + 1).toString()
		);
	});
});
