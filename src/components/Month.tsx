import {
	createStyles, Grid, Paper,



	Theme, Typography,


	WithStyles,
	withStyles
} from "@material-ui/core";
import { format, getDate, isSameMonth, isToday, isWithinInterval } from "date-fns";
import * as React from "react";
import { DateRange, NavigationAction } from "../types";
import {
	chunks,
	getDaysInMonth,


	inDateRange, isEndOfRange,

	isRangeSameDay, isStartOfRange
} from "../utils";
import Day from "./Day";
import Header from "./Header";

const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const styles = (theme: Theme) =>
	createStyles({
		root: {
			width: 290,
			borderRadius: "6px",
		},
		weekDaysContainer: {
			marginTop: 10,
			paddingLeft: 30,
			paddingRight: 30
		},
		daysContainer: {
			paddingLeft: 15,
			paddingRight: 15,
			marginTop: 15,
			marginBottom: 20
		}
	});

interface MonthProps extends WithStyles<typeof styles> {
	value: Date;
	marker: symbol;
	dateRange: DateRange;
	minDate: Date;
	maxDate: Date;
	navState: [boolean, boolean];
	setValue: (date: Date) => void;
	helpers: {
		inHoverRange: (day: Date) => boolean;
	};
	handlers: {
		onDayClick: (day: Date) => void;
		onDayHover: (day: Date) => void;
		onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
	};
}

const Month: React.FunctionComponent<MonthProps> = props => {
	const {
		classes,
		helpers,
		handlers,
		value: date,
		dateRange,
		marker,
		setValue: setDate,
		minDate,
		maxDate
	} = props;

	const [back, forward] = props.navState;
	return (
		<Paper square elevation={0} className={classes.root}>
			<Grid container>
				<Header
					date={date}
					setDate={setDate}
					nextDisabled={!forward}
					prevDisabled={!back}
					onClickPrevious={() =>
						handlers.onMonthNavigate(marker, NavigationAction.Previous)
					}
					onClickNext={() => handlers.onMonthNavigate(marker, NavigationAction.Next)}
				/>

				<Grid
					item
					container
					direction="row"
					justify="space-between"
					className={classes.weekDaysContainer}>
					{WEEK_DAYS.map(day => (
						<Typography color="textSecondary" key={day} variant="caption">
							{day}
						</Typography>
					))}
				</Grid>

				<Grid
					item
					container
					direction="column"
					justify="space-between"
					className={classes.daysContainer}>
					{chunks(getDaysInMonth(date), 7).map((week, idx) => (
						<Grid key={idx} container direction="row" justify="center">
							{week.map(day => {
								const isStart = isStartOfRange(dateRange, day);
								const isEnd = isEndOfRange(dateRange, day);
								const isRangeOneDay = isRangeSameDay(dateRange);
								const highlighted =
									inDateRange(dateRange, day) || helpers.inHoverRange(day);

								return (
									<Day
										key={format(day, "MM-dd-yyyy")}
										filled={isStart || isEnd}
										outlined={isToday(day)}
										highlighted={highlighted && !isRangeOneDay}
										disabled={
											!isSameMonth(date, day) ||
											!isWithinInterval(day, {start: minDate, end: maxDate})
										}
										startOfRange={isStart && !isRangeOneDay}
										endOfRange={isEnd && !isRangeOneDay}
										onClick={() => handlers.onDayClick(day)}
										onHover={() => handlers.onDayHover(day)}
										value={getDate(day)}
									/>
								);
							})}
						</Grid>
					))}
				</Grid>
			</Grid>
		</Paper>
	);
};

export default withStyles(styles)(Month);
