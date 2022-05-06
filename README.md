# keycloak-dsfr

This template has been made thanks to [keycloakify](https://github.com/InseeFrLab/keycloakify). It follows the french design system [Système de Design de l'État](https://www.systeme-de-design.gouv.fr/). You can find guideline [here](https://gouvfr.atlassian.net/wiki/spaces/DB/overview?homepageId=145359476).

:warning: Before digging into the code, please read [keycloakify documentation](https://www.keycloakify.dev/).

## Download the theme

The theme is generated from the CI build. You can find the latest version [here](https://github.com/SocialGouv/keycloak-dsfr/releases/latest/download/keycloak-theme.jar). Otherwise, you can download the theme manually from the [repository](https://github.com/SocialGouv/keycloak-dsfr/releases).

## Run code locally

Firstly, you have to clone the repository.

```sh
git clone https://github.com/SocialGouv/keycloak-dsfr.git # to clone the reposiroy
```

Secondly, you have to install dependencies.

```sh
yarn # to install dep
```

Then, inside `src/kcContext.ts`, you will find that file.

```tsx
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
  // mockPageId: "register.ftl",
  mockData: [
    {
      pageId: "register.ftl",
      authorizedMailDomains: ["*.gouv.fr"],
    },
  ],
});
```

You just have to uncomment `mockPageId`, Now you can run the code locally :

```sh
yarn start
```

If you want to override the default theme, you have to override `src/KcApp.tsx`, by adding your components in the `switch` statement.

```tsx
switch (kcContext.pageId) {
  case "login.ftl":
    return <Login {...{ kcContext, ...kcProps }} />;
  case "register.ftl":
    return <Register {...{ kcContext, ...kcProps }} />; // your component
  default:
    return <KcAppBase {...{ kcContext, ...kcProps }} />;
}
```

To build and generate the theme, you need to run `yarn keycloak`. You will find the build in the `./build_keycloak/target` folder. You also will find different way to test it in the output of the command.

## Add the theme to your keycloak instance

```yaml
value.yaml:
    extraInitContainers: |
        - name: realm-ext-provider
          image: curlimages/curl
          imagePullPolicy: IfNotPresent
          command:
            - sh
          args:
            - -c
            - curl -L -f -S -o /extensions/keycloak-dsfr-1.0.1.jar https://github.com/SocialGouv/keycloak-dsfr/releases/latest/download/keycloak-theme.jar
          volumeMounts:
            - name: extensions
              mountPath: /extensions

        extraVolumeMounts: |
            - name: extensions
              mountPath: /opt/keycloak/providers
    extraEnv: |
    - name: KEYCLOAK_USER
      value: admin
    - name: KEYCLOAK_PASSWORD
      value: xxxxxxxxx
    - name: JAVA_OPTS
      value: -Dkeycloak.profile=preview
```
