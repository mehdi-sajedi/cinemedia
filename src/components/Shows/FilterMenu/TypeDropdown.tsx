import Select from 'react-select';
import styles from './TypeDropdown.module.scss';
import makeAnimated from 'react-select/animated';
import { ShowFilterData } from '../../../features/shows/showTypes';
import { dropdownStyles } from '../../../utilities/dropdownStyles';

const animatedComponents = makeAnimated();

const options = [
  { value: 4, label: 'Scripted' },
  { value: 2, label: 'Miniseries' },
  { value: 3, label: 'Reality' },
  { value: 0, label: 'Documentary' },
  { value: 5, label: 'Talk Show' },
];

interface TypeDropdownProps {
  formData: ShowFilterData;
  setFormData: React.Dispatch<React.SetStateAction<ShowFilterData>>;
}

const TypeDropdown = ({ formData, setFormData }: TypeDropdownProps) => {
  const handleTypeChange = (active: any) => {
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
        styles={dropdownStyles}
        value={formData.type}
        isSearchable={false}
        isMulti={true}
        onChange={handleTypeChange}
        components={animatedComponents}
      />
    </div>
  );
};

export default TypeDropdown;
