class EventHandler {
  private eventStore

  constructor() {
    this.eventStore = new Set()
  }

  assignEventToWindow(
    eventName: string,
    targetClassName: string,
    eventHandler: (e: Event) => any
  ) {
    const targetName = `.${targetClassName.split(' ').join('.')}`
    const eventAndTargetKey = targetName + eventName
    if (this.eventStore.has(eventAndTargetKey)) {
      return
    }
    this.eventStore.add(eventAndTargetKey)

    window.addEventListener(eventName, (e: Event) => {
      const target = (e.target as HTMLElement).closest(targetName)
      if (!target) {
        return
      }

      eventHandler(e)
    })
  }
}

export const eventHandler = new EventHandler()
