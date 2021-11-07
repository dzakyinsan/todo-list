import React from "react";
import { Redirect } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch, useSelector } from "react-redux";
import { onUserRegister } from "./../../redux/actions";

const theme = createTheme();

export default function Register() {
  const dispatch = useDispatch();

  const register = useSelector((state) => state.registerReducer.register);
  const messageRdx = useSelector((state) => state.registerReducer.message);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(onUserRegister(data.get("firstName"), data.get("email"), data.get("gender")));
  };

  if (register) {
    return <Redirect to={"/login"} />;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://media-exp3.licdn.com/dms/image/C561BAQFBQLqZHxY15g/company-background_10000/0/1521479008333?e=2159024400&v=beta&t=FK2XoTuiXnR0fm7EqWvib_P5XU6bbYGILTt2voUB0EU)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Register
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item sm={12}>
                    <TextField name="firstName" required id="firstName" label="First Name" fullWidth autoFocus />
                  </Grid>
                  <Grid item sm={12}>
                    <TextField required id="email" fullWidth label="Email Address" name="email" />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl component="fieldset">
                      <RadioGroup required row aria-label="gender" name="row-radio-buttons-group">
                        <FormControlLabel name="gender" value="female" control={<Radio />} label="Female" />
                        <FormControlLabel name="gender" value="male" control={<Radio />} label="Male" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Register
                </Button>
                {messageRdx ? (
                  <Alert severity="warning" style={{ marginBottom: "15px" }}>
                    {messageRdx}
                  </Alert>
                ) : null}
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Login
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
}
