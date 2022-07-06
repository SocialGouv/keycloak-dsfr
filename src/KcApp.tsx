import { memo } from "react";
import type { KcContext } from "./kcContext";
import { KcApp as KcAppBase, defaultKcProps } from "keycloakify";
import { Login } from "./Login";
import { LogoutConfirm } from "./LogoutConfirm";
import { Register } from "./Register";
import { makeStyles } from "makeStyles";

export type Props = {
  kcContext: KcContext;
};

export const KcApp = memo((props: Props) => {
  const { kcContext } = props;

  const { classes } = useStyles();

  const kcProps = {
    ...defaultKcProps,
    kcHtmlClass: [...defaultKcProps.kcHtmlClass, classes.kcHtmlClass],
    kcLoginClass: [...defaultKcProps.kcLoginClass, classes.kcLoginClass],
    kcFormCardClass: [
      ...defaultKcProps.kcFormCardClass,
      classes.kcFormCardClass,
    ],
  };
  switch (kcContext.pageId) {
    case "login.ftl":
      return <Login {...{ kcContext, ...kcProps }} />;
    case "logout-confirm.ftl":
      return <LogoutConfirm {...{ kcContext, ...kcProps }} />;
    case "register.ftl":
      return <Register {...{ kcContext, ...kcProps }} />;
    default:
      return <KcAppBase {...{ kcContext, ...kcProps }} />;
  }
});

const useStyles = makeStyles({ name: { KcApp } })((theme) => ({
  kcLoginClass: {
    "& #kc-locale": {
      zIndex: 5,
    },
  },
  kcHtmlClass: {
    "& body": {
      background: theme.colors.background,
    },
    background: `${theme.colors.background}`,
    "& #kc-header-wrapper": {
      visibility: "hidden",
    },
    "& .alert": {
      background: "#fff",
      composes: "some-class",
    },
  },
  kcFormCardClass: {
    borderRadius: 10,
  },
}));
