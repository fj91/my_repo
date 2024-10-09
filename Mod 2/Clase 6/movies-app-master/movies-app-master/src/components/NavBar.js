import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import { SearchBar } from "./SearchBar";
import { Link } from "react-router-dom";
import { styled } from "@mui/material";
import { useWishList } from "../hooks/useWishList";

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

export function NavBar() {
  const { movies } = useWishList();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <StyledLink href="/">
            <Typography variant="h6" noWrap component="div">
              MUI
            </Typography>
          </StyledLink>
          <Box sx={{ flexGrow: 1 }}>
            <SearchBar />
          </Box>
          <Box>
            <StyledLink to="/pendientes">
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={movies.length} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
            </StyledLink>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
