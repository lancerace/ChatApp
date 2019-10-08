import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

export default function Home() {
  const useStyles = makeStyles({
    container: {
      boxShadow:
        "rgba(0, 0, 0, 0.2) 0px 1px 3px 0px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 2px 1px -1px;",
      background: "white",
      "&>div": {
        padding: "10px",
        border: "0px solid gray"
      },
      marginTop: "5vh"
    }
  });
  const [state, setState] = useState({ name: "", clients: [] });
  const classes = useStyles();

  const wss = new WebSocket("wss://localhost:3001");

  wss.onopen = function() {
    console.log("WebSocket is open now.");
  };

  wss.onmessage = ({ data }) => {
    //  received message from ws server
    const response = JSON.parse(data);
    console.log("received response");
    console.log(response.NewUser);
  };

  return (
    <Grid container justify="center">
      <Grid container item md={6} className={classes.container}>
        <Grid item md={3}>
          <TextField
            label="Enter name"
            onChange={e => setState({ ...state, name: e.target.value })}
            value={state.name}>
            test
          </TextField>
        </Grid>
        <Grid container item md={9} justify="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              state.name === ""
                ? ""
                : fetch(
                    `http://localhost:3000/api/addNewUser?${new URLSearchParams(
                      `client=${state.name}`
                    )}`
                  ).then(response => {
                    if (!response.ok)
                      console.log(`HTTP error,status=${response.status}`);
                    else
                      response.json().then(data => {
                        setState({
                          ...state,
                          clients: [...state.clients, data]
                        });
                      });
                  })
            }>
            Join Chat
          </Button>
        </Grid>
        {/** end first row */}
        <Grid container>
          <Grid item md={2}>
            <Grid item md={12}>
              <Typography variant="h6">Members</Typography>
            </Grid>
            {state.clients.map((client, i) => {
              return client === null ? (
                ""
              ) : (
                <Grid item md={12} key={`${i}-${client}`}>
                  <b>{client}</b> <Divider />
                </Grid>
              );
            })}
          </Grid>
          <Grid item md={1} />
          <Grid item md>
            <Typography variant="h6">Community Conversation</Typography>
            <Grid item md>
              aaa
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
