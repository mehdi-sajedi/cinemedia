import { useSelector } from 'react-redux';
import Select from 'react-select';
import styles from './StatusDropdown.module.scss';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const options = [
  { value: 0, label: 'Returning Series' },
  { value: 3, label: 'Ended' },
  { value: 4, label: 'Cancelled' },
];

const customStyles = {
  control: (styles) => ({ ...styles, cursor: 'pointer', fontSize: '15px' }),
  option: (styles) => ({ ...styles, cursor: 'pointer', fontSize: '14px' }),
};

const StatusDropdown = ({ formData, setFormData }) => {
  const { filterData } = useSelector((state) => state.show);

  const current = options.filter((opt) =>
    filterData.status.includes(opt.value)
  );

  const handleStatusChange = (active) => {
    setFormData({
      ...formData,
      status: active,
    });
  };

  return (
    <div className={styles.select}>
      <h3>Status</h3>
      <Select
        options={options}
        className={styles.dropdown}
        styles={customStyles}
        defaultValue={current}
        value={formData.status}
        isSearchable={false}
        isMulti={true}
        onChange={handleStatusChange}
        closeMenuOnSelect={false}
        components={animatedComponents}
      />
    </div>
  );
};

export default StatusDropdown;
