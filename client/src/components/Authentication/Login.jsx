import React, { useState, useContext } from "react";
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
import UserContext from "../../context/UserContext";
import Axios from "axios";
import config from "../../config/Config";

import styles from "./Auth.module.css";

const Login = () => {
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onChangeUsername = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
  };

  const onChangePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const newUser = { username, password };
    const url = config.base_url + "/api/auth/login";
    const loginRes = await Axios.post(url, newUser);

    if (loginRes.data.status === "fail") {
      setUsernameError(loginRes.data.message);
      setPasswordError(loginRes.data.message);
    } else {
      setUserData(loginRes.data);
      localStorage.setItem("auth-token", loginRes.data.token);
      navigate("/");
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
        <Box width="70vh" boxShadow={1}>
          <Card className={styles.paper}>
            <CardContent>
              <Typography
  component="h1"
  variant="h4"
  style={{
    color: "white",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "10px"
  }}
>
  TradeSim
</Typography>

<Typography
  style={{
    color: "#cbd5e1",
    textAlign: "center",
    marginBottom: "20px"
  }}
>
  Practice trading without financial risk
</Typography>
              <form className={styles.form} onSubmit={onSubmit}>
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
                <Box display="flex" justifyContent="center">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={styles.submit}
                  >
                    Login
                  </Button>
                </Box>
              </form>
              <Grid container justify="center">
                <Grid item>
                  <Link href="/register" variant="body2">
                    Need an account?
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

export default Login;
