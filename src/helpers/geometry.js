const subtractPoints = (a, b) => ({
  x: b.x - a.x,
  y: b.y - a.y
})

const getBoundingClientRect = el => {
  const {
    bottom,
    height,
    left,
    right,
    top,
    width,
    x,
    y
  } = el.getBoundingClientRect()
  return { bottom, height, left, right, top, width, x, y }
}

const getMousePosition = (rootRef, offset, event) => {
  // if (!rootRef) return { x: 0, y: 0 }

  // const bbox = rootRef.getBoundingClientRect()

  return {
    x: event.clientX, // - bbox.left - offset.x,
    y: event.clientY // - bbox.top - offset.y,
  }
}

export { subtractPoints, getBoundingClientRect, getMousePosition }
