import type {Meta, StoryObj} from '@storybook/react';
import Filter from './Filter.tsx';
import {fn} from '@storybook/test';

const meta = {
	component: Filter,
	args: {
		searchQuery: {
			text: '',
		},
		setSearchQuery: fn(),
	},
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
