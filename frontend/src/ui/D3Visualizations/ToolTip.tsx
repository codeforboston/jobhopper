import React from 'react';
import OnetLink from '../OnetLink';

export default function ToolTipDisplay(props: any) {
  const { info } = props;
  return (
    <div
      style={{
        fontWeight: 'bolder',
        height: '300px',
        padding: '20px',
      }}
    >
      {info && <ToolTipData info={info} />}
    </div>
  );
}

const TextContainerStyle: any = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  justifyContents: 'space-between',
  alignItems: 'flex-start',
  height: '100%',
  fontFamily: 'PT Sans',
  fontWeight: 400,
  fontSize: '16px',
  color: 'black',
};

const ToolTipData = (props: any) => {
  const { info } = props;

  const hourlyTwoDecimal = (hourly: number) =>
    (Math.round(hourly * 100) / 100).toFixed(2);
  const annualFormatted = (annual: number) =>
    annual.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return (
    <div style={TextContainerStyle}>
      <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
        <div style={{ marginRight: '2em' }}>{info.data.code}</div>
        <div style={{ flex: 3 }}>
          <OnetLink socCode={info.data.code}>{info.data.name}</OnetLink>
        </div>
      </div>
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
          }}
        >
          Salary:&nbsp; Hourly ${`${hourlyTwoDecimal(info.data.hourlyPay)}`}
          &nbsp; Annual ${`${annualFormatted(info.data.annualSalary)}`}&nbsp;
        </div>
      </div>
    </div>
  );
};
