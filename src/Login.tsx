import { useState, memo } from "react";
import { useConstCallback } from "powerhooks/useConstCallback";
import type { FormEventHandler } from "react";
import { KcContextBase, KcProps, useKcMessage, Template } from "keycloakify";
import { useCssAndCx } from "tss-react";
// import { Template } from "./Template";

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

    const { msg, msgStr } = useKcMessage();

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const { cx } = useCssAndCx();

    const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>(e => {
      e.preventDefault();

      setIsLoginButtonDisabled(true);

      const formElement = e.target as HTMLFormElement;

      //NOTE: Even if we login with email Keycloak expect username and password in
      //the POST request.
      formElement
        .querySelector("input[name='email']")
        ?.setAttribute("name", "username");

      formElement.submit();
    });

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
                    className="fr-btn"
                    disabled={isLoginButtonDisabled}
                  >
                    {msgStr("doLogIn")}
                  </button>
                </div>
              </form>
            )}

            {realm.password && social.providers !== undefined && (
              <div
                id="kc-social-providers"
                className={cx(
                  props.kcFormSocialAccountContentClass,
                  props.kcFormSocialAccountClass
                )}
              >
                <ul
                  className={cx(
                    props.kcFormSocialAccountListClass,
                    social.providers.length > 4 &&
                      props.kcFormSocialAccountDoubleListClass
                  )}
                >
                  {social.providers.map(p => (
                    <li
                      key={p.providerId}
                      className={cx(props.kcFormSocialAccountListLinkClass)}
                    >
                      <a
                        href={p.loginUrl}
                        id={`zocial-${p.alias}`}
                        className={cx("zocial", p.providerId)}
                      >
                        <span>{p.displayName}</span>
                      </a>
                    </li>
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
