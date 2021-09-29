import "./style.scss";
import pollForEl from "../helpers/pollForEl";
import initCDC004 from "../V1/CDC004";
import initCDC002 from "../V1/CDC002";

pollForEl("body").then(init);

function init() {
  initCDC002();
  initCDC004();
}
