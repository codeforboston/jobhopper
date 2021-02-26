import React, { useState } from 'react';
import { Occupation } from 'src/domain/occupation';
import { State } from 'src/domain/state';
import { Transition } from 'src/domain/transition';
import Treemap from './Treemap';
import TreemapKey from './TreemapKey';
import { Title, CaptionText } from './TreemapSubComponents';

export interface TreemapWrapperProps {
  selectedOccupation: Occupation;
  selectedState?: State;
  transitionData: Transition[];
}

function category(trans: Transition): number {
  return parseInt(trans.code.slice(0, 2));
}

export default function TreemapWrapper({
  selectedState,
  selectedOccupation,
  transitionData,
}: TreemapWrapperProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>();

  const occName = selectedOccupation ? selectedOccupation.name : '';
  const occCode = selectedOccupation ? selectedOccupation.code : '';

  const title = `Job Transitions from ${occName} (${occCode}) ${
    selectedState ? `in ${selectedState.name}` : `Nationally`
  } `;

  const footnoteBlurb = `This visualization shows the occupations which ${occName} move to when they change occupation. The transition share is the proportion of ${occName} who move into a job in each other occupation when they switch jobs. We only break out individual occupations with transition shares greater than 0.2%.`;

  const occCategoryList = new Set<number>();

  transitionData.forEach(item => {
    occCategoryList.add(category(item));
  });

  return (
    <div style={{ display: 'flex' }}>
      <Title>{title}</Title>
      <div>
        <Treemap
          data={transitionData}
          setSelectedCategory={setSelectedCategory}
          selectedOccupation={selectedOccupation}
        />
      </div>
      <TreemapKey
        occupationCodes={occCategoryList}
        selectedCategory={selectedCategory}
      />
      <CaptionText>{footnoteBlurb}</CaptionText>
    </div>
  );
}
