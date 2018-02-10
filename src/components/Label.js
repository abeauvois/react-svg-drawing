import React from "react";

const Label = ({ keyName, label, position }) => {
  const textProps = {
    x: position.x,
    y: position.y,
    textAnchor: "middle"
  };

  return label ? (
    <g key={`label_${keyName}`}>
      <text {...textProps}>{label}</text>
    </g>
  ) : null;
};

export default Label;
