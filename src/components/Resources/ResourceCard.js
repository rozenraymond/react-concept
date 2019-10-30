import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { red, blue } from "@material-ui/core/colors";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import Rating from "@material-ui/lab/Rating";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import ShareIcon from "@material-ui/icons/Share";
import LinkIcon from "@material-ui/icons/Link";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(theme => ({
  card: {
    width: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  highlight: {
    backgroundColor: blue[100],
    borderRadius: "3px",
    padding: "6px",
    margin: "3px 6px 3px 0"
  },
  mediaWrapper: {
    display: "flex"
  }
}));

export const ResourceCard = ({
  title,
  created,
  url,
  paid,
  media_type,
  tags
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const source = new URL(url).host;
  const createdYear = new Date(created).getFullYear();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" color="textSecondary">
          {title}
        </Typography>

        <Typography variant="body1" color="textSecondary" component="p">
          {source} | Last updated {createdYear}
        </Typography>

        <div className={classes.mediaWrapper}>
          <div className={classes.highlight}>{paid ? "Paid" : "Free"}</div>
          <div className={classes.highlight}>{media_type}</div>
        </div>

        <div>
          {tags.map(tag => {
            return <Chip label={tag.name} />;
          })}
        </div>

        <Typography variant="body1" color="textSecondary" component="p">
          Learning Notes:
        </Typography>

        <Typography variant="body1" color="textSecondary" component="p">
          Hangout Proposed:
        </Typography>

        <Typography variant="body1" color="textSecondary" component="p">
          Questions | Resolved
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <BookmarkIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="share">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <LinkIcon />
          </a>
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Rating
            name="customized-empty"
            value={2}
            precision={0.5}
            emptyIcon={<StarBorderIcon fontSize="inherit" />}
          />
          <TextareaAutosize
            aria-label="Review"
            rows={3}
            placeholder="Your review"
          />
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
        </CardContent>
      </Collapse>
    </Card>
  );
};
