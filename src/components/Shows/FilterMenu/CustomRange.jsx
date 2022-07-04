import React, { useContext } from 'react';
import { AppContext } from '../../../context/app-context';
import styles from './CustomRange.module.scss';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
const Range = createSliderWithTooltip(Slider.Range);

const CustomRange = ({
  name,
  defaults,
  state,
  action,
  min,
  max,
  step,
  tipFormatter,
  marks,
  route,
  icon,
}) => {
  const { dispatchFilter } = useContext(AppContext);

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
    dispatchFilter({ type: action, payload: { value: v, route: route } });
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        {icon}
        <h3>{name}</h3>
      </header>
      <Range
        className={styles.range}
        onChange={(v) => handleSliderChange(v)}
        defaultValue={defaults}
        value={state}
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
