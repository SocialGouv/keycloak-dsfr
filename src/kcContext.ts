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
      social: {
        displayInfo: boolean;
        providers?:
          | {
              loginUrl: string;
              alias: string;
              providerId: string;
              displayName: string;
            }[]
          | undefined;
      };
    }
>({
  /* Uncomment to test outside of keycloak, ⚠️ don't forget to run 'yarn keycloak' at least once */
  //mockPageId: "login.ftl",
  mockData: [
    {
      pageId: "register.ftl",
      authorizedMailDomains: ["*.gouv.fr"],
    },
    {
      pageId: "login.ftl",
      social: {
        displayInfo: true,
        providers: [
          {
            loginUrl: "string",
            alias: "franceconnect-particulier",
            providerId: "franceconnect-particulier",
            displayName: "France Connect",
          },
        ],
      },
    },
  ],
});

export type KcContext = NonNullable<typeof kcContext>;
