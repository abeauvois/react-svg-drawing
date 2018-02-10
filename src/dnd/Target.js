import React, { Fragment } from 'react'
import update from 'react/lib/update'
import Source from './Source'
import { DropTarget } from 'react-dnd'

const styles = {
  width: 300,
  height: 300,
  border: '1px solid black',
  position: 'relative'
}

const boxTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem()
    const delta = monitor.getDifferenceFromInitialOffset()
    const left = Math.round(item.left + delta.x)
    const top = Math.round(item.top + delta.y)

    component.moveBox(item.id, left, top)
  }
}

// const Line = (a,b) => 


class Target extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      circles: [
        { top: 20, left: 80 },
        { top: 180, left: 20 },
        { top: 130, left: 250 }
      ]
    }
  }

  moveBox (id, left, top) {
    const state = this.state.circles.concat()
    state[id] = {left, top}
    this.setState({circles: state})
  }

  render() {
    const { hideSourceOnDrag, connectDropTarget } = this.props
    const { circles } = this.state
    console.log('test')
    return connectDropTarget(
      <div style={styles}>
        <svg style={{width:'100%', height:'100%'}}>
        {circles.map((circle, index) => {
          const prev = index-1 >=0 ? circles[index -1] : null
          const { left, top } = circle
          return (
            <g key={index}>
            {prev && 
                <line  x1={prev.left} y1={prev.top} x2={left} y2={top} strokeWidth="2" stroke="black"/>
              }
            <Source key={index}
                 id={index}
                 left={left}
                 top={top}
                 hideSourceOnDrag={hideSourceOnDrag} />
                 </g>
          )
        })}

        </svg>
      </div>
    )
  }
}

export default DropTarget('csv', boxTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(Target)
