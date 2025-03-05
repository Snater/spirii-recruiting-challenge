import type {Status} from '../types.ts';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

type Props = {
	status?: Status
}

export default function LocationIcon({status}: Props) {
	return (
		status === 'Available'
			? <PlayArrowIcon fontSize="large"/>
			: status === 'In use'
				? <PauseIcon fontSize="large"/>
				: status === 'Suspended'
					? <NotInterestedIcon fontSize="large"/>
					: <QuestionMarkIcon fontSize="large"/>
	)
}