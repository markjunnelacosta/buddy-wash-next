import React from "react";
import "./dashboard.css";


const Counter = (props) => {
  const formattedValue = props.currency ? `${props.currency} ${props.value}` : props.value;

  return (
    <div className="counter">
      <span className="counter-title">{props.title}</span>
      <hr />
      <span className="counter-value">{ formattedValue }</span>
    </div>
  );
};
export default Counter;