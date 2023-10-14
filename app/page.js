"use client";

import Image from "next/image";
import "./page.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Grid,
  Paper,
  Box,
  TextField,
  Button,
} from "@mui/material";
import washing_machines from "../public/washing_machines.png";
import favicon from "../public/favicon.png";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onClick = async () => {
    try {
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
              router.push("/role/staff/components/main-content/dashBoard");
              break;
            default:
              router.push("/");
              break;
          }
        } else {
          // show error Invalid Password
          console.log("Invalid Password");
        }
      } else {
        //show error cannot find username
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
            </Box>
          </Box>
        </Grid>
      </div>
    </div>
  );

  //
  // return (
  //   <div className={styles.main}>
  //     <div className={styles.image}>Washing Machine image here</div>
  //     <div className={styles.login}>
  //       <div className={styles.icon}>Icon Here</div>
  //       <div className={styles.login_wrapper}>
  //         <TextField
  //           label="Enter your user ID"
  //           onChange={(e) => setUsername(e.currentTarget.value)}
  //         />
  //         <TextField
  //           type="password"
  //           label="Enter your password"
  //           onChange={(e) => setPassword(e.currentTarget.value)}
  //         />
  //         <Button variant="contained" color="primary" onClick={onClick}>
  //           Login
  //         </Button>
  //       </div>
  //     </div>
  //   </div>
  // );
}
