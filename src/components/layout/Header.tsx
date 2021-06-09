/**
 * Primary dependencies
 */
import React, { useEffect } from "react";

/**
 * Component Library imports
 */
import {
  AppBar,
  Button,
  IconButton,
  Snackbar,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Home } from "@material-ui/icons";
import { Link } from "react-router-dom";

/**
 * Header for the application
 */
const Header = () => {
  const [message, setMessage] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <React.Fragment>
      <AppBar position="sticky">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <IconButton aria-label="Home" component={Link} to="/">
            <Home />
          </IconButton>
          {!localStorage.getItem("existing") && (
            <Button component={Link} to="/add">
              Add
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
