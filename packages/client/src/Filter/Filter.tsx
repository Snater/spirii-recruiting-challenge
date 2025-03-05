import {Dispatch, SetStateAction} from 'react';
import type {SearchQuery, Status} from '../types';
import Grid2 from '@mui/material/Grid2';
import StatusSelect from './StatusSelect';
import TextInput from './TextInput';

type Props = {
	searchQuery: SearchQuery
	setSearchQuery: Dispatch<SetStateAction<SearchQuery>>
}

export default function Filter({searchQuery, setSearchQuery}: Props) {

	const handleTextChange = (text: string) => {
		setSearchQuery(query => ({text, status: query.status}));
	};

	const handleSelectChange = (status?: Status) => {
		setSearchQuery(query => ({
			text: query.text,
			status,
		}));
	}

	return (
		<Grid2 container size={{xs: 12}} spacing={1}>
			<Grid2 offset={{lg: 3}} size={{xs: 12, md: 6, lg: 3}}>
				<TextInput onChange={handleTextChange}/>
			</Grid2>
			<Grid2 size={{xs: 12, md: 6, lg: 3}}>
				<StatusSelect onChange={handleSelectChange} status={searchQuery.status}/>
			</Grid2>
		</Grid2>
	);
}
