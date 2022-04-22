import ReactDOM from "react-dom";
import "@gouvfr/dsfr/dist/dsfr/dsfr.min.css";
import { App } from "./App";
import { kcContext } from "./KcApp/kcContext";
import { KcApp } from "./KcApp";

ReactDOM.render(
  kcContext === undefined ? <App /> : <KcApp kcContext={kcContext} />,
  document.getElementById("root")
);
