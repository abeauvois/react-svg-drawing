import React from "react"

class Link extends React.Component {
  constructor(props) {
    super(props)
    this.elementId = `link_1`
    this.onClick = this.onClick.bind(this)
  }

  onClick(event) {
    this.props.onClick(event, this.elementId)
  }

  getPosition() {
    return {
      from: this.props.from,
      to: this.props.to
    }
  }

  getCoords() {
    const pos = this.getPosition()

    return {
      x1: pos.from.x,
      y1: pos.from.y,
      x2: pos.to.x,
      y2: pos.to.y
    }
  }

  render() {
    const { style } = this.props
    const coords = this.getCoords()

    const linkEndRadius = 3

    return (
      <g style={style} id={this.elementId} onClick={this.onClick}>
        <line stroke="red" strokeWidth={2} {...coords} />

        <circle
          className="end"
          cx={coords.x1}
          cy={coords.y1}
          r={linkEndRadius}
          fill="black"
        />
        <circle
          className="end"
          cx={coords.x2}
          cy={coords.y2}
          r={linkEndRadius}
          fill="black"
        />
      </g>
    )
  }
}

export default Link
