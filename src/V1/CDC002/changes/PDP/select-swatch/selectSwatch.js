import pollForEl from "../../../../../helpers/pollForEl";
import { qs, qsa } from "../../../../../helpers/querySelectors";

/**
 * Even when the swatch is present on the page
 * a small FID may cause for our click on it not
 * to activate it, that is why a timer is needed
 * to click on it every 500ms until it is active.
 */

export default () => {
  pollForEl(".choose-size.locked").then(activateSwatch);
};

const activateSwatch = () => {
  let interval;
  let swathIsActive = () => !!qs(".colour__sample--swatch.selected");

  const activateSwatch = () => {
    const swatch = findPLPColourSelectedSwatch() || findSwatch();

    swatch.click();
  };

  interval = setInterval(() => {
    swathIsActive() ? clearInterval(interval) : activateSwatch();
  }, 500);
};

const findSwatch = () => {
  const colors = qsa(".colour__sample");
  let whites = [];

  for (let i = 0; i < colors.length; i++) {
    const color = colors[i];
    const name = qs("h6", color).innerText.toLowerCase();

    if (name === "white") {
      whites = [color];
      break;
    }
    if (name.includes("white")) {
      whites.push(color);
    }
    if (i > 7) break;
  }

  const finalColor = whites[0] || colors[0];

  return qs(".colour__sample--swatch", finalColor);
};

const findPLPColourSelectedSwatch = () => {
  if (!sessionStorage.PLPColourSelection) return null;

  const swatches = qsa(".colour__sample");
  let selectedSwatch;

  for (const swatch of swatches) {
    const name = swatch.querySelector("h6").innerText;
    if (name === sessionStorage.PLPColourSelection) {
      selectedSwatch = swatch.querySelector(".colour__sample--swatch");
      break;
    }
  }

  return selectedSwatch || null;
};
