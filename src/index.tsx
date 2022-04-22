import ReactDOM from "react-dom";
import "@gouvfr/dsfr/dist/dsfr/dsfr.min.css";
import { kcContext } from "./kcContext";
import { KcApp } from "./KcApp";

ReactDOM.render(
  kcContext === undefined ? <div /> : <KcApp kcContext={kcContext} />,
  document.getElementById("root")
);
