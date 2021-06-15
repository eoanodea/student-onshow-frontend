/**
 * Primary dependencies
 */
import React from "react";

/**
 * Component Library imports
 */
import { AppBar, Button, Toolbar } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Link } from "react-router-dom";

/**
 * Header for the application
 */
const Header = () => {
  return (
    <React.Fragment>
      <AppBar position="sticky">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Link to="/">
            <img
              src={process.env.PUBLIC_URL + "/logo.png"}
              alt="Creative Computing Logo"
              width="100"
              style={{ padding: "10px" }}
            />
          </Link>
          {!localStorage.getItem("existing") && (
            <Button component={Link} to="/add" endIcon={<Add />}>
              Add
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
