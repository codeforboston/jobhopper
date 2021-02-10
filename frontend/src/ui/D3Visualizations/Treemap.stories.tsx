import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Treemap, { TreemapProps, category } from './Treemap';
import data from '../../testing/data/transitionData';
import states from '../../testing/data/states';
import occupations from '../../testing/data/occupations';
import TreemapKey, { TreemapKeyProps } from './TreemapKey'


export default {
  title: 'JobHopper/Treemap',
  component: Treemap,
} as Meta;

export const Default: Story<TreemapProps> = args => <Treemap {...args} />;
Default.args = {
  data,
  selectedState: states[0],
  selectedOccupation: occupations[0],
};

const occCategoryList = new Set<number>()

data.forEach(item => {
  occCategoryList.add(category(item))
})


const footnote_blurb = () => `This visualization shows the occupations which ${occupations[0]} move to when they change occupation. The transition share is the proportion of ${occupations[0]} who move into a job in each other occupation when they switch jobs. We only break out individual occupations with transition shares greater than 0.2%.`;

export const Key: Story<TreemapKeyProps> = args => <TreemapKey {...args} />;
Key.args = {
  occupationCodes: occCategoryList,
  footnote_blurb: footnote_blurb()
};
