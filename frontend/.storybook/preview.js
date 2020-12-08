import React from 'react';
import '../src/index.css';
import { ThemeProvider } from '@material-ui/core/styles';
import { base as theme } from '../src/ui/theme';
import { StoryRouter } from 'storybook-react-router';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
  Story => (
    <ThemeProvider theme={theme}>
        <StoryRouter>
        <Story />
      </StoryRouter>
    </ThemeProvider>
  ),
];
