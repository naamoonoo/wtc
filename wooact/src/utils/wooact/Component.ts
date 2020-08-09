import { Diffing } from './Diffing'
import { Store } from '../Store'
import { Routing } from '../../utils/Routing'
import { ICombinedStore, combinedStore } from '../../stores'

abstract class Component<P, S> {
  public element: HTMLElement
  protected store: Partial<ICombinedStore> = {}

  constructor(public props?: P, private state?: S) {
    Object.setPrototypeOf(this, Component.prototype)
  }

  getElement(): HTMLElement {
    return this.element
  }

  unmount() {
    this.comopnentWillUnmount()
    this.element.remove()
  }

  private reRender() {
    this.element = Diffing.reconciliation(this.element, this.render())
  }

  protected setState(key: keyof S, value: S[keyof S]) {
    if (!this.state) {
      return
    }

    this.state[key] = value
    this.reRender()
  }

  public getState(key: keyof S) {
    if (!this.state) {
      return
    }

    return this.state[key]
  }

  protected init() {
    this.element = this.render()

    this.componentDidMount()
  }

  private injectState(partialState: Partial<S>) {
    this.state = { ...this.state, ...partialState }
  }

  public extractState(): S {
    return this.state
  }

  abstract render?()
  protected componentDidMount() {}
  protected comopnentWillUnmount() {}

  // co-working with store, need to call for using store's data or actions
  protected connectStore(...storeNames: (keyof ICombinedStore)[]) {
    storeNames.forEach((storeName) => {
      // TODO need to fix!
      this.store[storeName] = combinedStore[storeName].subscribe(this) as any
    })
  }

  protected connectAction(...storeNames: (keyof ICombinedStore)[]) {
    storeNames.forEach((storeName) => {
      // TODO need to fix!
      this.store[storeName] = combinedStore[storeName].subscribe() as any
    })
  }

  // callable by outside of component, but only restricted to Store or Routing
  // and if it has a
  public reRenderBy(caller: Store<any> | Routing, partialState?: Partial<S>) {
    if (partialState) {
      this.injectState(partialState)
    }

    this.reRender()
  }
}

export default Component
