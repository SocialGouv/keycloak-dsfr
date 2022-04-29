import { createMakeAndWithStyles } from "tss-react";

export const { makeStyles, useStyles } = createMakeAndWithStyles({
  useTheme: () => ({
    colors: {
      primary: "blue",
      textFocus: "red",
      label: "green",
      background: "white",
      textTertiary: "black",
    },
  }),
});
