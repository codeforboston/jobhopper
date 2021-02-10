import React, { useState } from 'react';
import { Occupation } from 'src/domain/occupation';
import { State } from 'src/domain/state';
import { majorLookup, Transition } from 'src/domain/transition';
import { colorDomainMajorOccCodes, colorRange } from './colorSchemes';
import Treemap from './Treemap';
import TreemapKey from './TreemapKey';

export interface TreemapWrapperProps {
  selectedOccupation?: Occupation;
  selectedState?: State;
  transitionData: Transition[];
}

export interface KeyEntryProps {
  code?: string;
  name?: string;
  color?: string;
  selectedCategory?: string | number;
}

export interface KeyColorSquareProps {
  color?: string;
  isSelected?: boolean;
}

export default function TreemapWrapper({
  selectedState,
  selectedOccupation,
  transitionData,
}: TreemapWrapperProps) {
  function category(trans: Transition): number {
    return parseInt(trans.code.slice(0, 2));
  }

  const [selectedCategory, setSelectedCategory] = useState();

  const transData = transitionData;

  const dataArray: Partial<KeyEntryProps>[] = [];

  transData.forEach(trans => {
    const categoryCode = category(trans);
    if (!dataArray.find(entry => entry.code === categoryCode.toString())) {
      const idx = colorDomainMajorOccCodes.findIndex(
        code => code === categoryCode
      );
      dataArray.push({
        code: categoryCode.toString(),
        name: majorLookup.get(categoryCode),
        color: colorRange[idx],
      } as Partial<KeyEntryProps>);
    }
  });

  const occName = selectedOccupation ? selectedOccupation.name : '';
  const occCode = selectedOccupation ? selectedOccupation.code : '';

  const title = `Job Transitions from ${occName} (${occCode}) ${
    selectedState ? `in ${selectedState.name}` : `Nationally`
  } `;

  const footnote_blurb = `This visualization shows the occupations which ${occName} move to when they change occupation. The transition share is the proportion of ${occName} who move into a job in each other occupation when they switch jobs. We only break out individual occupations with transition shares greater than 0.2%.`;

  const occCategoryList = new Set<number>();

  transitionData.forEach(item => {
    occCategoryList.add(category(item));
  });

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <Treemap
          title={title}
          data={transitionData}
          setSelectedCategory={setSelectedCategory}
          selectedOccupation={selectedOccupation}
        />
      </div>
      <TreemapKey
        occupationCodes={occCategoryList}
        footnote_blurb={footnote_blurb}
        selectedCategory={selectedCategory}
      />
    </div>
  );
}
