import _onLoad from "./components/_onLoad";

export default function initCDC004() {
  const testName = "CDC004";
  const testAlreadyLoaded = document.body.classList.contains(testName);
  const errorMsg = "Test already loaded";

  if (testAlreadyLoaded) {
    console.warn(errorMsg);
    return;
  }

  document.body.classList.add(testName);

  _onLoad();
}
