import React from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

const OtpVerificationPage: React.FC = () => {
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
        OTP VERIFICATION
      </Typography>
      <Typography
        variant="body1"
        sx={{
          marginBottom: 4,
          textAlign: "center",
          color: "#555",
        }}
      >
        Enter the One Time Passcode you received in <br /> +91 XXXXXXXX411
      </Typography>

      <TextField
        label="Enter OTP"
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
        SUBMIT
      </Button>

      <Button
        variant="text"
        sx={{
          textTransform: "none",
          color: "#007BFF",
          fontWeight: "bold",
          fontSize: "0.9rem",
          marginTop: 2,
          "&:hover": {
            textDecoration: "underline",
          },
        }}
      >
        Resend OTP
      </Button>
    </Box>
  );
};

export default OtpVerificationPage;
