import type {Preview, StoryFn} from '@storybook/react';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@emotion/react';
import {createTheme} from '@mui/material/styles';

const withTheme = (Story: StoryFn) => {
	const theme = createTheme();

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline/>
			<Story/>
		</ThemeProvider>
	);
};

const preview: Preview = {
	decorators: [withTheme],
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
