import React, { PropTypes } from 'react'
import { DragSource } from 'react-dnd'

const rand0To255 = () => Math.floor(Math.random() * 256)
const randomColor = () =>
  `rgb(${rand0To255()}, ${rand0To255()}, ${rand0To255()})`

const boxSource = {
  beginDrag(props) {
    const { id, left, top } = props
    return { id, left, top }
  }
}

class Source extends React.Component{
  render() {
    const {
      hideSourceOnDrag, left, top, connectDragSource, isDragging
    } = this.props
    console.log('boxTarget')
    if (isDragging && hideSourceOnDrag) {
      return null
    }
    // This the Source Element initial position/state after started Draging
    return connectDragSource(
        <circle cx={left} cy={top} r={12} fill={randomColor()} stroke="grey"
          strokeWidth={2}/>
    )
  }
}

const connect = (connect, monitor) => (
  {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
)

export default DragSource('csv', boxSource, connect)(Source)
