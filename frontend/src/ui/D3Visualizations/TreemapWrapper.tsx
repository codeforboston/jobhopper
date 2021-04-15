import { groupBy, sumBy, toPairs } from 'lodash';
import React, { useMemo, useState } from 'react';
import { Occupation } from 'src/domain/occupation';
import { State } from 'src/domain/state';
import { getCategory, Transition } from 'src/domain/transition';
import Treemap from './Treemap';
import TreemapKey from './TreemapKey';
import { Title, CaptionText } from './TreemapSubComponents';
import useScrollToOnMount from './useScrollToOnMount';

export interface TreemapWrapperProps {
  display: string;
  selectedOccupation: Occupation;
  selectedState?: State;
  transitions: Transition[];
}

export default function TreemapWrapper({
  display,
  selectedState,
  selectedOccupation,
  transitions,
}: TreemapWrapperProps) {
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const categoryCodes = useCategoryCodes(transitions);
  const scrollToRef = useScrollToOnMount<HTMLDivElement>();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        position: 'relative',
        alignSelf: 'center',
        width: '90vw',
      }}
    >
      <Title ref={scrollToRef}>
        Which occupations do {selectedOccupation.name} (
        {selectedOccupation.code}) move to?
      </Title>
      <div style={{ width: '100%' }}>
        <Treemap
          display={display}
          transitions={transitions}
          setSelectedCategory={setSelectedCategory}
          selectedOccupation={selectedOccupation}
        />
      </div>
      <TreemapKey
        categoryCodes={Array.from(categoryCodes)}
        selectedCategory={selectedCategory}
      />
      <CaptionText>
        This visualization shows the occupations which {selectedOccupation.name}{' '}
        move to when they change occupation. The size of the box represents the
        transition share, which is the proportion of {selectedOccupation.name}{' '}
        who move into a job in each other occupation when they switch jobs. We
        only break out individual occupations with transition shares greater
        than 0.2%. In the "occupation" view, the colors of the boxes represent
        occupation groups. In the "salary" view, the colors of the boxes
        represent the hourly pay of the occupation{' '}
        {selectedState ? ' in ' + selectedState.name : 'Nationally.'}
      </CaptionText>
      <CaptionText>
        *SOC (Standard Occupation Classification) code broad category, used by
        the Bureau of Labor Statistics to define occupations
      </CaptionText>
    </div>
  );
}

/** Gets a list of transition codes, sorted by decreasing total transition share */
const useCategoryCodes = (transitions: Transition[]): number[] => {
  return useMemo(() => {
    const categoryCodes: number[] = [];
    const totalRateByCode: { [code: string]: number } = {};

    toPairs(groupBy(transitions, getCategory)).forEach(
      ([stringCode, categoryTransitions]) => {
        const code = Number(stringCode);
        totalRateByCode[code] = sumBy(
          categoryTransitions,
          t => t.transitionRate
        );
        categoryCodes.push(code);
      }
    );

    categoryCodes.sort((a, b) => totalRateByCode[b] - totalRateByCode[a]);
    return categoryCodes;
  }, [transitions]);
};
