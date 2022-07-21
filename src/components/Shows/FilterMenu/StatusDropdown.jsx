import { useSelector } from 'react-redux';
import Select from 'react-select';
import styles from './StatusDropdown.module.scss';

const options = [
  { value: 0, label: 'Returning Series' },
  { value: 3, label: 'Ended' },
  { value: 4, label: 'Cancelled' },
];

const customStyles = {
  control: (styles) => ({ ...styles, cursor: 'pointer' }),
  option: (styles) => ({ ...styles, cursor: 'pointer' }),
};

const StatusDropdown = ({ formData, setFormData }) => {
  const { filterData } = useSelector((state) => state.show);

  const current = options.filter((opt) =>
    filterData.status.includes(opt.value)
  );

  const handleStatusChange = (active) => {
    const statusValues = active.map((opt) => opt.value);

    setFormData({
      ...formData,
      status: statusValues,
    });
  };

  return (
    <div className={styles.sort}>
      <h3>Status</h3>
      <Select
        options={options}
        className={styles.dropdown}
        styles={customStyles}
        defaultValue={current}
        isSearchable={false}
        isMulti={true}
        onChange={handleStatusChange}
      />
    </div>
  );
};

export default StatusDropdown;
