import { default as App } from "./App";
import { domRenderer } from "../../utils/wooact";
import { fireEvent } from "@testing-library/dom";

let appComponent: App;
let appElement: HTMLElement;
let app: HTMLElement = null;

beforeAll(() => {
	document.body.innerHTML = "<div id=Test>" + "</div>";
	app = document.querySelector("#Test");
});

beforeEach(() => {
	appComponent = new App({}, {});
	domRenderer(appComponent, app);
	appElement = appComponent.getElement();
});

afterEach(() => {
	appElement.remove();
});

afterAll(() => {
	app.remove();
});

describe("[App Component]", () => {
	test("App이 정상적으로 렌더된다.", () => {
		//given
		// rendered

		// when
		// rendered

		// then
		expect(app.hasChildNodes).toBeTruthy();
		expect(app.contains(appElement)).toBeTruthy();
	});
});
