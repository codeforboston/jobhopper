import React from 'react';
import OnetLink from '../OnetLink';
import { SimpleFlexRow, SimpleFlexUnit, TextContainer } from './styledDivs';

export default function ToolTipDisplay(props: any) {
  const { info } = props;
  return <ToolTipData info={info} />;
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

  const hourlyNoDecimal = (hourly: number) => Math.round(hourly);

  const annualFormatted = (annual: number) =>
    annual?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <TextContainer>
      <SimpleFlexRow style={{ justifySelf: 'flex-start' }}>
        <SimpleFlexUnit style={{ whiteSpace: 'nowrap' }}>
          {info.data.code}
        </SimpleFlexUnit>
        <SimpleFlexUnit>
          <OnetLink socCode={info.data.code} occupation={info.data.name}>
            {info.data.name}
          </OnetLink>
        </SimpleFlexUnit>
        <SimpleFlexUnit>{info.data.category}</SimpleFlexUnit>
      </SimpleFlexRow>
      <SimpleFlexRow style={{ justifyContent: 'flex-end' }}>
        <SimpleFlexUnit>
          {`Transition Share: ${
            Math.round(info.data.transitionRate * 10000) / 100
          }%`}
        </SimpleFlexUnit>
        <SimpleFlexUnit>Salary: </SimpleFlexUnit>
        <SimpleFlexRow style={{ display: 'flex', flexDirection: 'row' }}>
          <SimpleFlexUnit>
            Hourly {`$${hourlyNoDecimal(info.data.hourlyPay)}`}
          </SimpleFlexUnit>
          <SimpleFlexUnit>
            Annual {`$${annualFormatted(info.data.annualSalary)}`}
          </SimpleFlexUnit>
        </SimpleFlexRow>
      </SimpleFlexRow>
    </TextContainer>
  );
};
