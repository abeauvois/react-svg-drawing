import React from "react"
// import { DragDropContext } from "react-dnd";
// import HTML5Backend from "react-dnd-html5-backend";

import Background from "./components/Background"
import Label from "./components/Label"
import Link from "./components/Link"
import { getMousePosition, subtractPoints } from "./helpers/geometry"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.patchSvgRef = null
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)

    this.state = {
      dragStartPosition: {},
      dragEndPosition: {},
      mousePosition: {},
      isDragging: false,
      links: [{ id: "1", from: { x: 10, y: 10 }, to: { x: 100, y: 100 } }]
    }
  }

  static defaultProps() {
    return { offset: { x: 0, y: 0 } }
  }

  onMouseDown(event) {
    const dragStartPosition = getMousePosition(
      this.patchSvgRef,
      this.props.offset,
      event
    )

    this.setState({ dragStartPosition, isDragging: true }, () =>
      console.log("start dragging at:", dragStartPosition.x)
    )
  }

  onMouseMove(event) {
    const mousePosition = getMousePosition(
      this.patchSvgRef,
      this.props.offset,
      event
    )
    this.setState({ mousePosition })
  }

  onMouseUp(event) {
    const dragEndPosition = getMousePosition(
      this.patchSvgRef,
      this.props.offset,
      event
    )
    this.setState({ dragEndPosition, isDragging: false }, () =>
      console.log("End dragging at:", dragEndPosition.x)
    )
  }

  render() {
    const {
      mousePosition,
      dragStartPosition,
      dragEndPosition,
      isDragging,
      links
    } = this.state

    const deltaPosition = isDragging
      ? subtractPoints(dragStartPosition, mousePosition)
      : { x: 0, y: 0 }
    const draggedEntitiesStyle = {
      transform: `translate(${deltaPosition.x}px, ${deltaPosition.y}px)`
    }

    return (
      <Background
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
        svgRef={svg => {
          this.patchSvgRef = svg
        }}
      >
        <Label
          label={`x${isDragging ? "*" : ""}: ${mousePosition.x}`}
          position={{ x: 100, y: 20 }}
        />
        <Label
          label={`Started at x: ${dragStartPosition.x}`}
          position={{ x: 100, y: 40 }}
        />
        <Label
          label={`Ended at x: ${dragEndPosition.x}`}
          position={{ x: 100, y: 60 }}
        />
        {links.map(({ id, from, to }) => (
          <Link
            key={`link_${id}_${from}_${to}`}
            style={draggedEntitiesStyle}
            from={from}
            to={to}
            onClick={(e, id) => console.log(id)}
          />
        ))}
      </Background>
    )
  }
}

export default App
