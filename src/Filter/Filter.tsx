import {ChangeEventHandler, Dispatch, SetStateAction} from 'react';
import type {SearchQuery, Status} from '../types';
import Select, {type SelectChangeEvent} from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Grid2 from '@mui/material/Grid2';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PublicIcon from '@mui/icons-material/Public';
import TextField from '@mui/material/TextField';

type Props = {
	searchQuery: SearchQuery
	setSearchQuery: Dispatch<SetStateAction<SearchQuery>>
}

export default function Filter({searchQuery, setSearchQuery}: Props) {

	const handleTextChange: ChangeEventHandler<HTMLInputElement> = event => {
		setSearchQuery(query => ({text: event.target.value, status: query.status}));
	};

	const handleSelectChange = (event: SelectChangeEvent<Status | '*'>) => {
		setSearchQuery(query => ({
			text: query.text,
			status: event.target.value === '*' ? undefined : (event.target.value as Status)
		}));
	}

	return (
		<Grid2 container size={{xs: 12}} spacing={1}>
			<Grid2 offset={{lg: 3}} size={{xs: 12, md: 6, lg: 3}}>
				<TextField fullWidth label="Address" onChange={handleTextChange}/>
			</Grid2>
			<Grid2 size={{xs: 12, md: 6, lg: 3}}>
				<FormControl fullWidth>
					<InputLabel id="filter-status-label">Status</InputLabel>
					<Select
						fullWidth
						label="Status"
						labelId="filter-status-label"
						onChange={handleSelectChange}
						sx={{minWidth: 200}}
						value={searchQuery.status ?? '*'}
					>
						<MenuItem value="*">
							<Grid2 container spacing={1}>
								<Grid2 container size="auto">
									<PublicIcon/>
								</Grid2>
								<Grid2 size="grow">all</Grid2>
							</Grid2>
						</MenuItem>
						<MenuItem value="Available">
							<Grid2 container spacing={1}>
								<Grid2 container size="auto">
									<PlayArrowIcon/>
								</Grid2>
								<Grid2 size="grow">Available</Grid2>
							</Grid2>
						</MenuItem>
						<MenuItem value="In use">
							<Grid2 container spacing={1}>
								<Grid2 container size="auto">
									<PauseIcon/>
								</Grid2>
								<Grid2 size="grow">Is use</Grid2>
							</Grid2>
						</MenuItem>
						<MenuItem value="Suspended">
							<Grid2 container spacing={1}>
								<Grid2 container size="auto">
									<NotInterestedIcon/>
								</Grid2>
								<Grid2 size="grow">Suspended</Grid2>
							</Grid2>
						</MenuItem>
					</Select>
				</FormControl>
			</Grid2>
		</Grid2>
	);
}