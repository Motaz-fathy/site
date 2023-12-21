
import React, { FC, useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
interface SliderFilterProps {
    minValue: number;
    maxValue: number;
    onRangeChange: (min: number, max: number) => void;
  }
  
  export  const SliderFilter2: FC<SliderFilterProps> = (props) => {
    const { minValue, maxValue, onRangeChange } = props;
    const [range, setRange] = useState<[number, number]>([minValue, maxValue]);
  
    useEffect(() => {
      onRangeChange(range[0], range[1]);
    }, [range, onRangeChange]);
  
    const handleSliderChange = (newRange: number | number[]) => {
      if (Array.isArray(newRange)) {
        setRange([newRange[0], newRange[1]]);
      }
    };
  
    return (
      <div>
        <Slider
          min={minValue}
          max={maxValue}
          range
          value={range}
          onChange={handleSliderChange}
        />
      </div>
    );
  };