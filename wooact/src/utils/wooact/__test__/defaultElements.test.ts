import { div } from '../defaultElements'

describe('[default elements]', () => {
  test('div default element는 div엘리먼트를 제대로 생성해야한다', () => {
    const divElement = div({ className: 'test' })

    expect(divElement instanceof HTMLDivElement).toBeTruthy()
    expect(divElement.tagName).toEqual('DIV')
  })
})
