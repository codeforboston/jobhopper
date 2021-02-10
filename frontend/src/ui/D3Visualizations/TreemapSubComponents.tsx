import React from 'react';
import styled from 'styled-components';

export const ToolTipStyleDiv = styled.div`
  font-weight: 'bolder';
  width: 90vw;
  height: 10vh;
  margin: auto;
`;

export const SimpleFlexRow = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`;
export const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;
  font-family: 'PT sans';
  font-weight: 400;
  font-size: 16px;
  color: black;
  width: 100%;
  height: 60px;
  margin: auto;
  padding: 20px 20px 5px 20px;
`;

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
  code?: string;
  name?: string;
  color?: string;
  selectedCategory?: string | number;
}

export interface KeyColorSquareProps {
  color?: string;
  isSelected?: boolean;
}

export const KeyList = (props: {
  dataArray: any;
  selectedCategory?: number | string;
}) => {
  return props.dataArray.map((category: any, i: number) => {
    let { code, name, color } = category;
    return (
      <KeyEntry
        key={i}
        code={code}
        name={name}
        color={color}
        selectedCategory={props.selectedCategory}
      />
    );
  });
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
