import { qsa } from "../../../../helpers/querySelectors";
import mutObs from "../../../../helpers/mutObs";
import calculateGrossPrice from "../../../../helpers/calculateGrossPrice";

export default () => {
  checkOutOverlayObserver();
  addGrossPriceParagraphs();
};

const checkOutOverlayObserver = () => {
  const overlayProductLists = qsa(
    ".checkout__dropdown--delivery ul, .checkout__dropdown--collection ul"
  );
  const config = { childList: true };

  overlayProductLists.forEach((list) => {
    mutObs(list, config, onOverlayItemAddition);
  });
};

const onOverlayItemAddition = () => {
  addGrossPriceParagraphs();
};

const addGrossPriceParagraphs = () => {
  const prices =
    qsa(`.checkout__dropdown--delivery ul .checkout__dropdown--item-quantity + span:not(.HYD-gross-sibling-checkout-added),
                        .checkout__dropdown--collection ul .checkout__dropdown--item-quantity + span:not(.HYD-gross-sibling-checkout-added)`);

  prices.forEach((price) => {
    const amount = +price.innerHTML.replace("£", "");
    const grossAmount = calculateGrossPrice(amount);
    const grossPriceP = `<div class="HYD-gross-price-checkout">£${grossAmount}<span> inc VAT</span></div>`;

    price.insertAdjacentHTML("beforebegin", grossPriceP);
    price.classList.add("HYD-gross-sibling-checkout-added");
  });
};
