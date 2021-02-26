import React from 'react';
import { majorLookup } from 'src/domain/transition';
import { colorDomainMajorOccCodes, colorRange } from './colorSchemes';
import {
  CaptionText,
  KeyContainer,
  KeyEntryProps,
  KeyList,
  KeyTitle,
} from './TreemapSubComponents';

export interface TreemapKeyProps {
  occupationCodes: Set<number>;
  selectedCategory?: number | string;
}

export default function TreemapKey({
  occupationCodes,
  selectedCategory,
}: TreemapKeyProps) {
  const dataArray: Partial<KeyEntryProps>[] = [];

  occupationCodes.forEach(code => {
    const idx = colorDomainMajorOccCodes.findIndex(occCode => code === occCode);
    dataArray.push({
      code: code.toString(),
      name: majorLookup.get(code),
      color: colorRange[idx],
    } as Partial<KeyEntryProps>);
  });

  const sortedDataArray = dataArray.sort(
    (a, b) => Number(a.code) - Number(b.code)
  );

  return (
    <KeyContainer>
      <KeyTitle>Occupation categories shown above*</KeyTitle>
      <KeyList
        dataArray={sortedDataArray}
        selectedCategory={selectedCategory}
      />
      <CaptionText>
        *SOC (Standard Occupation Classification) code broad category, used by
        the Bureau of Labor Statistics to define occupations
      </CaptionText>
    </KeyContainer>
  );
}
