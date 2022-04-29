import { memo } from "react";
import type { KcContext } from "./kcContext";
import { defaultKcProps } from "keycloakify";
import { Login } from "./Login";
import { Register } from "./Register";
import { KcApp as KcAppBase } from "keycloakify/lib/components/KcApp";
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
    kcButtonPrimaryClass: [
      ...defaultKcProps.kcButtonPrimaryClass,
      classes.kcButtonPrimaryClass,
    ],
    kcInputClass: [...defaultKcProps.kcInputClass, classes.kcInputClass],
  };

  switch (kcContext.pageId) {
    case "login.ftl":
      return <Login {...{ kcContext, ...defaultKcProps }} />;
    case "register.ftl":
      return <Register {...{ kcContext, ...defaultKcProps }} />;
    default:
      return <KcAppBase {...{ kcContext, ...defaultKcProps }} />;
  }
});

const useStyles = makeStyles({ name: { KcApp } })(theme => ({
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
    "& a": {
      color: `${theme.colors.textFocus}`,
    },
    "& #kc-current-locale-link": {
      color: `${theme.colors.label}`,
    },
    "& label": {
      fontSize: 14,
      color: theme.colors.label,
      fontWeight: "normal",
    },
    "& #kc-page-title": {
      color: theme.colors.primary,
    },
    "& #kc-header-wrapper": {
      visibility: "hidden",
    },
  },
  kcFormCardClass: {
    borderRadius: 10,
  },
  kcButtonPrimaryClass: {
    backgroundColor: "unset",
    backgroundImage: "unset",
    borderColor: `${theme.colors.textFocus}`,
    borderWidth: "2px",
    borderRadius: `20px`,
    color: `${theme.colors.textFocus}`,
    textTransform: "uppercase",
  },
  kcInputClass: {
    borderRadius: "unset",
    border: "unset",
    boxShadow: "unset",
    borderBottom: `1px solid ${theme.colors.textTertiary}`,
    "&:focus": {
      borderColor: "unset",
      borderBottom: `1px solid ${theme.colors.textFocus}`,
    },
  },
}));
