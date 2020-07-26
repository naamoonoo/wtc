import { Component, domRenderer } from '../'
import { div } from '../defaultElements'

let testComponent
let app: HTMLElement = null

beforeAll(() => {
  document.body.innerHTML = '<div id="Test">' + '</div>'
  app = document.querySelector('#Test')
})

afterAll(() => {
  app.remove()
})

describe('[NeactDom]', () => {
  test('render static 메소드는 component를 해당 container에 제대로 추가한다', () => {
    //given
    const name = 'andy'
    interface IProps {
      name: string
    }
    class TestComponent extends Component<IProps, {}> {
      protected componentDidMount: undefined

      constructor(props: IProps) {
        super(props)

        Object.setPrototypeOf(this, TestComponent.prototype)
        this.init()
      }

      render() {
        return div({ textContent: 'andy' })
      }
    }

    // when
    testComponent = new TestComponent({ name })
    domRenderer(testComponent, app)

    // then
    expect(document.hasChildNodes).toBeTruthy()
    expect(document.contains(testComponent.getElement())).toBeTruthy()
    const child = app.querySelector('div')
    expect(child.textContent).toBe(name)
  })
})
