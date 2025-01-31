export const scrolledToBottom = () => {
	return (
		window.innerHeight + document.documentElement.scrollTop
		>= document.documentElement.offsetHeight - 100
	);
};