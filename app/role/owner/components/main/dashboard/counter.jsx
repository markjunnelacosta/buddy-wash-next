import React from "react";


const Counter = (props) => {
  return (
    <div className="counter">
      <span>{props.title}</span>
      <hr />
      <span className="counter-value">{props.value}</span>
    </div>
  );
};
export default Counter;