import React from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

const SignupPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #f5f5f5, #e0e0e0)",
        padding: 2,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: "bold",
          letterSpacing: "0.1em",
          marginBottom: 2,
          textAlign: "center",
        }}
      >
        CREATING ACCOUNT
      </Typography>

      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        sx={{
          marginBottom: 3,
          maxWidth: 400,
        }}
      />

      <TextField
        label="Mobile number"
        variant="outlined"
        fullWidth
        sx={{
          marginBottom: 3,
          maxWidth: 400,
        }}
      />

      <Button
        variant="contained"
        sx={{
          backgroundColor: "#000",
          color: "#fff",
          padding: "10px 20px",
          fontWeight: "bold",
          maxWidth: 400,
          width: "100%",
          marginBottom: 2,
          "&:hover": {
            backgroundColor: "#333",
          },
        }}
      >
        NEXT
      </Button>
    </Box>
  );
};

export default SignupPage;
