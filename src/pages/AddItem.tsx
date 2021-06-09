import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  createStyles,
  TextField,
  Theme,
  Typography,
  withStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { IHistoryProps, IItem } from "../types";
import { create } from "../api/api-item";
import { ArrowBack, Check, Error } from "@material-ui/icons";
import EmptyState from "../components/global/EmptyState";

/**
 * Injected styles
 *
 * @param {int} spacing
 */
const styles = ({ spacing }: Theme) =>
  createStyles({
    wrapper: {
      padding: spacing(4),
    },
    error: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  });

type IProps = {
  classes: {
    wrapper: string;
    error: string;
  };
  history: IHistoryProps;
};

/**
 * CreateItem Component
 *
 * @param {History} history - the browser history object
 * @param {Theme} classes - classes passed from Material UI Theme
 */
const AddItem = ({ history, classes }: IProps) => {
  const [author, setAuthor] = useState("");
  const [authorError, setAuthorError] = useState("");

  const [link, setLink] = useState("");
  const [linkError, setLinkError] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Handle validation for form inputs
   */
  const handleValidation = () => {
    let passed = true;

    if (author.length < 5) {
      setAuthorError("Author must be at least 5 characters");
      passed = false;
    } else setAuthorError("");

    if (link.length < 5) {
      setLinkError("Link must be at least 5 characters");
      passed = false;
    } else setLinkError("");

    return passed;
  };

  /**
   * Check validation and then run the
   * item create network request
   *
   * On success, redirect to the home page
   */
  const submit = () => {
    if (handleValidation()) {
      setLoading(true);

      let username, portfolioLink;

      if (link.includes("iframe")) {
        const url = link.split(`src="`)[1].split(`">`)[0];
        const arr = url.split(".org/")[1].split("/embed/");

        username = arr[0];
        portfolioLink = arr[1];
      } else {
        const arr = link.split(".org/")[1].split("/");
        username = arr[0];
        portfolioLink = arr[2];
      }

      create({ author, username, link: portfolioLink }).then((data) => {
        if (!data || data.error) {
          setLoading(false);
          return setError(
            data && data.error ? data.error : "Could not create portfolio item"
          );
        }
        localStorage.setItem("existing", "true");
        history.push(`/`);
      });
    }
  };

  /**
   * Render JSX
   */
  if (localStorage.getItem("existing"))
    return <EmptyState message={"You have already added a portfolio item"} />;
  return (
    <React.Fragment>
      <Button component={Link} to="/" startIcon={<ArrowBack />}>
        Back
      </Button>
      <Card elevation={3} className={classes.wrapper}>
        <CardHeader author="Create Portfolio Item" />

        <CardContent>
          <TextField
            name="author"
            label="Author"
            autoFocus={true}
            margin="normal"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            error={authorError !== ""}
            helperText={authorError}
          />

          <TextField
            name="link"
            label="Link"
            margin="normal"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            error={linkError !== ""}
            helperText={linkError}
            multiline
          />
        </CardContent>
        <br />
        {error !== "" && (
          <Typography
            component="p"
            className={classes.error}
            color="error"
            style={{ textAlign: "center" }}
          >
            <Error color="error" />
            {error}
          </Typography>
        )}
        <CardActions>
          <Button
            color="secondary"
            variant="contained"
            onClick={submit}
            disabled={loading}
            endIcon={loading ? <CircularProgress size={18} /> : <Check />}
          >
            Create
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

export default withStyles(styles)(AddItem);
