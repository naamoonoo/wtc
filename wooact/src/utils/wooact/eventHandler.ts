export class EventHandler {
	constructor(private eventSet: {}) {}

	storeEvent(
		eventName: string,
		targetClassName: string,
		eventHandler: (e: Event) => any
	) {
		if (!targetClassName) {
			console.error("cannot assign event without className");
			return;
		}

		window.addEventListener(eventName, (e: Event) => {
			const target = (e.target as HTMLElement).closest(
				".targetClassName"
			);
			if (!target) {
				return;
			}

			eventHandler(e);
		});
	}

	// assignEvent();
}
