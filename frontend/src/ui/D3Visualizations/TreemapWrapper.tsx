import { transform } from 'lodash';
import React, { useState } from 'react';
import { Occupation } from 'src/domain/occupation';
import { State } from 'src/domain/state';
import { majorLookup, Transition } from 'src/domain/transition';
import styled from 'styled-components';
import { NumberLiteralType } from 'typescript';
import { StyledSecondaryButton } from '../Common.stories';
import Treemap, { CategoryNode } from './Treemap';

export interface TreemapWrapperProps {
  selectedOccupation?: Occupation;
  selectedState?: State;
  transitionData: Transition[];
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  font-family: PT Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 30px;
  color: #000000;
`;

const Key = styled.div`
  margin-bottom: 2em;
  margin-top: 1em;
`;

const KeyTitle = styled.div`
  font-family: PT Sans;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 0em;
  text-align: left;
`;

const KeyList = styled.div`
  font-family: PT Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 0em;
  text-align: left;
`;

const KeyExplanation = styled.div`
  font-family: PT Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
`;

export interface KeyEntryProps {
  code?: string;
  name?: string;
  color?: string;
  selected?: boolean;
}

const KeyColorSquare = styled.div.attrs(
  props =>
    ({
      color: props.color,
      selected: false,
    } as KeyEntryProps)
)`
  flex: 1;
  max-height: 20px;
  max-width: 20px;
  min-height: 20px;
  min-width: 20px;
  margin-right: 12px;
  background-color: ${props => props.color};
`;

// /* border: ${props => props.selected ? "3px solid #3CA565" : `3px solid ${props.color}`}; */

function KeyEntry({ code, name, color, selected }: KeyEntryProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: '',
      }}
    >
      <KeyColorSquare color={color} selected={selected}></KeyColorSquare>
      <div style={{ flex: 1 }}>
        {code} {name}
      </div>
    </div>
  );
}

export default function TreemapWrapper({
  selectedState,
  selectedOccupation,
  transitionData,
}: TreemapWrapperProps) {
  const [sort, setSort] = useState<'occupation' | 'wage'>('occupation');

  const onclick = (e: React.MouseEvent) => {
    sort === 'occupation' ? setSort('wage') : setSort('occupation');
  };

  function category(trans: Transition): number {
    return parseInt(trans.code.slice(0, 2));
  }

  const transData = transitionData;

  const dataArray: Partial<KeyEntryProps>[] = [];

  const colorRange = [
    '#2E96FC',
    '#31B39F',
    '#5DC2B3',
    '#73B9FE',
    '#766CFB',
    '#8DD5CA',
    '#958DFA',
    '#A2D0FD',
    '#C1BFFE',
    '#D0E7FF',
    '#D0EEE9',
    '#DA8FC7',
    '#DFDDFE',
    '#F79FE0',
    '#FEA333',
    '#FEB95D',
    '#FECE8B',
    '#FED1DE',
    '#FEE1BA',
    '#FF4782',
    '#FF74A1',
    '#FFA3C0',
    '#FFD0F3',
  ];

  const colorDomainMajorOccCodes = [
    11,
    13,
    15,
    17,
    19,
    21,
    23,
    25,
    27,
    29,
    31,
    33,
    35,
    37,
    39,
    41,
    43,
    45,
    47,
    49,
    51,
    53,
    55,
  ];

  //forEach e in transitionData => dataArray[e] = {dataArray[e]||0};
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

  const title = `Job Transitions from ${selectedOccupation?.name} (${
    selectedOccupation?.code
  }) ${selectedState ? `in ${selectedState.name}` : `Nationally`} `;

  const categoryList: Partial<KeyEntryProps>[] = [
    {
      code: '11',
      name: 'Management Occupations',
      color: '#766CFB',
      selected: false,
    },
    {
      code: '35',
      name: 'Food Preparation and Serving Related Occupations',
      color: '#FEE1BA',
      selected: true,
    },
    {
      code: '41',
      name: 'Sales and Related Occupations',
      color: '#FEA333',
      selected: false,
    },
    {
      code: '43',
      name: 'Office and Administrative Support Occupations',
      color: '#FF4782',
      selected: false,
    },
    {
      code: '53',
      name: 'Transportation and Material Moving Occupations',
      color: '#F79FE0',
      selected: false,
    },
  ];

  return (
    <>
      <Header id="header">
        <Title id="title">{title}</Title>
      </Header>
      <Treemap data={transitionData} sort={sort} />
      <Key>
        <KeyTitle>Occupation categories shown above*</KeyTitle>

        <KeyList>
          {categoryList.map(category => {
            let { code, name, color, selected } = category;
            return (
              <KeyEntry
                code={code}
                name={name}
                color={color}
                selected={selected}
              />
            );
          })}
        </KeyList>
      </Key>
      *SOC (Standard Occupation Classification) code broad category, used by the
      Bureau of Labor Statistics to define occupations
      <KeyExplanation>
        This treemap shows the occupations which Waiters and Waitresses move to
        when they change occupation. The transition share is the proportion of
        Waiters and Waitresses who move into another occupation when they switch
        jobs. We only break out individual occupations with transition shares
        greater than 0.2%.
      </KeyExplanation>
    </>
  );
}
