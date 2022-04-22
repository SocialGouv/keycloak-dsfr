import { getKcContext } from "keycloakify";

export const { kcContext } = getKcContext<
  | {
      pageId: "register.ftl";
      /**
       * Defined when you use the keycloak-mail-whitelisting keycloak plugin
       * (https://github.com/micedre/keycloak-mail-whitelisting)
       */
      authorizedMailDomains: string[];
    }
  | {
      pageId: "login.ftl";
    }
>({
  /* Uncomment to test outside of keycloak, ⚠️ don't forget to run 'yarn keycloak' at least once */
  mockPageId: "login.ftl",
  mockData: [
    {
      pageId: "register.ftl",
      authorizedMailDomains: ["*.gouv.fr"],
    },
  ],
});

export type KcContext = NonNullable<typeof kcContext>;
