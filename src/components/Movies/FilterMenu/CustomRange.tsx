import styles from './CustomRange.module.scss';
import { MovieFilterData } from '../../../features/movies/movieTypes';
import { CustomRangeStyles } from '../../../utilities/CustomRangeStyles';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
const Range = createSliderWithTooltip(Slider.Range);

interface CustomRangeProps {
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
        railStyle={CustomRangeStyles.rail}
        trackStyle={CustomRangeStyles.track}
        dotStyle={CustomRangeStyles.dot}
        handleStyle={CustomRangeStyles.handle}
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
