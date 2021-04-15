import { Collapse } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Section } from './Common';
import { Body, Title } from './Typography';

const CollapsingSection = styled(Section)`
  & p {
    margin-block: 0;
    margin-bottom: 48px;
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
        Which occupations do people switch to?
        <CollapseIcon transform={`rotate(${show ? 180 : 0})`} />
      </Title>
      <Collapse in={show}>
        <Body>
          JobHopper is a tool to explore new data on mobility between
          occupations in the US. This data was calculated by academic
          researchers using around 16 million resumes of U.S. workers (which
          were obtained and parsed by Burning Glass Technologies), and using
          occupation transitions made over 2002-2016. Note that the sample is
          very large but may not always be fully representative of transitions
          for each occupation. We believe this tool can help program managers,
          policy analysts and job coaches explore occupational transitions that
          millions of job changers have made in recent years. Understanding
          these transitions can support labor market analysis, program and
          policy development, and individual job seekers’ aspiration.
        </Body>
      </Collapse>
    </CollapsingSection>
  );
}
