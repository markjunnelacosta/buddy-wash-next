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
  const [failedAttempts, setFailedAttempts] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Check if the user has exceeded 3 failed attempts, and if so, set a timer
    if (failedAttempts >= 3) {
      const lockoutDuration = 10z000; // 2mins
      const lastFailedAttemptTime = parseInt(localStorage.getItem("lastFailedAttemptTime"), 10);

      if (lastFailedAttemptTime && Date.now() - lastFailedAttemptTime < lockoutDuration) {
        // The user is locked out, set an error message
        setError("You have three failed attempts. Try again 2 minutes later.");
      } else {
        // Reset failed attempts if the lockout duration has passed
        setFailedAttempts(0);
      }
    }
  }, [failedAttempts]);

  const onClick = async () => {
    try {
      if (!username || !password) {
        // Check if either username or password is empty
        setError("Please enter both username and password.");
        setTimeout(() => {
          setError("");
        }, 3500);
        return; // Exit the function early
      }

      if (failedAttempts >= 3) {
        // The user is locked out
        return;
      }

      console.log("username", username);
      const response = await fetch(`/api/user/${username}/`);
      const data = await response.json();
      console.log(data);

      if (data) {
        if (data.password == password) {
          // Successful login, reset failed attempts
          setFailedAttempts(0);
          localStorage.removeItem("lastFailedAttemptTime");

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
        } else {
          // Show error Invalid Password
          setError("Invalid Password");
          setTimeout(() => {
            setError("");
          }, 3500);
          // Increment failed login attempts
          setFailedAttempts(failedAttempts + 1);
          // Update the timestamp of the last failed login attempt in localStorage
          localStorage.setItem("lastFailedAttemptTime", Date.now());
        }
      } else {
        // Show error cannot find username
        setError("Username not found");
        setTimeout(() => {
          setError("");
        }, 3500);
        // Increment failed login attempts
        setFailedAttempts(failedAttempts + 1);
        // Update the timestamp of the last failed login attempt in localStorage
        localStorage.setItem("lastFailedAttemptTime", Date.now());
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
