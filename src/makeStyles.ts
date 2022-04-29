import { createMakeAndWithStyles } from "tss-react";

export const { makeStyles, useStyles } = createMakeAndWithStyles({
  useTheme: () => ({
    colors: {
      background: "#1b1b35",
    },
  }),
});
