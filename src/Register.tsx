import { memo } from "react";
import { Template } from "keycloakify/lib/components/Template";
import type { KcProps } from "keycloakify";
import { useKcMessage } from "keycloakify/lib/i18n/useKcMessage";
import type { KcContext } from "./kcContext";

type KcContext_Register = Extract<KcContext, { pageId: "register.ftl" }>;

export const Register = memo(
  ({ kcContext, ...props }: { kcContext: KcContext_Register } & KcProps) => {
    const {
      url,
      register,
      realm,
      passwordRequired,
      recaptchaRequired,
      recaptchaSiteKey,
    } = kcContext;

    const { msg, msgStr } = useKcMessage();

    console.log(`TODO: Do something with ${kcContext.authorizedMailDomains}`);

    return (
      <Template
        {...{ kcContext, ...props }}
        doFetchDefaultThemeResources={true}
        headerNode={msg("registerTitle")}
        formNode={
          <div className="fr-container">
            <form
              id="kc-register-form"
              action={url.registrationAction}
              method="post"
            >
              <div className="fr-input-group field">
                <label htmlFor="firstName" className="fr-label required">
                  {msg("firstName")}
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="fr-input"
                  name="firstName"
                  defaultValue={register.formData.firstName ?? ""}
                />
              </div>

              <div className="fr-input-group field">
                <label htmlFor="lastName" className="fr-label required">
                  {msg("lastName")}
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="fr-input"
                  name="lastName"
                  defaultValue={register.formData.lastName ?? ""}
                />
              </div>

              <div className="fr-input-group field">
                <label htmlFor="email" className="fr-label required">
                  {msg("email")}
                </label>
                <input
                  type="text"
                  id="email"
                  className="fr-input"
                  name="email"
                  defaultValue={register.formData.email ?? ""}
                />
              </div>

              {!realm.registrationEmailAsUsername && (
                <div className="fr-input-group field">
                  <label htmlFor="username" className="fr-label required">
                    {msg("username")}
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="fr-input"
                    name="username"
                    defaultValue={register.formData.username ?? ""}
                  />
                </div>
              )}

              {passwordRequired && (
                <>
                  <div className="fr-input-group field">
                    <label htmlFor="password" className="fr-label required">
                      {msg("password")}
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="fr-input"
                      name="password"
                      autoComplete="new-password"
                    />
                  </div>
                  <div className="fr-input-group field">
                    <label
                      htmlFor="password-confirm"
                      className="fr-label required"
                    >
                      {msg("passwordConfirm")}
                    </label>
                    <input
                      type="password"
                      id="password-confirm"
                      className="fr-input"
                      name="password-confirm"
                    />
                  </div>
                </>
              )}

              {recaptchaRequired && (
                <div className="form-group">
                  <div
                    className="g-recaptcha"
                    data-size="compact"
                    data-sitekey={recaptchaSiteKey}
                  ></div>
                </div>
              )}

              <label className="fr-label">
                <span>
                  <a href={url.loginUrl}>{msg("backToLogin")}</a>
                </span>
              </label>

              <div className="fr-grid-row fr-grid-row--center">
                <button type="submit" className="fr-btn">
                  {msgStr("doRegister")}
                </button>
              </div>
            </form>
          </div>
        }
      />
    );
  }
);
