import React from "react";

const Filter = ({ id, min, max, handleChange, name, value, unit }) => {
  return (
    <div className='filter d-flex align-items-center mb-3 justify-content-center'>
      <div className='filter__name mr-2'>{name}</div>
      <div className='filter__setting align-self-stretch d-flex align-items-center '>
        <span id='opacitySpan' className='filter__setting__value d-block mr-1 form-label'>
          {value}
          {unit}
        </span>
        <input className='d-block slider form-range' id={id} name={name} type='range' min={min} max={max} value={value} onChange={(e) => handleChange(e.target, id)} />
      </div>
    </div>
  );
};

export default Filter;
