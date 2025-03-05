import TextField from '@mui/material/TextField';

type Props = {
	onChange: (text: string) => void
}

export default function Filter({onChange}: Props) {
	return (
		<TextField fullWidth label="Address" onChange={event => onChange(event.target.value)}/>
	);
}
