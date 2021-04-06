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
        The treemap above shows the occupations which {selectedOccupation.name}{' '}
        move to when they change occupation based on the observations in our
        dataset. The transition share is the percentage of these observed{' '}
        {selectedOccupation.name} who have moved into each of the occupations
        listed.
      </CaptionText>
      <CaptionText>
        *SOC (Standard Occupation Classification) code broad category, used by
        the Bureau of Labor Statistics to define occupations
      </CaptionText>
    </div>
  );
}

const useCategoryCodes = (transitions: Transition[]) => {
  return useMemo(() => {
    const categoryCodes = new Set<number>();
    transitions.forEach(transition => {
      categoryCodes.add(getCategory(transition));
    });
    return categoryCodes;
  }, [transitions]);
};
