import React from 'react';
import { Story } from '@storybook/react/types-6-0';

/**
 * Returns a component that renders a story using either the args on the story
 * or those provided.
 */
export const bindArgs = <T,>(S: Story<T>, args?: Partial<T>) => () => (
  <S {...((args ?? S.args) as T)} />
);
