import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default function Home() {
  const useStyles = makeStyles({
    container: {
      boxShadow:
        "rgba(0, 0, 0, 0.2) 0px 1px 3px 0px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 2px 1px -1px;",
      background: "white",
      "& >.MuiGrid-item": { padding: "10px", border: "0px solid red" }
    },
    subContainer: {
      padding: "10px"
    }
  });
  const [state, setState] = useState({ name: "", clients: [] });
  const classes = useStyles();

  const wss = new WebSocket("wss://localhost:3001");

  wss.onmessage = event => {
    //received message from ws server
    console.log("message:" + event);
  };

  return (
    <Grid container justify="center" item md={12}>
      <Grid container justify="center">
        <Grid container item md={6} className={classes.container}>
          <Grid item md={9}>
            <TextField
              label="Enter name"
              onChange={e => setState({ name: e.target.value })}
              value={state.name}>
              test
            </TextField>
          </Grid>
          <Grid container item md justify="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={() => wss.send(JSON.stringify(state.name))}>
              Join Chat
            </Button>
          </Grid>

          <Grid item md={4}>
            left
          </Grid>
          <Grid item md>
            right
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
