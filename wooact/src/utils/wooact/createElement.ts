import { Component } from '.'
import { eventHandler } from './eventHandler'

declare global {
  interface HTMLElement {
    key?: string
  }
}

export type HTMLELementTagName = keyof Omit<
  HTMLElementTagNameMap,
  'var' | 'object'
>

type HTMLElementTagType = HTMLElementTagNameMap[HTMLELementTagName]

type CustomAttribute = {
  eventTarget: string
}
export type IAttribute = Partial<HTMLElementTagType & CustomAttribute>

export const createElement = (
  tagName: HTMLELementTagName,
  attributes: IAttribute,
  ...childNodes: (HTMLElement | Component<any, any> | null | SVGElement)[]
): HTMLElement => {
  const newElement = document.createElement(tagName)

  for (const [key, value] of Object.entries(attributes)) {
    if (key === 'className') {
      newElement.setAttribute('class', value)
      continue
    }

    // text
    if (key === 'textContent') {
      const textNode = document.createTextNode(value)
      newElement.appendChild(textNode)
      continue
    }

    // event
    if (typeof value === 'function') {
      const eventName = key.slice(2)
      if (!attributes.eventTarget) {
        newElement.addEventListener(eventName, value)
        continue
      }

      eventHandler.assignEventToWindow(eventName, attributes.eventTarget, value)
      continue
    }

    newElement.setAttribute(key, value)
  }

  // childNodes
  const fragment = document.createDocumentFragment()
  for (const node of childNodes) {
    if (node === null) {
      continue
    }
    // comopnent
    if (node instanceof Component) {
      fragment.appendChild(node.getElement())
      continue
    }

    fragment.appendChild(node)
  }
  newElement.appendChild(fragment)

  return newElement
}

// export const createSVGAElement = (tagName: SVGAElementTagName, attributes: {}): SVGElement => {
//   const newSVGElement = document.createElementNS('http://www.w3.org/2000/svg', tagName)

//   return newSVGElement
// }

// export type SVGAElementTagName =
//   | 'svg'
//   | 'line'
//   | 'text'
//   | 'g'
//   | 'polyline'
//   | 'circle'
