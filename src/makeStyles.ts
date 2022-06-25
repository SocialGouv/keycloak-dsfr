import { createMakeAndWithStyles } from "tss-react";

export const { makeStyles, useStyles } = createMakeAndWithStyles({
  useTheme: () => ({
    colors: {
      background: "#fff",
    },
  }),
});
