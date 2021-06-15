import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Snackbar,
  Typography,
  Zoom,
} from "@material-ui/core";

import React, { useCallback, useEffect, useState } from "react";
import { IItem } from "../types";
import { list, vote as voteItem } from "../api/api-item";
import Loading from "../components/global/Loading";
import EmptyState from "../components/global/EmptyState";
import { Favorite, FavoriteBorder, Replay } from "@material-ui/icons";

/**
 * Home Component
 *
 */
const Home = () => {
  const [items, setItems] = useState<IItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [votedId, setVotedId] = useState("");
  const [voting, setVoting] = useState(false);
  const [message, setMessage] = React.useState("");

  const load = useCallback(() => {
    list()
      .then((res) => {
        setLoading(false);
        if (res.error) {
          setError(res.error);
        } else {
          setItems(res.data);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(typeof err === "string" ? err : "Could not load items");
      });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const vote = (id: string, unvote: boolean = false) => {
    setVoting(true);
    voteItem(id, unvote)
      .then((res) => {
        if (res.error) {
          setMessage("Could not vote for item! " + res.error);
        }
        setVoting(false);
        if (res.data.unvote === "true") {
          setVotedId("");
          localStorage.removeItem("voted");
          setMessage("Removed vote for item!");
        } else {
          setVotedId(res.data._id);
          localStorage.setItem("voted", res.data.item._id);
          setMessage("Voted for item!");
        }
      })
      .catch((err) => {
        setVoting(false);
        setMessage(
          typeof err === "string" ? err : "Error: Could not vote for item"
        );
      });
  };

  /**
   * Render JSX
   */
  if (loading) return <Loading />;
  if (error !== "") return <EmptyState message={error} action={load} />;
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        {items.length > 0 ? (
          items.map((item, i) => (
            <Grid
              item
              // sm={6}
              // xs={12}
              key={item._id ? item._id : item.link}
              style={{ width: 400 }}
            >
              <Zoom in={true} style={{ transitionDelay: `${(i + 1) * 200}ms` }}>
                <Card>
                  <CardMedia
                    component="iframe"
                    style={{ border: "none", overflow: "unset" }}
                    width="400"
                    height="400"
                    src={`https://editor.p5js.org/${item.username}/embed/${item.link}`}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h3" component="h3">
                      {item.author}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    {(localStorage.getItem("voted") &&
                      localStorage.getItem("voted") === item._id) ||
                    votedId === item._id ? (
                      <IconButton
                        onClick={() =>
                          vote(item._id ? item._id : item.link, true)
                        }
                        disabled={voting}
                        aria-label="Unvote this item"
                      >
                        <Favorite />
                      </IconButton>
                    ) : (
                      <IconButton
                        disabled={
                          voting || localStorage.getItem("voted") !== null
                        }
                        aria-label="Vote for this item"
                        onClick={() => vote(item._id ? item._id : item.link)}
                      >
                        <FavoriteBorder />
                      </IconButton>
                    )}
                  </CardActions>
                </Card>
              </Zoom>
            </Grid>
          ))
        ) : (
          <Grid item sm={12} xs={12}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h3" component="h3">
                  No Items Found
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="secondary"
                  endIcon={<Replay />}
                  onClick={load}
                >
                  Try Again
                </Button>
              </CardActions>
            </Card>
          </Grid>
        )}
      </Grid>

      <Snackbar
        open={message !== ""}
        autoHideDuration={6000}
        onClose={() => setMessage("")}
        message={message}
      ></Snackbar>
    </React.Fragment>
  );
};

export default Home;
