import "@gouvfr/dsfr/dist/dsfr/dsfr.min.css";
import { kcContext } from "./kcContext";
import { KcApp } from "./KcApp";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

if( kcContext === undefined ){
  throw new Error("No kcContext");
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <KcApp kcContext={kcContext} />
    </StrictMode>
);