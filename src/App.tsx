import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useCallback, useEffect, useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid2 from '@mui/material/Grid2';
import LocationList from './LocationList';
import {scrolledToBottom} from './util';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: Infinity,
		},
	},
});

const theme = createTheme();

export default function App() {

	const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);

	const handleScroll = useCallback(() => {
		setIsScrolledToBottom(scrolledToBottom());
	}, []);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);

	return (
		<QueryClientProvider client={queryClient}>
			<CssBaseline/>
			<ThemeProvider theme={theme}>
				<Grid2 container p={2}>
					<Grid2 size={{xs: 12}}>
						<LocationList isScrolledToBottom={isScrolledToBottom}/>
					</Grid2>
				</Grid2>
			</ThemeProvider>
		</QueryClientProvider>
	)
}
