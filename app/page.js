"use client";

import Image from "next/image";
import "./page.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Grid, Paper, Box, TextField, Button } from "@mui/material";
import washing_machines from "../public/washing_machines.png";
import favicon from "../public/favicon.png";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [remainingTime, setRemainingTime] = useState(120);

  const router = useRouter();

  useEffect(() => {
    let timer;
    if (isTimerActive && remainingTime > 0) {
      timer = setTimeout(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000);
    } else if (isTimerActive && remainingTime === 0) {
      setIsTimerActive(false);
      setLoginAttempts(0);
      localStorage.removeItem("loginAttempts"); // Reset stored login attempt
    }

    return () => clearTimeout(timer);
  }, [isTimerActive, remainingTime]);

  useEffect(() => {
    // On component mount, check if there are stored login attempts
    const storedLoginAttempts = localStorage.getItem("loginAttempts");
    if (storedLoginAttempts) {
      setLoginAttempts(parseInt(storedLoginAttempts, 10));
    }

    // Check if there is an active timer
    const storedTimerState = localStorage.getItem("isTimerActive");
    if (storedTimerState === "true") {
      setIsTimerActive(true);
      setRemainingTime(parseInt(localStorage.getItem("remainingTime"), 10));
    }
  }, []);

  const onClick = async () => {
    try {
      if (!username || !password) {
        alert("Please enter both username and password.");
        return;
      }

      if (isTimerActive) {
        alert(`Please wait for ${remainingTime} seconds before trying again.`);
        return;
      }

      console.log("username", username);
      const response = await fetch(`/api/user/${username}/`);
      const data = await response.json();
      console.log(data);

      if (data) {
        if (data.password == password) {
          switch (data.userRole) {
            case "admin":
              router.push("role/admin/users");
              break;
            case "owner":
              router.push("role/owner/components/main/dashboard");
              break;
            case "staff":
              router.push("/role/staff/dashBoard");
              break;
            default:
              router.push("/");
              break;
          }
          // Clear stored values on successful login
          localStorage.removeItem("loginAttempts");
          localStorage.removeItem("isTimerActive");
          localStorage.removeItem("remainingTime");
        } else {
          setLoginAttempts(loginAttempts + 1);
          localStorage.setItem("loginAttempts", loginAttempts + 1);

          if (loginAttempts >= 2) {
            setIsTimerActive(true);
            setRemainingTime(120);
            localStorage.setItem("isTimerActive", true);
            localStorage.setItem("remainingTime", 120);
            alert("Three unsuccessful login attempts. Please try again later.");
          } else {
            alert("Password does not match.");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div id="main-container">
      <div id="left">
        <Image
          className="machines"
          src={washing_machines}
          alt="Washing machine pics"
        />
      </div>
      <div id="right">
        <Grid
          id="signin"
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image className="logo" src={favicon} alt="Bodywash logo" />

            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                className="input-field"
                margin="normal"
                required
                fullWidth
                id="email"
                label="UserID"
                name="userID"
                autoComplete="email"
                autoFocus
                value={username}
                onChange={(e) => {
                  setUsername(e.currentTarget.value);
                }}
              />
              <TextField
                className="input-field"
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                }}
              />
              <Button
                id="login-button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={onClick}
              >
                Login
              </Button>
              {error && <div className="error-message">{error}</div>}
            </Box>
          </Box>
        </Grid>
      </div>
    </div>
  );
}
