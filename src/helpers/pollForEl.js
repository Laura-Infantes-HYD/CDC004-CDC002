/**
 * @param {query: string} - an elements selector
 * @param {timeOut: number} - time in ms after which the poller will stop looking for the element
 * @return {element: HTMLelement} - if eventually found, returns the element
 */

export default (query, timeOutMs = 15000) => {
  if (typeof query !== "string") new Error(`${query} is not a string`);

  return new Promise((resolve) => {
    let timeOutCount = 0;
    let interval = setInterval(() => (timeOutCount = timeOutCount + 100), 100);

    const wfelem = () => {
      if (timeOutCount > timeOutMs) {
        clearInterval(interval);
        return;
      }

      null != document.querySelector(query)
        ? resolve(document.querySelector(query))
        : window.requestAnimationFrame(wfelem);
    };

    wfelem();
  });
};
