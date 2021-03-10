import React from 'react';
import { getCategoryForCode } from './category';
import { KeyContainer, KeyList, KeyTitle } from './TreemapSubComponents';

export interface TreemapKeyProps {
  categoryCodes: number[];
  selectedCategory?: number;
}

export default function TreemapKey({
  categoryCodes,
  selectedCategory,
}: TreemapKeyProps) {
  const keyEntries = categoryCodes
    .map(getCategoryForCode)
    .sort((a, b) => Number(a.code) - Number(b.code));

  return (
    <KeyContainer>
      <KeyTitle>Occupation categories shown above*</KeyTitle>
      <KeyList keyEntries={keyEntries} selectedCategory={selectedCategory} />
    </KeyContainer>
  );
}
