import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	Root: {
		width: '100%',
	},

	Paper: {
		width: '100%',
		marginBottom: theme.spacing(2),
	},

	Table: {
		minWidth: 750,
	}
}));

export default useStyles
