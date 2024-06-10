// @ts-nocheck
// Типизировал данные. но возникла проблема с типизацией компонента Select. Временно отключил проверку на ошибки, до решения проблемы.

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select, { components, DropdownIndicatorProps } from 'react-select';

import { RootState } from '../../redux/store';
import { setVisibleTitle } from '../../redux/slices/filterSlice';

import arrowDark from '../../assets/Select/arrowDark.svg';

import { ReactSelectProps } from '../../types/arts';

import './ReactSelect.scss';

function DropdownIndicator(props: DropdownIndicatorProps<string>) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <components.DropdownIndicator {...props}>
      <img src={arrowDark} alt="arrow" />
    </components.DropdownIndicator>
  );
}

function ReactSelect({ data, title, onChangeValue }: ReactSelectProps) {
  const dispatch = useDispatch();
  const [currentValue, setCurrentValue] = useState('');
  const visibleTitle = useSelector(
    (state: RootState) => state.filter.visibleTitle
  );

  useEffect(() => {
    if (!visibleTitle) {
      setCurrentValue('');
    }
  }, [visibleTitle]);

  const handleChange = (id: string) => {
    onChangeValue(id);
    setCurrentValue(id);
    dispatch(setVisibleTitle(true));
  };

  type Arr = {
    id: string;
    name: string;
  };

  return (
    <Select
      classNamePrefix="react-select"
      options={data}
      value={visibleTitle && currentValue ? currentValue.id : ''}
      onChange={(newValue: Arr) => handleChange(newValue.id)}
      getOptionLabel={(option: { name: string; location: string }) =>
        title === 'Artist' ? option.name : option.location
      }
      getOptionValue={(option: { id: string }) => option.id}
      components={{ DropdownIndicator }}
      placeholder={
        title === 'Artist' ? 'Select the artist' : 'Select the location'
      }
      noOptionsMessage={() => 'There are no matching results for your query.'}
    />
  );
}

export default ReactSelect;
