import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ReactSelect from '../ReactSelect';
import Input from '../Input';

import {
  useGetTotalAuthorsQuery,
  useGetTotalLocationsQuery,
} from '../../redux/query/artApi';

import IconPlusDark from '../../assets/Accordion/IconPlus';
import IconMinusDark from '../../assets/Accordion/IconMinus';

import { AccordionUsageProps } from '../../types/arts';

import styles from './Accordion.module.scss';

export default function AccordionUsage({
  title,
  onChangeValue,
  valueFrom,
  valueTo,
  onChangeInputFromValue,
  onChangeInputToValue,
}: AccordionUsageProps) {
  const [expanded, setExpanded] = useState<string | false>(false);

  const { data: authors = [] } = useGetTotalAuthorsQuery();
  const { data: locations = [] } = useGetTotalLocationsQuery();

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <Accordion
      expanded={expanded === 'panel'}
      onChange={handleChange('panel')}
      className={styles.blockMain}
    >
      <AccordionSummary
        expandIcon={expanded === 'panel' ? <IconMinusDark /> : <IconPlusDark />}
        aria-controls="panel-content"
        id="panel-header"
        className={styles.blockUp}
      >
        {title}
      </AccordionSummary>
      <AccordionDetails className={styles.blockDown}>
        {title === 'Years' ? (
          <Input
            valueFrom={valueFrom}
            valueTo={valueTo}
            onChangeInputFromValue={onChangeInputFromValue}
            onChangeInputToValue={onChangeInputToValue}
          />
        ) : (
          <ReactSelect
            data={title === 'Artist' ? authors : locations}
            title={title}
            onChangeValue={onChangeValue}
          />
        )}
      </AccordionDetails>
    </Accordion>
  );
}
