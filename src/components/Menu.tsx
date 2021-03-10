import {
	createStyles, Divider, Grid, Paper,
	Theme,
	Typography,
	WithStyles,
	withStyles
} from "@material-ui/core";
import ArrowRightAlt from "@material-ui/icons/ArrowRightAlt";
import { differenceInCalendarMonths, format } from "date-fns";
import React from "react";
import { MARKERS } from "..";
import { DateRange, DefinedRange, NavigationAction, Setter } from "../types";
import DefinedRanges from "./DefinedRanges";
import Month from "./Month";

const styles = (theme: Theme) =>
	createStyles({
		header: {
			padding: "20px 70px"
		},
		headerItem: {
			flex: 1,
			textAlign: "center"
		},
		divider: {
			borderRight: `1px solid ${theme.palette.action.hover}`,
			marginBottom: 20
		},
		paper:{
			background: "#FFFFFF",
			borderRadius: "6px",
			zIndex: 1000,
			position: "absolute",
			left: "411px",
      		top: "300px"
		}
	});

interface MenuProps extends WithStyles<typeof styles> {
	dateRange: DateRange;
	ranges: DefinedRange[];
	minDate: Date;
	maxDate: Date;
	firstMonth: Date;
	secondMonth: Date;
	setFirstMonth: Setter<Date>;
	setSecondMonth: Setter<Date>;
	setDateRange: Setter<DateRange>;
	helpers: {
		inHoverRange: (day: Date) => boolean;
	};
	handlers: {
		onDayClick: (day: Date) => void;
		onDayHover: (day: Date) => void;
		onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
	};
}

const Menu: React.FunctionComponent<MenuProps> = props => {
	const {
		classes,
		ranges,
		dateRange,
		minDate,
		maxDate,
		firstMonth,
		setFirstMonth,
		secondMonth,
		setSecondMonth,
		setDateRange,
		helpers,
		handlers
	} = props;
	const { startDate, endDate } = dateRange;
	const canNavigateCloser = differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
	const commonProps = { dateRange, minDate, maxDate, helpers, handlers };
	return (
		<Paper  className={classes.paper} elevation={5} >
			<Grid container  direction="row" wrap="nowrap">
				<Grid>
					<Grid container className={classes.header} alignItems="center">
						<Grid item className={classes.headerItem}>
							<Typography variant="subtitle1">
								{startDate ? format(startDate, "MMMM dd, yyyy") : "Start Date"}
							</Typography>
						</Grid>
						<Grid item className={classes.headerItem}>
							<ArrowRightAlt color="action" />
						</Grid>
						<Grid item className={classes.headerItem}>
							<Typography variant="subtitle1">
								{endDate ? format(endDate, "MMMM dd, yyyy") : "End Date"}
							</Typography>
						</Grid>
					</Grid>
					<Divider />
					<Grid container direction="row" justify="center" wrap="nowrap">
						<Grid>
							<DefinedRanges
								selectedRange={dateRange}
								ranges={ranges}
								setRange={setDateRange}
							/>
						</Grid>
						<div className={classes.divider} />
						<Month
							{...commonProps}
							value={firstMonth}
							setValue={setFirstMonth}
							navState={[true, canNavigateCloser]}
							marker={MARKERS.FIRST_MONTH}
						/>
						<div className={classes.divider} />
						<Month
							{...commonProps}
							value={secondMonth}
							setValue={setSecondMonth}
							navState={[canNavigateCloser, true]}
							marker={MARKERS.SECOND_MONTH}
						/>
					</Grid>
				</Grid>
				
				
			</Grid>
		</Paper>
	);
};

export default withStyles(styles)(Menu);
