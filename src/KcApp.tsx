import { memo } from "react";
import type { KcContext } from "./kcContext";
import { defaultKcProps as props } from "keycloakify";
import { Login } from "./Login";
import { Register } from "./Register";
import { Info } from "keycloakify/lib/components/Info";
import { Error } from "keycloakify/lib/components/Error";
import { Terms } from "keycloakify/lib/components/Terms";
import { KcApp as KcAppBase } from "keycloakify/lib/components/KcApp";

export const KcApp = memo(({ kcContext }: { kcContext: KcContext }) => {
  switch (kcContext.pageId) {
    case "login.ftl":
      return <Login {...{ kcContext, ...props }} />;
    case "register.ftl":
      return <Register {...{ kcContext, ...props }} />;
    case "info.ftl":
      return <Info {...{ kcContext, ...props }} />;
    case "error.ftl":
      return <Error {...{ kcContext, ...props }} />;
    case "terms.ftl":
      return <Terms {...{ kcContext, ...props }} />;
    default:
      return <KcAppBase {...{ kcContext, ...props }} />;
  }
});
