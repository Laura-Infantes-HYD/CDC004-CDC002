import { qs } from "../../../../../helpers/querySelectors";

export default () => {
  const button = qs(".btn-delivery");
  const headerHTML =
    '<div class="HYD-shipping-button__header">Free shipping on orders over £50</div>';

  button.insertAdjacentHTML("beforebegin", headerHTML);
};
