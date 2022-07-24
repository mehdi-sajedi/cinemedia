import React from 'react';
import styles from './CustomRange.module.scss';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
const Range = createSliderWithTooltip(Slider.Range);

const CustomRange = ({
  formData,
  setFormData,
  name,
  defaults,
  state,
  min,
  max,
  step,
  tipFormatter,
  marks,
  // icon,
}) => {
  let rangeStyles = {
    rail: {
      backgroundColor: '#e2e2e2',
      height: '50%',
    },

    track: [
      {
        height: '50%',
      },
    ],
    handle: [
      {
        position: 'absolute',
        height: '25px',
        width: '25px',
        top: '1px',
        border: '3px solid #79c4e2',
      },
    ],
    dot: {
      opacity: '0',
    },
  };

  const handleSliderChange = (v) => {
    setFormData({
      ...formData,
      [state]: v,
    });
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        {/* {icon} */}
        <h3>{name}</h3>
      </header>
      <Range
        className={styles.range}
        onChange={(v) => handleSliderChange(v)}
        defaultValue={defaults}
        value={formData[state]}
        min={min}
        max={max}
        railStyle={rangeStyles.rail}
        trackStyle={rangeStyles.track}
        handleStyle={rangeStyles.handle}
        dotStyle={rangeStyles.dot}
        step={step}
        tipProps={{
          placement: 'top',
          visible: true,
        }}
        tipFormatter={tipFormatter}
        marks={marks}
      />
    </div>
  );
};

export default React.memo(CustomRange);
