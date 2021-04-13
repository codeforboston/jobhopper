import React from 'react';
import styled from 'styled-components';

const MAX_VISIBLE_CATEGORIES = 6;

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
  margin-bottom: 6px;
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
  keyEntries: allKeyEntries,
  selectedCategory,
}: {
  keyEntries: KeyEntryProps[];
  selectedCategory?: number;
}) => {
  const keyEntries = useFilterKeyEntries(selectedCategory, allKeyEntries);
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
        <KeyEntry
          key={entry.code}
          {...entry}
          selectedCategory={selectedCategory}
        />
      ))}
    </div>
  );
};

function useFilterKeyEntries(
  selectedCategory: number | undefined,
  entries: KeyEntryProps[]
): KeyEntryProps[] {
  const visible = entries.slice(0, MAX_VISIBLE_CATEGORIES);
  const visibleIfSelected = entries
    .slice(MAX_VISIBLE_CATEGORIES)
    .find(entry => entry.code === selectedCategory);
  if (visibleIfSelected) {
    visible[visible.length - 1] = visibleIfSelected;
  }
  return visible;
}

function KeyEntry({ code, name, color, selectedCategory }: KeyEntryProps) {
  const isSelected = code === selectedCategory;
  return (
    <div
      style={{
        display: 'flex',
        flex: '1 0 30%',
        justifyContent: 'flex-start',
        margin: '2.5px 0 2.5px 5px',
      }}
    >
      <KeyColorSquare color={color} isSelected={isSelected} />

      <div>
        <b>{code}</b> {name}
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
  text-align: left;
  width: 100%;
  margin: 4em 1em 0em 1em;
`;
