import { useState, memo, Fragment } from "react";
import { useConstCallback } from "powerhooks/useConstCallback";
import type { FormEventHandler } from "react";
import { KcContextBase, KcProps, getMsg } from "keycloakify";
import { Template } from "./Template";

export const Login = memo(
  ({ kcContext, ...props }: { kcContext: KcContextBase.Login } & KcProps) => {
    const {
      social,
      realm,
      url,
      usernameEditDisabled,
      login,
      auth,
      registrationDisabled,
    } = kcContext;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const { msg, msgStr } = getMsg(kcContext);

    const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>(
      (e) => {
        e.preventDefault();

        setIsLoginButtonDisabled(true);

        const formElement = e.target as HTMLFormElement;

        //NOTE: Even if we login with email Keycloak expect username and password in
        //the POST request.
        formElement
          .querySelector("input[name='email']")
          ?.setAttribute("name", "username");

        formElement.submit();
      }
    );

    return (
      <Template
        {...{ kcContext, ...props }}
        doFetchDefaultThemeResources={true}
        displayInfo={social.displayInfo}
        displayWide={realm.password && social.providers !== undefined}
        headerNode={msg("doLogIn")}
        formNode={
          <div className="fr-container">
            {realm.password && (
              <form
                id="kc-form-login"
                onSubmit={onSubmit}
                action={url.loginAction}
                method="post"
              >
                <div className="fr-input-group field">
                  {(() => {
                    const label = !realm.loginWithEmailAllowed
                      ? "username"
                      : realm.registrationEmailAsUsername
                      ? "email"
                      : "usernameOrEmail";

                    const autoCompleteHelper: typeof label =
                      label === "usernameOrEmail" ? "username" : label;

                    return (
                      <>
                        <label
                          htmlFor={autoCompleteHelper}
                          className="fr-label required"
                        >
                          {msg(label)}
                        </label>
                        <input
                          tabIndex={1}
                          id={autoCompleteHelper}
                          //NOTE: This is used by Google Chrome auto fill so we use it to tell
                          //the browser how to pre fill the form but before submit we put it back
                          //to username because it is what keycloak expects.
                          name={autoCompleteHelper}
                          defaultValue={login.username ?? ""}
                          className="fr-input"
                          type="text"
                          {...(usernameEditDisabled
                            ? { disabled: true }
                            : {
                                autoFocus: true,
                                autoComplete: "off",
                              })}
                        />
                      </>
                    );
                  })()}
                </div>

                <div className="fr-input-group field">
                  <label htmlFor="password" className="fr-label required">
                    {msg("password")}
                  </label>
                  <input
                    tabIndex={2}
                    id="password"
                    className="fr-input"
                    name="password"
                    type="password"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <div id="kc-form-options">
                    {realm.rememberMe && !usernameEditDisabled && (
                      <div className="fr-checkbox-group">
                        <input
                          tabIndex={3}
                          id="rememberMe"
                          name="rememberMe"
                          type="checkbox"
                          {...(login.rememberMe
                            ? {
                                checked: true,
                              }
                            : {})}
                        />
                        <label className="fr-label" htmlFor="rememberMe">
                          {msg("rememberMe")}
                        </label>
                      </div>
                    )}
                  </div>
                  {realm.resetPasswordAllowed && (
                    <div className="fr-mt-3w">
                      <label className="fr-label">
                        <a tabIndex={5} href={url.loginResetCredentialsUrl}>
                          {msg("doForgotPassword")}
                        </a>
                      </label>
                    </div>
                  )}
                </div>
                <div id="kc-form-buttons" className="fr-input-group field">
                  <input
                    type="hidden"
                    id="id-hidden-input"
                    name="credentialId"
                    {...(auth?.selectedCredential !== undefined
                      ? {
                          value: auth.selectedCredential,
                        }
                      : {})}
                  />
                  <button
                    type="submit"
                    className="fr-btn fr-btn--lg"
                    disabled={isLoginButtonDisabled}
                  >
                    {msgStr("doLogIn")}
                  </button>
                </div>
              </form>
            )}

            {realm.password && social.providers !== undefined && (
              <div id="kc-social-providers" className="fr-mt-3w">
                <ul>
                  {social.providers.map((p) => (
                    <Fragment key={p.alias}>
                      {p.providerId === "franceconnect-particulier" ? (
                        <div
                          className="fr-connect-group"
                          key={p.providerId}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center",
                          }}
                        >
                          <button
                            className="fr-connect"
                            onClick={() => {
                              window.location.href = p.loginUrl;
                            }}
                            style={{ height: "inherit" }}
                          >
                            <span className="fr-connect__login">
                              S’identifier avec
                            </span>
                            <span className="fr-connect__brand">
                              FranceConnect
                            </span>
                          </button>
                          <p>
                            <a
                              href="https://franceconnect.gouv.fr/"
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Qu’est ce que FranceConnect ? - nouvelle fenêtre"
                            >
                              Qu’est ce que FranceConnect ?
                            </a>
                          </p>
                        </div>
                      ) : (
                        <li key={p.providerId}>
                          <a
                            href={p.loginUrl}
                            id={`zocial-${p.alias}`}
                            className="fr-btn fr-icon-checkbox-circle-line fr-btn--icon-right fr-btn--secondary"
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            <span>{p.displayName}</span>
                          </a>
                        </li>
                      )}
                    </Fragment>
                  ))}
                </ul>
              </div>
            )}
          </div>
        }
        infoNode={
          realm.password &&
          realm.registrationAllowed &&
          !registrationDisabled && (
            <div id="kc-registration">
              <span>
                {msg("noAccount")}
                <a tabIndex={6} href={url.registrationUrl}>
                  {msg("doRegister")}
                </a>
              </span>
            </div>
          )
        }
      />
    );
  }
);
