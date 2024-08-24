import React from "react";
import { Box, Typography, Container, Grid, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#1a202c",
        color: "white",
        padding: "2rem 0",
        mt: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              My Blog APP
            </Typography>
            <Typography variant="body2">
              Your one-stop solution for all your blogging needs. Stay connected with us through our social media channels.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Follow Us
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <IconButton color="inherit" href="https://facebook.com">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" href="https://twitter.com">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" href="https://instagram.com">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" href="https://linkedin.com">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          color="inherit"
          align="center"
          sx={{ mt: 4 }}
        >
          &copy; {new Date().getFullYear()} My Blog APP. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
