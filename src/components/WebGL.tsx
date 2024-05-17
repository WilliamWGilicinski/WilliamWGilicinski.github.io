import { Box, Button, Grid, Paper, Theme, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import React from "react";
import handleTest from "../App";
import Container from "./Container";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "left",
      color: theme.palette.text.secondary,
    },
  })
);

export default function WebGL(props: { handleThemeChange: any }) {
  const { handleThemeChange } = props;
  const classes = useStyles();

  const webGlPage = () => {
    return (
      <div className={classes.root} >
        <Grid container spacing={3} paddingBottom={"10vh"}>
          <Grid item xs={12}>
            <Paper className={classes.paper} sx={{height: "60vh"}}>
                <iframe width="100%" height="100%" src="WebGL/index.html"/>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography>
              To Use the program press the 'r', 'y', 'p' to change the camera orientation<br/>
              </Typography>
              <br/>
              <Typography>
               To move the camera use 'v', 'c', 'f'<br/>
              </Typography>
              <br/>
              <Typography>
                To move the objects use 'w', 'a', 's', 'd'<br/>
              </Typography>
              <br/>
              <Typography>
                To move the objets orientation use 'b', 'n', 'm'<br/>
              </Typography>
              <br/>
              <Typography>
                 To move the light use 1-6. I did this on a keypad keyboard so 5, 1, 2, 3 are like w, a, s, d and 4 and 6 move the light up and down<br/>
              </Typography>
              <br/>
              <Typography>
                Start the camera spinning around with 'z', and the objects spinning with 'x'<br/>
              </Typography>
              <br/>
              <Typography>
                Note: Capital inputs determine which direction orientation inputs move<br/>
              </Typography>
              <br/>
              <Typography>
                Chrome works the best so other browsers may have problems
              </Typography>
             </Paper>
          </Grid>
        </Grid>
      </div>
    );
  };

  

  return (
    <Container
      handleThemeChange={handleThemeChange}
      title="WebGL"
      page={webGlPage()}
    />
  );
}
