import React from "react"

const Background = ({
  children,
  isInPanningMode,
  isInResizingMode,
  isPanning,
  svgRef,
  ...restProps
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    ref={svgRef}
    {...restProps}
  >
    {children}
  </svg>
)

export default Background
