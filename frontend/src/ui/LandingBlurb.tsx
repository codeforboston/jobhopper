import { Collapse } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Section } from './Common';
import { Body, Title } from './Typography';

const CollapsingSection = styled(Section)`
  & p {
    margin-block: 0;
  }
`;

const CollapseIcon = styled(ExpandMoreIcon)`
  vertical-align: middle;
`;

export default function LandingBlurb() {
  const [show, setShow] = useState(true);
  return (
    <CollapsingSection>
      <Title onClick={() => setShow(show => !show)}>
        Occupation Transitions
        <CollapseIcon transform={`rotate(${show ? 180 : 0})`} />
      </Title>
      <Collapse in={show}>
        <Body>
          JobHopper is a tool to explore data on mobility between occupations,
          calculated from around 16 million resumes of U.S. workers, obtained
          and parsed by Burning Glass Technologies. The tool is designed to help
          program managers, policy analysts and job coaches explore occupational
          transitions that job changers have made. Understanding these
          transitions can support program and policy development as well as
          individual job seekers aspirations.
        </Body>
      </Collapse>
    </CollapsingSection>
  );
}
