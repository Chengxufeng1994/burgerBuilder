import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  success: {
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.light,
    },
  },
  error: {
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.light,
    },
  },
}));

const MuiButton = (props) => {
  const { className, color, size, children } = props;
  const classes = useStyles(props);

  return (
    <Button
      className={classes[className]}
      color={color}
      size={size}
      variant="contained"
    >
      {children}
    </Button>
  );
};

export default MuiButton;
