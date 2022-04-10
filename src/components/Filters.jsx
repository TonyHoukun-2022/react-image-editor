import React, { useState } from "react";
import Filter from "./Filter";
import { updateFilters } from "../store/imageSlice";
import { useDispatch } from "react-redux";
import filterOptions from "../data/filters.json";

const Filters = ({ context, image, canvas }) => {
  const [options, setOptions] = useState(filterOptions);
  const dispatch = useDispatch();

  const handleSliderChange = (target, id) => {
    setOptions((prevOptions) => {
      return prevOptions.map((option) => {
        if (option.id !== id) return option;
        return { ...option, value: target.value };
      });
    });
  };

  const filters = options.map((option) => {
    return `${option.name}(${option.value}${option.unit})`;
  });

  dispatch(updateFilters(filters));

  return (
    <ul className='col-md-4 ml-5'>
      {options.map((option) => (
        <Filter key={option.id} id={option.id} min={option.min} name={option.name} max={option.max} value={option.value} unit={option.unit} handleChange={handleSliderChange} />
      ))}
    </ul>
  );
};

export default Filters;
