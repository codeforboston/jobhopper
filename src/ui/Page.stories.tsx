// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import Page from './Page';
import { Body, Header, Title } from './Typography';

export default {
  title: 'JobHopper/Page',
  component: Page,
} as Meta;

export const Defualt: Story = () => (
  <Page>
    <Title>Title</Title>
    <Header>Header</Header>
    <Body>Body</Body>
  </Page>
);
