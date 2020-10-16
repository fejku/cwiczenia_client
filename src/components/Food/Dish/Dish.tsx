import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import LinkIcon from "@material-ui/icons/Link";
import Potrawa from "../../../interfaces/Potrawa";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 345,
      height: "max-content",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    labels: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(0.5),
      },
    },
  }),
);

interface Props {
  potrawa: Potrawa;
}

const Dish: React.FC<Props> = ({ potrawa }) => {
  const classes = useStyles();

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        title={potrawa.nazwa}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
      />
      <CardMedia className={classes.media} image={potrawa.zdjecie ? potrawa.zdjecie : ""} />
      {potrawa.uwagi && (
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {potrawa.uwagi}
          </Typography>
        </CardContent>
      )}
      <CardContent className={classes.labels}>
        {potrawa.tagi.map((tag) => (
          <Chip key={tag._id} color="primary" size="small" label={tag.nazwa} onClick={handleClick} />
        ))}
      </CardContent>

      <CardActions>
        <LinkIcon />
      </CardActions>
    </Card>
  );
};

export default Dish;
