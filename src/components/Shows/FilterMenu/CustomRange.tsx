import styles from './CustomRange.module.scss';
import { ShowFilterData } from '../../../features/shows/showTypes';
import { CustomRangeStyles } from '../../../utilities/CustomRangeStyles';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
const Range = createSliderWithTooltip(Slider.Range);

interface CustomRangeProps {
  formData: ShowFilterData;
  setFormData: React.Dispatch<React.SetStateAction<ShowFilterData>>;
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
        onChange={(v) => handleSliderChange(v)}
        defaultValue={defaults}
        value={state}
        min={min}
        max={max}
        railStyle={CustomRangeStyles.rail}
        trackStyle={CustomRangeStyles.track}
        handleStyle={CustomRangeStyles.handle}
        dotStyle={CustomRangeStyles.dot}
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

export default CustomRange;
