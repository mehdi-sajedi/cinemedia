import Select from 'react-select';
import styles from './StatusDropdown.module.scss';
import makeAnimated from 'react-select/animated';
import { ShowFilterData } from '../../../features/shows/showTypes';
import { dropdownStyles } from '../../../utilities/dropdownStyles';

const animatedComponents = makeAnimated();

const options = [
  { value: 0, label: 'Returning Series' },
  { value: 3, label: 'Ended' },
  { value: 4, label: 'Cancelled' },
];

interface StatusDropdownProps {
  formData: ShowFilterData;
  setFormData: React.Dispatch<React.SetStateAction<ShowFilterData>>;
}

const StatusDropdown = ({ formData, setFormData }: StatusDropdownProps) => {
  const handleStatusChange = (active: any) => {
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
        styles={dropdownStyles}
        value={formData.status}
        isSearchable={false}
        isMulti={true}
        onChange={handleStatusChange}
        components={animatedComponents}
      />
    </div>
  );
};

export default StatusDropdown;
