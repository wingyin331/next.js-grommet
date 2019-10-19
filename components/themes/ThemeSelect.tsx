import React, { useContext } from 'react';
import { Select } from 'grommet';
import { AppThemeContext } from '../app/AppThemeContext';

interface ThemeSelectProps {
  theme: string,
  onChange(value: string): void,
}
const ThemeSelect: React.FC<ThemeSelectProps> = ({ theme, onChange }) => {
  const { themes } = useContext(AppThemeContext);
  return (

    <Select
      a11yTitle='Select theme'
      value={theme}
      options={Object.keys(themes)}
      onChange={({ target: { value: newTheme } }) => onChange(newTheme)}
    />
  );
};

export default ThemeSelect;
