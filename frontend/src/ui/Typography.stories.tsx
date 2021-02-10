import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { Body, Header, Title } from './Typography';

export default {
  title: 'JobHopper/Typography',
} as Meta;

const Template: Story<{ title: string; header: string; body: string }> = ({
  title,
  header,
  body,
}) => (
  <div>
    <Title children={title} />
    <Header children={header} />
    <Body children={body} />
  </div>
);

export const Default = Template.bind({});
Default.args = { title: 'Title', body: 'Body', header: 'Header' };
