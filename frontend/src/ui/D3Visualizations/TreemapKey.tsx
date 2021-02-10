import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React, { useState } from 'react';
import { majorLookup, Transition } from 'src/domain/transition';
import { colorDomainMajorOccCodes, colorRange } from './colorSchemes';
import { CaptionText, KeyEntryProps, KeyList, KeyTitle } from './TreemapSubComponents';

export interface TreemapKeyProps {
    occupationCodes: Set<number>;
    footnote_blurb: string;
}

export default function TreemapKey({
    occupationCodes,
    footnote_blurb,
}: TreemapKeyProps) {


    function category(trans: Transition): number {
        return parseInt(trans.code.slice(0, 2));
    }

    const [selectedCategory, setSelectedCategory] = useState("")


    const dataArray: Partial<KeyEntryProps>[] = [];

    const usedOccCodes: number[] = []

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
    })

    const keyStyle = {
        display: 'block',
        fontFamily: 'PT Sans',
        lineHeight: '30px',
        textAlign: 'left',
        margin: '2em',
        width: '80vw',
        height: '50%',
    } as CSSProperties


    return (
        <div style={keyStyle}>
            <KeyTitle>Occupation categories shown above*</KeyTitle>
            <KeyList dataArray={dataArray} selectedCategory={parseInt(selectedCategory)} />
            <CaptionText>
                *SOC (Standard Occupation Classification) code broad category, used by the
                Bureau of Labor Statistics to define occupations
            </CaptionText>
            <CaptionText>
                {footnote_blurb}
            </CaptionText>
        </div>
    );
}
