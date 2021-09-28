import { qs } from "./querySelectors";
import pollForTrue from "./pollForTrue";

export default () => {
  const revenue = () =>
    qs(".order-details-row span strong").innerText.replace("£", "");
  const revenueIsLoaded = () => typeof JSON.parse(`${revenue()}`) === "number";

  pollForTrue(revenueIsLoaded).then(() => {
    revenueTracking(revenue());
  });
};

const revenueTracking = (revenue) => {
  console.log("revenue: ", revenue);

  window._vis_opt_queue = window._vis_opt_queue || [];
  window._vis_opt_queue.push(function () {
    _vis_opt_revenue_conversion(revenue);
  });
};
