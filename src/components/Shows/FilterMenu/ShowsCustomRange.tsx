import styles from './ShowsCustomRange.module.scss';
import { ShowFilterData } from '../../../features/shows/showTypes';
import { CustomRangeStyles } from '../../../utilities/CustomRangeStyles';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
const Range = createSliderWithTooltip(Slider.Range);

interface ShowsCustomRangeProps {
  formData: ShowFilterData;
  setFormData: React.Dispatch<React.SetStateAction<ShowFilterData>>;
  name: string;
  state: number[];
  min: number;
  max: number;
  step: number;
  tipFormatter: any;
  marks: any;
}

const ShowsCustomRange = ({
  formData,
  setFormData,
  name,
  min,
  max,
  step,
  state,
  marks,
  tipFormatter,
}: ShowsCustomRangeProps) => {
  const handleSliderChange = (v: any) => {
    setFormData({
      ...formData,
      [name]: v,
    });
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h3 className={styles.name}>{name}</h3>
      </header>
      <Range
        className={styles.range}
        onChange={handleSliderChange}
        defaultValue={[min, max]}
        value={state}
        min={min}
        max={max}
        step={step}
        marks={marks}
        tipFormatter={tipFormatter}
        railStyle={CustomRangeStyles.rail}
        trackStyle={CustomRangeStyles.track}
        dotStyle={CustomRangeStyles.dot}
        handleStyle={CustomRangeStyles.handle}
        tipProps={{
          placement: 'top',
          visible: true,
        }}
      />
    </div>
  );
};

export default ShowsCustomRange;
