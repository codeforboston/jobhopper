import React, { useState } from 'react'
import { Occupation } from 'src/domain/occupation'
import { State } from 'src/domain/state'
import { Transition } from 'src/domain/transition'
import styled from 'styled-components';
import { StyledSecondaryButton } from '../Common.stories';
import Treemap from './Treemap'


export interface TreemapWrapperProps {
    selectedOccupation?: Occupation;
    selectedState?: State;
    transitionData: Transition[]
}


const Header = styled.div`
    display: flex;
    justify-content: space-between;

`

const Title = styled.div`
    position: absolute;
    width: 602px;
    height: 46px;
    left: 49px;
    top: 781px;
    font-family: PT Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 23px;
    color: #000000;
`

const Key = styled.div``

const KeyTitle = styled.div`
font-family: PT Sans;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: 30px;
letter-spacing: 0em;
text-align: left;
`

const KeyList = styled.div`
font-family: PT Sans;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 30px;
letter-spacing: 0em;
text-align: left;
`

const KeyExplanation = styled.div`
font-family: PT Sans;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 18px;
letter-spacing: 0em;
text-align: left;
`

export default function TreemapWrapper({
    selectedState,
    selectedOccupation,
    transitionData,
}: TreemapWrapperProps) {

    const [sort, setSort] = useState<"occupation" | "wage">("occupation")



    const onclick = (e: React.MouseEvent) => {
        sort === "occupation" ? setSort("wage") : setSort("occupation")
    }

    const title = `Job Transitions from ${selectedOccupation?.name} (${selectedOccupation?.code
        }) ${selectedState ? `in ${selectedState.name}` : `Nationally`}`;


    return (
        <>
            <Header id="header">
                <Title id="title">{title}</Title>
            </Header>
            < Treemap data={transitionData} sort={sort} />
            <Key>
                <KeyTitle>
                    Occupation categories shown above*
            </KeyTitle>

                <KeyList>
                    11 Management Occupations
                    35 Food Preparation and Serving Related Occupations
                    41 Sales and Related Occupations
                    43 Office and Administrative Support Occupations
                    53 Transportation and Material Moving Occupations
            </KeyList>

*SOC (Standard Occupation Classification) code broad category, used by the Bureau of Labor Statistics to define occupations

<KeyExplanation>
                    This treemap shows the occupations which Waiters and Waitresses move to when they change occupation. The transition share is the proportion of Waiters and Waitresses who move into another occupation when they switch jobs. We only break out individual occupations with transition shares greater than 0.2%.
</KeyExplanation>
            </Key>

        </>
    )
}
