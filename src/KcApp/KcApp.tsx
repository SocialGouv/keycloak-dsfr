import { memo } from "react";
import type { KcContext } from "./kcContext";
import { defaultKcProps as props } from "keycloakify";
import { Login } from "keycloakify/lib/components/Login";
import { Register } from "./Register";
import { Info } from "keycloakify/lib/components/Info";
import { Error } from "keycloakify/lib/components/Error";
import { Terms } from "./Terms";
import { MyExtraPage1 } from "./MyExtraPage1";
import { MyExtraPage2 } from "./MyExtraPage2";
import { KcApp as KcAppBase } from "keycloakify/lib/components/KcApp";
import "./kcMessagesExtension";

export const KcApp = memo(({ kcContext }: { kcContext: KcContext; }) => {
    switch (kcContext.pageId) {
        case "login.ftl": return <Login {...{ kcContext, ...props }} />;
        case "register.ftl": return <Register {...{ kcContext, ...props }} />;
        case "info.ftl": return <Info {...{ kcContext, ...props }} />;
        case "error.ftl": return <Error {...{ kcContext, ...props }} />;
        case "terms.ftl": return <Terms {...{ kcContext, ...props }} />;
        case "my-extra-page-1.ftl": return <MyExtraPage1 {...{ kcContext, ...props }} />;
        case "my-extra-page-2.ftl": return <MyExtraPage2 {...{ kcContext, ...props }} />;
        default: return <KcAppBase {...{ kcContext, ...props }} />;
    }
});