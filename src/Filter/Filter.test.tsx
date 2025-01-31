import {render, screen} from '@testing-library/react';
import {useEffect, useState} from 'react';
import userEvent, {type UserEvent} from '@testing-library/user-event';
import Filter from './';
import type {SearchQuery} from '../types';

let user: UserEvent;

beforeAll(() => {
	user = userEvent.setup();
});

function MockWrapper({onChange}: {onChange: (searchQuery: SearchQuery) => void}) {
	const [searchQuery, setSearchQuery] = useState<SearchQuery>({text: '', status: undefined});

	useEffect(() => {
		onChange(searchQuery)
	}, [onChange, searchQuery]);

	return (
		<Filter searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
	);
}

test('Type into input', async () => {
	const handleChange = jest.fn();
	render(<MockWrapper onChange={handleChange}/>);

	await user.type(screen.getByRole('textbox'), 'h');

	expect(handleChange).toHaveBeenCalledTimes(2);
	expect(handleChange).toHaveBeenLastCalledWith({text: 'h', status: undefined});
});

test('Change select', async () => {
	const handleChange = jest.fn();
	render(<MockWrapper onChange={handleChange}/>);

	await user.click(screen.getByRole('combobox'));
	await user.click(screen.getByText('Available'));

	expect(handleChange).toHaveBeenCalledTimes(2);
	expect(handleChange).toHaveBeenLastCalledWith({text: '', status: 'Available'});

	await user.click(screen.getByRole('combobox'));
	await user.click(screen.getByText('all'));

	expect(handleChange).toHaveBeenCalledTimes(3);
	expect(handleChange).toHaveBeenLastCalledWith({text: '', status: undefined});
});

