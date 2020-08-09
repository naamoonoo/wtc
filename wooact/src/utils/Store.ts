import { Component } from './wooact'
import { Routing } from './Routing'

interface IActions {
  [actionName: string]: (args: any) => Promise<any> | any
}

export abstract class Store<T> {
  private subscribedComponent: Component<any, any>[] = []
  protected abstract actions: IActions
  protected abstract updateStore(action: string, args?: any)

  constructor(protected _data: T) {}

  async dispatch(action: string, args?: any) {
    const selectedAction = this.actions[action]

    if (!selectedAction) {
      console.error('None existed actions')
      return
    }

    const result = selectedAction(args)

    if (result instanceof Promise) {
      this.updateStore(action, await result)
    } else {
      this.updateStore(action, result)
    }

    this.rerender()
  }

  subscribe(component?: Component<any, any>): Store<T> {
    if (!component) {
      return this
    }

    this.subscribedComponent = this.subscribedComponent.filter(
      (c) => c.constructor !== component.constructor
    )

    this.subscribedComponent.push(component)
    return this
  }

  injectData(caller: Routing, data: T) {
    this._data = data
    this.rerender()
  }

  get data(): T {
    return this._data
  }

  private rerender() {
    this.subscribedComponent.forEach((component) => component.reRenderBy(this))
  }
}
