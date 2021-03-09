import { DefinedRange } from "./types";

import {
	addDays,
	startOfWeek,
	endOfWeek,
	addWeeks,
	startOfMonth,
	endOfMonth,
	sub
} from "date-fns";

const getDefaultRanges = (date: Date): DefinedRange[] => [
	{
		label: "Past Month",
		startDate: startOfMonth(sub(date, { months: 1 })),
		endDate: endOfMonth(sub(date, { months: 1 }))
	},
	{
		label: "Past 3 Months",
		startDate: startOfMonth(sub(date, { months: 3 })),
		endDate: endOfMonth(sub(date, { months: 1 }))
	},
	{
		label: "Past 6 Months",
		startDate: startOfMonth(sub(date, { months: 6 })),
		endDate: endOfMonth(sub(date, { months: 1 }))
	},
	{
		label: "Past Year",
		startDate: startOfMonth(sub(date, { months: 12 })),
		endDate: endOfMonth(sub(date, { months: 1 }))
	},
	{
		label: "Past 2 Years",
		startDate: startOfMonth(sub(date, { months: 24 })),
		endDate: endOfMonth(sub(date, { months: 1 }))
	},
];

export const defaultRanges = getDefaultRanges(new Date());
