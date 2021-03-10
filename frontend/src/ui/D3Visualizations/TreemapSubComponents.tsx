import React from 'react';
import styled from 'styled-components';

export const Title = styled.div`
  /* height: 5vh; */
  font-family: 'PT Sans';
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  margin-bottom: 6px;
  color: #000000;
`;

export const KeyTitle = styled.div`
  flex: 1 0 100%;
  font-size: 18px;
  width: 100%;
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
    <div
      style={{
        display: 'flex',
        flex: '1 0 100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
      }}
    >
      {keyEntries.map((entry, i) => (
        <KeyEntry key={i} {...entry} selectedCategory={selectedCategory} />
      ))}
    </div>
  );
};

function KeyEntry({ code, name, color, selectedCategory }: KeyEntryProps) {
  const isSelected = code === selectedCategory;
  return (
    <div
      style={{
        display: 'flex',
        flex: '0 0 30%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: '2.5px 0 2.5px 5px',
        height: '4em',
      }}
    >
      <KeyColorSquare color={color} isSelected={isSelected} />

      <div style={{ height: '2em' }}>
        {code} {name}
      </div>
    </div>
  );
}

const KeyColorSquare = ({ color, isSelected }: KeyColorSquareProps) => {
  const style = {
    flex: '1',
    maxHeight: '20px',
    maxWidth: '20px',
    minHeight: '20px',
    minWidth: '20px',
    margin: '0 12px 0 0',
    backgroundColor: color,
    outline: isSelected ? '3px solid #3CA565' : 'none',
    outlineOffset: isSelected ? '1px' : '0',
    transition: 'outline-offset 0.5s ease',
  };

  return <div style={style} />;
};

export const KeyContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  font-family: 'PT Sans';
  line-height: 30px;
  text-align: left;
  margin: 4em 2em;
`;
