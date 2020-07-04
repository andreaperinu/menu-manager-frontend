import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	Paper: {
		width: '100%',
		padding: theme.spacing(1.5),
	},

	Field: {
		width: '100%',
	}
}));

export default useStyles
