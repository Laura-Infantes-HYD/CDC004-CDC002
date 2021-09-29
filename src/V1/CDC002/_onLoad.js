import pollForEl from "../../helpers/pollForEl";
import selectSwatch from "./changes/PDP/select-swatch/selectSwatch";
import includeVatPDP from "./changes/PDP/include-vat-price/includeVatPDP";
import addShippingButtonHeader from "./changes/PDP/shipping-button/addShippingButtonHeader";
import includeVatBasket from "./changes/Basket/includeVatBasket";
import includeVatCheckoutOverlay from "./changes/checkout-overlay/includeVatCheckoutOverlay";
import includeVatCheckoutDetail from "./changes/Checkout-details/includeVatCheckoutDetail";

export default () => {
  //PLP changes achieved via CSS
  pollForEl(".checkout__dropdown--collection ul").then(
    includeVatCheckoutOverlay
  ); //main header, site wide change
  pollForEl("page .product-detail").then(PDPchanges);
  pollForEl(
    "page > .checkout-container + .checkout-container + .checkout-container:not(.checkout-details-container)"
  ).then(BasketChanges);
  pollForEl(".checkout-container.checkout-details-container").then(
    checkoutDetailChanges
  );
};

const PDPchanges = () => {
  pollForEl(".colour__sample--swatch").then(selectSwatch);
  pollForEl(".product__detail--gross-price").then(includeVatPDP);
  pollForEl(".btn-delivery").then(addShippingButtonHeader);
};

const BasketChanges = () => {
  pollForEl(".details-total h2").then(includeVatBasket);
};

const checkoutDetailChanges = () => {
  pollForEl("div.flex-row.ng-scope").then(includeVatCheckoutDetail);
};
