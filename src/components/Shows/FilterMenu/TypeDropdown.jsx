import { useSelector } from 'react-redux';
import Select from 'react-select';
import styles from './TypeDropdown.module.scss';

const options = [
  { value: 0, label: 'Documentary' },
  { value: 1, label: 'News' },
  { value: 2, label: 'Miniseries' },
  { value: 3, label: 'Reality' },
  { value: 4, label: 'Scripted' },
  { value: 5, label: 'Talk Show' },
  { value: 6, label: 'Video' },
];

const customStyles = {
  control: (styles) => ({ ...styles, cursor: 'pointer' }),
  option: (styles) => ({ ...styles, cursor: 'pointer' }),
};

const TypeDropdown = ({ formData, setFormData }) => {
  const { filterData } = useSelector((state) => state.show);

  const current = options.filter((opt) => filterData.type.includes(opt.value));

  const handleTypeChange = (active) => {
    const typeValues = active.map((opt) => opt.value);

    setFormData({
      ...formData,
      type: typeValues,
    });
  };

  return (
    <div className={styles.sort}>
      <h3>Type</h3>
      <Select
        options={options}
        className={styles.dropdown}
        styles={customStyles}
        defaultValue={current}
        isSearchable={false}
        isMulti={true}
        onChange={handleTypeChange}
      />
    </div>
  );
};

export default TypeDropdown;
