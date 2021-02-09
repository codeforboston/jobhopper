import React, { useState } from 'react';
import { Occupation } from 'src/domain/occupation';
import { State } from 'src/domain/state';
import { majorLookup, Transition } from 'src/domain/transition';
import styled from 'styled-components';
import Treemap from './Treemap';
import { colorRange, colorDomainMajorOccCodes } from './colorSchemes'
import { Key, KeyTitle, KeyList, KeyExplanation } from './styledDivs';

export interface TreemapWrapperProps {
  selectedOccupation?: Occupation;
  selectedState?: State;
  transitionData: Transition[];
}

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
  border: ${props => props.selected ? "3px solid #3CA565" : `3px solid ${props.color}`};
`;



const clipOccupationFromString = (str?: string) => {
  if (str){
    const clippedName: string | undefined = str.replace(/Occupations*/, "") || "none"
    return clippedName
  }
}

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
        {code} {clipOccupationFromString(name) ?? ""}
      </div>
    </div>
  );
}

export default function TreemapWrapper({
  selectedState,
  selectedOccupation,
  transitionData,
}: TreemapWrapperProps) {

  function category(trans: Transition): number {
    return parseInt(trans.code.slice(0, 2));
  }

  const transData = transitionData;

  const dataArray: Partial<KeyEntryProps>[] = [];


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

  const title = `Job Transitions from ${selectedOccupation?.name} (${selectedOccupation?.code
  }) ${selectedState ? `in ${selectedState.name}` : `Nationally`} `;

  


  return (
    <div style={{ display: "flex" }}>
      <div>
      <Treemap title={title} data={transitionData} />
      </div>

      <Key>
        <KeyTitle>Occupation categories shown above*</KeyTitle>
        <KeyList>
          {dataArray.map((category, i) => {
            let { code, name, color, selected } = category;
            return (
              <KeyEntry
                key={1}
                code={code}
                name={name}
                color={color}
                selected={selected}
              />
            );
          })}
        </KeyList>
        <KeyExplanation>
      *SOC (Standard Occupation Classification) code broad category, used by the
      Bureau of Labor Statistics to define occupations
      
        This treemap shows the occupations which Waiters and Waitresses move to
        when they change occupation. The transition share is the proportion of
        Waiters and Waitresses who move into another occupation when they switch
        jobs. We only break out individual occupations with transition shares
        greater than 0.2%.
      </KeyExplanation>
      </Key>
     
    </div>
  );
}
