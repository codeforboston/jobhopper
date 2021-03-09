import React, { useMemo, useState } from 'react';
import { Occupation } from 'src/domain/occupation';
import { State } from 'src/domain/state';
import { getCategory, Transition } from 'src/domain/transition';
import Treemap from './Treemap';
import TreemapKey from './TreemapKey';
import { Title, CaptionText } from './TreemapSubComponents';

export interface TreemapWrapperProps {
  selectedOccupation: Occupation;
  selectedState?: State;
  transitions: Transition[];
}

export default function TreemapWrapper({
  selectedState,
  selectedOccupation,
  transitions,
}: TreemapWrapperProps) {
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const categoryCodes = useCategoryCodes(transitions);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <Title>
        Job Transitions from {selectedOccupation.name} (
        {selectedOccupation.code})
        {selectedState ? ` in ${selectedState.name}` : ` Nationally`}
      </Title>
      <div>
        <Treemap
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
        This visualization shows the occupations which {selectedOccupation.name}
        s move to when they change occupation. The transition share is the
        proportion of {selectedOccupation.name}s who move into a job in each
        other occupation when they switch jobs. We only break out individual
        occupations with transition shares greater than 0.2%.
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
