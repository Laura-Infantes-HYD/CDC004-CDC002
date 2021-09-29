import _onLoad from "./_onLoad";

export default function initCDC002() {
  const testName = "CDC002"; // add test name here
  const testAlreadyLoaded = document.body.classList.contains(testName);
  const errorMsg = "Test already loaded";

  if (testAlreadyLoaded) {
    console.warn(errorMsg);
    return;
  }

  document.body.classList.add(testName);

  _onLoad();
}
