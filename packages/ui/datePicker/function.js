// initiate names
export const monthNames = [
	'January',
	'February',
	'Mart',
	'April',
	'May',
	'Juny',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];
export const shortMonthNames = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec'
];
const dayNames = ['Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu', 'Minggu'];
const shortDayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const isLeapYear = (year) => year % 4 === 0;

// initiate empty array for date layout
export const getEmptyRows = () => {
	return Array.from({ length: 42 }).map(() => []);
};

// initiate amount date on each month
const getMonthDays = (index, year) => {
	return index !== 1 ? monthDays[index] : isLeapYear(year) ? 29 : 28;
};

// initiate month date
export const getMonthStats = (monthIndex, year) => {
	const today = new Date(year, monthIndex, 1);
	const index = today.getMonth();
	return {
		name: index[index],
		days: getMonthDays(index, year)
	};
};

// generate name
export const getDayname = (index) => dayNames[index];
export const getShortDayname = (index) => shortDayNames[index];
export const getMonthName = (index) => monthNames[index];
export const getShortMonthName = (index) => shortMonthNames[index];

// generate date rows
export const getDateRows = (monthIndex, year) => {
	const { days } = getMonthStats(monthIndex, year);
	const rows = getEmptyRows();
	const startIndex = new Date(year, monthIndex, 1).getDay();

	Array.from({ length: days }).forEach((_, i) => {
		const index = startIndex + i;
		rows[index] = i + 1;
	});

	// locate date position
	const filled = rows.map((i) => (Array.isArray(i) ? undefined : i));

	// return filled[35] ? filled : filled.slice(0, -7);
	return filled;
};

// initiate default empty value
export const noop = () => {};

//generate id
export const uuid = (() => {
	let id = 1;
	return () => {
		return ++id;
	};
})();
