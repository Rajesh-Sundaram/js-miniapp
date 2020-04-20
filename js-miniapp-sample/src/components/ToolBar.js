//@flow
import React, { Fragment, useState, useEffect } from "react";

import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Drawer from "./Drawer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

type ToolBarProps = {
  title: string,
  showDrawer: Boolean,
  actions: any,
  onShrinkToggle: Function,
  onDrawerToggle: Function,
  navItems: any,
};

const ToolBar = (props: ToolBarProps) => {
  const classes = useStyles();
  const [drawer, setDrawer] = useState({ show: props.showDrawer ?? false });

  useEffect(
    () => {
      setDrawer({ ...drawer, show: props.showDrawer });
    }, // eslint-disable-next-line
    [props.showDrawer]
  );
  const [shrinkState, setShrink] = useState({ shrink: false });
  const toggleDrawer = () => {
    const showFlag = !drawer.show;
    props.onDrawerToggle(showFlag);
    setDrawer({ show: showFlag });
  };
  const onDrawerShrink = () => {
    const shrinkFlag = !shrinkState.shrink;
    props.onShrinkToggle(shrinkFlag);
    setShrink({ shrink: shrinkFlag });
  };

  const onOpenClose = (type, event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    toggleDrawer();
  };
  return (
    <Fragment>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            data-testid="drawer-toggle-button"
          >
            {drawer.show ? (
              <CloseIcon data-testid="close-icon" />
            ) : (
              <MenuIcon data-testid="menu-icon" />
            )}
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {props.title}
          </Typography>
          <div className="actions">{props.actions}</div>
        </Toolbar>
      </AppBar>
      <Drawer
        show={drawer.show}
        shrinked={shrinkState.shrink}
        onOpenClose={onOpenClose}
        onShrink={onDrawerShrink}
        navItems={props.navItems}
      ></Drawer>
    </Fragment>
  );
};

const mapStateToProps = (state, props) => {
  return { ...props, title: state.home.title };
};

export default connect(mapStateToProps)(withRouter(ToolBar));