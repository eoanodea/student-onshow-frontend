/**
 * Primary dependencies
 */
import React from "react";

/**
 * Component Library imports
 */
import { AppBar, Button, IconButton, Toolbar } from "@material-ui/core";
import { Home } from "@material-ui/icons";
import { Link } from "react-router-dom";

/**
 * Header for the application
 */
const Header = () => {
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
