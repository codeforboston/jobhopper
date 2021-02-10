import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React from 'react';
import { majorLookup } from 'src/domain/transition';
import { colorDomainMajorOccCodes, colorRange } from './colorSchemes';
import {
  CaptionText,
  KeyEntryProps,
  KeyList,
  KeyTitle,
} from './TreemapSubComponents';

export interface TreemapKeyProps {
  occupationCodes: Set<number>;
  footnote_blurb: string;
  selectedCategory?: number | string;
}

export default function TreemapKey({
  occupationCodes,
  footnote_blurb,
  selectedCategory,
}: TreemapKeyProps) {
  const dataArray: Partial<KeyEntryProps>[] = [];

  const usedOccCodes: number[] = [];

  occupationCodes.forEach(code => {
    if (!usedOccCodes.includes(code)) {
      const idx = colorDomainMajorOccCodes.findIndex(
        occCode => code === occCode
      );
      dataArray.push({
        code: code.toString(),
        name: majorLookup.get(code),
        color: colorRange[idx],
      } as Partial<KeyEntryProps>);
    }
  });

  const sortedDataArray = dataArray.sort(
    (a, b) => Number(a.code) - Number(b.code)
  );

  const keyStyle = {
    display: 'block',
    fontFamily: 'PT Sans',
    lineHeight: '30px',
    textAlign: 'left',
    margin: '2em',
    width: '80vw',
    height: '50%',
  } as CSSProperties;

  return (
    <div style={keyStyle}>
      <KeyTitle>Occupation categories shown above*</KeyTitle>
      <KeyList
        dataArray={sortedDataArray}
        selectedCategory={selectedCategory}
      />
      <CaptionText>
        *SOC (Standard Occupation Classification) code broad category, used by
        the Bureau of Labor Statistics to define occupations
      </CaptionText>
      <CaptionText>{footnote_blurb}</CaptionText>
    </div>
  );
}
