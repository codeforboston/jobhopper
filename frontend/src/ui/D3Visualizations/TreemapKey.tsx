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
  categoryCodes: Set<number>;
  selectedCategory?: number;
}

export default function TreemapKey({
  categoryCodes,
  selectedCategory,
}: TreemapKeyProps) {
  const keyEntries: KeyEntryProps[] = [];

  categoryCodes.forEach(code => {
    const idx = colorDomainMajorOccCodes.findIndex(occCode => code === occCode);
    keyEntries.push({
      code,
      name: majorLookup.get(code),
      color: colorRange[idx],
    });
  });

  keyEntries.sort((a, b) => Number(a.code) - Number(b.code));

  return (
    <KeyContainer>
      <KeyTitle>Occupation categories shown above*</KeyTitle>
      <KeyList keyEntries={keyEntries} selectedCategory={selectedCategory} />
      <CaptionText>
        *SOC (Standard Occupation Classification) code broad category, used by
        the Bureau of Labor Statistics to define occupations
      </CaptionText>
    </KeyContainer>
  );
}
