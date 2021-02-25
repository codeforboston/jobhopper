import React from 'react';
import OnetLink from '../OnetLink';
import { SimpleFlexRow, TextContainer } from './styledDivs';

export default function ToolTipDisplay(props: any) {
  const { info } = props;
  return (
    // <ToolTipStyleDiv>
    <ToolTipData info={info} />
    // </ToolTipStyleDiv>
  );
}

const ToolTipData = (props: any) => {
  const { info } = props;
  if (!info) {
    return (
      <TextContainer>
        Roll over or click items in treemap for more information
      </TextContainer>
    );
  }

  const hourlyTwoDecimal = (hourly: number) =>
    (Math.round(hourly * 100) / 100).toFixed(2);

  const annualFormatted = (annual: number) =>
    annual?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <TextContainer>
      <SimpleFlexRow style={{}}>
        <div style={{ marginRight: '2em' }}>{info.data.code}</div>
        <div style={{ flex: 3 }}>
          <OnetLink socCode={info.data.code}>{info.data.name}</OnetLink>
        </div>
      </SimpleFlexRow>
      <SimpleFlexRow>
        <div style={{ flex: 3 }}>{info.data.category}</div>
      </SimpleFlexRow>
      <div
        style={{
          display: 'flex',
          flex: 2,
          flexDirection: 'row',
          marginRight: '.5em',
        }}
      >
        <div style={{ flex: 1, fontVariantNumeric: 'lining-nums' }}>
          Transition Share:
          {Math.round(info.data.transitionRate * 10000) / 100}%
        </div>
        <div
          style={{
            display: 'flex',
            flex: 2,
            flexDirection: 'row',
            fontVariantNumeric: 'tabular-nums lining-nums',
            textAlign: 'right',
          }}
        >
          Salary:&nbsp; Hourly ${`${hourlyTwoDecimal(info.data.hourlyPay)}`}
          &nbsp; Annual ${`${annualFormatted(info.data.annualSalary)}`}&nbsp;
        </div>
      </div>
      <hr></hr>
    </TextContainer>
  );
};
