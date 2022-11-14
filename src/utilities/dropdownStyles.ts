import { StylesConfig } from 'react-select';

export const dropdownStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    cursor: 'pointer',
    fontSize: '15px',
  }),
  option: (styles) => ({
    ...styles,
    cursor: 'pointer',
    fontSize: '14px',
  }),
};
