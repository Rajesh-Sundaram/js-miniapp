import React from "react";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  makeStyles,
} from "@material-ui/core";
import LocationOffIcon from "@material-ui/icons/LocationOff";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import clsx from "clsx";

import useGeoLocation from "../hooks/useGeoLocation";

const PRIMARY_COLOR = "rgb(63, 81, 181)";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "lightgrey",
    height: 300,
    width: "95%",
  },
  content: {
    height: "50%",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: 18,
    color: PRIMARY_COLOR,
    fontWeight: "bold",
  },
  locationContainer: {
    height: "70%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    "& div .label": {
      display: "inline",
      padding: ".2em .6em .3em",
      fontSize: "75%",
      fontWeight: 700,
      lineHeight: 1,
      textAlign: "center",
      whiteSpace: "nowrap",
      verticalAlign: "baseline",
      borderRadius: ".25em",
    },
  },
  actions: {
    justifyContent: "center",
  },
  button: {},
  disabled: {
    opacity: 0.5,
    color: "#fff !important",
    backgroundColor: "#3f51b5 !important",
  },
}));

const Location = (props) => {
  const classes = useStyles();
  const [state, watch, unwatch] = useGeoLocation();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        {state.location && state.isWatching && (
          <div
            className={classes.locationContainer}
            data-testid="location-container"
          >
            <div>
              <span className="label">Longitude:</span>
              {state.location.longitude}
            </div>
            <div>
              <span className="label">Latitude:</span>
              {state.location.latitude}
            </div>
          </div>
        )}
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          data-testid="turn-on"
          startIcon={<LocationSearchingIcon />}
          variant="contained"
          color="primary"
          disabled={state.isWatching}
          className={clsx(classes.button, {
            [classes.disabled]: state.isWatching,
          })}
          onClick={watch}
        >
          TURN ON
        </Button>
        <Button
          data-testid="turn-off"
          startIcon={<LocationOffIcon />}
          variant="contained"
          color="primary"
          onClick={unwatch}
          disabled={!state.isWatching}
          className={clsx(classes.button, {
            [classes.disabled]: !state.isWatching,
          })}
        >
          TURN OFF
        </Button>
      </CardActions>
    </Card>
  );
};

export default Location;
