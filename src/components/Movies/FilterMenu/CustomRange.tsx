import styles from './CustomRange.module.scss';
import { MovieFilterData } from '../../../features/movies/movieTypes';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
const Range = createSliderWithTooltip(Slider.Range);

export interface CustomRangeProps {
  formData: MovieFilterData;
  setFormData: React.Dispatch<React.SetStateAction<MovieFilterData>>;
  name: string;
  defaults: number[];
  state: number[];
  stateStr: string;
  min: number;
  max: number;
  step: number;
  tipFormatter: any;
  marks: any;
}

const CustomRange = ({
  formData,
  setFormData,
  name,
  defaults,
  state,
  stateStr,
  min,
  max,
  step,
  tipFormatter,
  marks,
}: CustomRangeProps) => {
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
        height: '25px',
        width: '25px',
        top: 0,
        border: '3px solid #79c4e2',
      },
    ],
    dot: {
      opacity: '0',
    },
  };

  const handleSliderChange = (v: any) => {
    setFormData({
      ...formData,
      [stateStr]: v,
    });
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h3>{name}</h3>
      </header>
      <Range
        className={styles.range}
        onChange={(v: any) => handleSliderChange(v)}
        defaultValue={defaults}
        value={state}
        min={min}
        max={max}
        step={step}
        marks={marks}
        railStyle={rangeStyles.rail}
        trackStyle={rangeStyles.track}
        dotStyle={rangeStyles.dot}
        handleStyle={rangeStyles.handle}
        tipProps={{
          placement: 'top',
          visible: true,
        }}
        tipFormatter={tipFormatter}
      />
    </div>
  );
};

export default CustomRange;
