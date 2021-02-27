import React from 'react';
import styled from 'styled-components';

export const Title = styled.div`
  height: 5vh;
  font-family: 'PT Sans';
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 30px;
  color: #000000;
`;

export const KeyTitle = styled.div`
  font-size: 18px;
`;

export const CaptionText = styled.div`
  font-size: 14px;
  font-family: 'PT sans';
  font-weight: 400;
  line-height: 18px;
  margin: 6px 0;
`;

export interface KeyEntryProps {
  code?: number;
  name?: string;
  color?: string;
  selectedCategory?: number;
}

export interface KeyColorSquareProps {
  color?: string;
  isSelected?: boolean;
}

export const KeyList = ({
  keyEntries,
  selectedCategory,
}: {
  keyEntries: KeyEntryProps[];
  selectedCategory?: number;
}) => {
  return (
    <>
      {keyEntries.map((entry, i) => (
        <KeyEntry key={i} {...entry} selectedCategory={selectedCategory} />
      ))}
    </>
  );
};

function KeyEntry({ code, name, color, selectedCategory }: KeyEntryProps) {
  const isSelected = code === selectedCategory;
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        margin: '0 0 5px 5px',
      }}
    >
      <KeyColorSquare color={color} isSelected={isSelected} />
      <div style={{ flex: 1 }}>
        {code} {clipOccupationFromString(name) ?? ''}
      </div>
    </div>
  );
}

const clipOccupationFromString = (str?: string) => {
  if (str) {
    const clippedName: string | undefined =
      str.replace(/Occupations*/, '') || 'none';
    return clippedName;
  }
};

const KeyColorSquare = ({ color, isSelected }: KeyColorSquareProps) => {
  const style = {
    flex: '1',
    maxHeight: '20px',
    maxWidth: '20px',
    minHeight: '20px',
    minWidth: '20px',
    margin: '0 12px 0 0',
    backgroundColor: color,
    border: isSelected ? '3px solid #3CA565' : `3px solid ${color}`,
  };

  return <div style={style} />;
};

export const KeyContainer = styled.div`
  display: block;
  font-family: 'PT Sans';
  line-height: 30px;
  text-align: left;
  margin: 2em;
  width: 80vw;
  height: 50%;
`;
