import React from 'react';
import { getCategoryForCode } from './category';
import {
  CaptionText,
  KeyContainer,
  KeyList,
  KeyTitle,
} from './TreemapSubComponents';

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
      <CaptionText>
        *SOC (Standard Occupation Classification) code broad category, used by
        the Bureau of Labor Statistics to define occupations
      </CaptionText>
    </KeyContainer>
  );
}
