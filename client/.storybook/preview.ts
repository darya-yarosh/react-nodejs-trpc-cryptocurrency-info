import type { Preview } from '@storybook/react';

import '../src/App.scss';

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on.*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
