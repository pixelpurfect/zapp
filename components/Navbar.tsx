import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { styled } from '@mui/material/styles';
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1e293b", padding: "0 20px" }}>
      <Toolbar>
        {/* Logo/Brand Name */}
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            color: "#ffffff",
            cursor: "pointer",
          }}
        >
          MyBrand
        </Typography>

        {/* Notification Icon */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton sx={{ color: "#ffffff" }}>
            <Badge badgeContent={3} color="error">
              <NotificationsOutlinedIcon/>
            </Badge>
          </IconButton>

          {/* Cart Button */}
          <IconButton sx={{ color: "#ffffff" }}>
            <ShoppingCartIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
