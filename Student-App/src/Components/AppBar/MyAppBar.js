import React from "react";

// Material-UI Components
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
    fontWeight: "bold",
    fontSize: "18px"
  }
}));

export default function MyAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ color: "#FDFEFE" }}
      >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Sri Ayudhya School - We Re(cycle)
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}