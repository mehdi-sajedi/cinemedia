import { useSelector } from 'react-redux';
import Select from 'react-select';
import styles from './TypeDropdown.module.scss';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const options = [
  { value: 4, label: 'Scripted' },
  { value: 2, label: 'Miniseries' },
  { value: 3, label: 'Reality' },
  { value: 0, label: 'Documentary' },
  { value: 5, label: 'Talk Show' },
];

const customStyles = {
  control: (styles) => ({ ...styles, cursor: 'pointer', fontSize: '15px' }),
  option: (styles) => ({ ...styles, cursor: 'pointer', fontSize: '14px' }),
};

const TypeDropdown = ({ formData, setFormData }) => {
  const { filterData } = useSelector((state) => state.show);

  const current = options.filter((opt) => filterData.type.includes(opt.value));

  const handleTypeChange = (active) => {
    setFormData({
      ...formData,
      type: active,
    });
  };

  return (
    <div className={styles.select}>
      <h3>Type</h3>
      <Select
        options={options}
        className={styles.dropdown}
        styles={customStyles}
        defaultValue={current}
        value={formData.type}
        isSearchable={false}
        isMulti={true}
        onChange={handleTypeChange}
        closeMenuOnSelect={false}
        components={animatedComponents}
      />
    </div>
  );
};

export default TypeDropdown;
