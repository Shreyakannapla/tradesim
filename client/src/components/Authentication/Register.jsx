import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  CssBaseline,
  Button,
  Card,
  CardContent,
  Grid,
  Link,
} from "@material-ui/core";

import { useNavigate } from "react-router-dom";

import Axios from "axios";

import config from "../../config/Config";

import styles from "./Auth.module.css";

const Register = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onChangeUsername = (e) => {

    const newUsername = e.target.value;

    setUsername(newUsername);

    if (newUsername.length < 4 || newUsername.length > 15) {

      setUsernameError(
        "Username must be between 4 and 15 characters."
      );

    } else {

      setUsernameError("");
    }
  };

  const onChangePassword = (e) => {

    const newPassword = e.target.value;

    setPassword(newPassword);

    if (newPassword.length < 6 || newPassword.length > 20) {

      setPasswordError(
        "Password must be between 6 and 20 characters."
      );

    } else {

      setPasswordError("");
    }
  };

  const onSubmit = async (e) => {

    e.preventDefault();

    if (!usernameError && !passwordError) {

      const newUser = { username, password };

      const url =
        config.base_url + "/api/auth/register";

      const registerRes = await Axios.post(
        url,
        newUser
      );

      if (registerRes.data.status === "fail") {

        if (!registerRes.data.type) {

          setPasswordError(registerRes.data.message);

          setUsernameError(registerRes.data.message);

        } else if (
          registerRes.data.type === "username"
        ) {

          setUsernameError(registerRes.data.message);

        } else if (
          registerRes.data.type === "password"
        ) {

          setPasswordError(registerRes.data.message);
        }

      } else {

        navigate("/login");
      }
    }
  };

  return (

    <div className={styles.background}>

      <CssBaseline />

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >

        <Box width="70vh">

          <Card className={styles.paper}>

            <CardContent>

              <Typography
                component="h1"
                variant="h4"
                style={{
                  color: "white",
                  fontWeight: "700",
                  textAlign: "center",
                  marginBottom: "10px",
                }}
              >
                TradeSim
              </Typography>

              <Typography
                style={{
                  color: "#cbd5e1",
                  textAlign: "center",
                  marginBottom: "25px",
                }}
              >
                Practice trading without financial risk
              </Typography>

              <form
                className={styles.form}
                onSubmit={onSubmit}
              >

                <TextField
  variant="outlined"
  margin="normal"
  required
  fullWidth
  id="username"
  label="Username"
  name="username"
  autoComplete="username"
  error={usernameError.length > 0}
  helperText={usernameError}
  value={username}
  onChange={onChangeUsername}
  InputLabelProps={{
    style: {
      color: "white",
      fontSize: "18px",
      fontWeight: "600",
    },
  }}
  InputProps={{
    style: {
      color: "white",
      fontSize: "18px",
      fontWeight: "600",
      background: "#1e293b",
      borderRadius: "12px",
      padding: "4px",
    },
  }}
/>

                <TextField
  variant="outlined"
  margin="normal"
  required
  fullWidth
  name="password"
  label="Password"
  type="password"
  id="password"
  autoComplete="current-password"
  error={passwordError.length > 0}
  helperText={passwordError}
  value={password}
  onChange={onChangePassword}
  InputLabelProps={{
    style: {
      color: "white",
      fontSize: "18px",
      fontWeight: "600",
    },
  }}
  InputProps={{
    style: {
      color: "white",
      fontSize: "18px",
      fontWeight: "600",
      background: "#1e293b",
      borderRadius: "12px",
      padding: "4px",
    },
  }}
/>

                <Box
                  display="flex"
                  justifyContent="center"
                >

                  <Button
                    type="submit"
                    variant="contained"
                    className={styles.submit}
                  >
                    Register
                  </Button>

                </Box>

              </form>

              <Grid container justify="center">

                <Grid item>

                  <Link
                    href="/login"
                    variant="body2"
                    style={{
                      color: "#93c5fd",
                    }}
                  >
                    Already have an account?
                  </Link>

                </Grid>

              </Grid>

            </CardContent>

          </Card>

        </Box>

      </Grid>

    </div>
  );
};

export default Register;