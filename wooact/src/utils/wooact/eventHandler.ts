class EventHandler {
  private eventStore

  constructor() {
    this.eventStore = new Set()
  }

  assignEventToWindow(
    eventName: string,
    eventTarget: string,
    eventHandler: (e: Event) => any
  ) {
    // const targetName = `.${targetClassName.split(' ').join('.')}`
    const eventAndTargetKey = eventTarget + eventName
    if (this.eventStore.has(eventAndTargetKey)) {
      return
    }
    this.eventStore.add(eventAndTargetKey)

    window.addEventListener(eventName, (e: Event) => {
      const target = (e.target as HTMLElement).closest(eventTarget)
      if (!target) {
        return
      }

      eventHandler(e)
    })
  }
}

export const eventHandler = new EventHandler()
