import FormControl from '@mui/material/FormControl';
import Grid2 from '@mui/material/Grid2';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PublicIcon from '@mui/icons-material/Public';
import Select from '@mui/material/Select';
import type {Status} from '../types';

type Props = {
	onChange: (status?: Status) => void
	status?: Status
}

export default function StatusSelect({onChange, status}: Props) {
	return (
		<FormControl fullWidth>
			<InputLabel id="filter-status-label">Status</InputLabel>
			<Select
				fullWidth
				label="Status"
				labelId="filter-status-label"
				onChange={event => {
					onChange(event.target.value === '*' ? undefined : (event.target.value as Status))
				}}
				sx={{minWidth: 200}}
				value={status ?? '*'}
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
	);
}
