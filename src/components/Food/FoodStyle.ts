import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: "100%",
      padding: theme.spacing(2),
    },
    dishes: {
      height: "100%",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(345px, 1fr))",
      justifyItems: "center",
      columnGap: theme.spacing(2),
    },
  }),
);
