import mutObs from "../../../../../helpers/mutObs";
import { qs } from "../../../../../helpers/querySelectors";

export default () => {
  modifyVATcopy();
  grossPriceObserver(onMutation);
};

/**
 * Modifying the innerHTML of '.product__detail--gross-price' breaks the angular binding,
 * causing the gross price not to update on quantity changes. A new sibling p will replace
 * this element while the first is hidden via css. The mutation observer will bind both paragraphs,
 * updating the newly added one when the hidden one changes.
 *
 */

const newGrossPriceP = (price) =>
  `<p class="product__detail--gross-price HYD-gross-price">${newGrossPricePInner(
    price
  )}</p>`;

const newGrossPricePInner = (price) => `${price} ${span(" inc VAT")}`;

const span = (text) => `<span>${text}</span>`;

const getGrossPrice = (gross) => gross.innerText.replace("inc VAT", "");

const modifyVATcopy = () => {
  const netDiv = qs(".product__detail--net-price");
  const grossDiv = qs(".product__detail--gross-price");
  const grossPrice = getGrossPrice(grossDiv);

  netDiv.insertAdjacentHTML("beforeend", span(" ex VAT"));
  grossDiv.insertAdjacentHTML("afterend", newGrossPriceP(grossPrice));
};

const grossPriceObserver = (cb) => {
  const target = qs(".product__detail--gross-price"),
    config = { subtree: true, characterData: true };

  mutObs(target, config, cb);
};

const onMutation = () => {
  const grossDiv = qs(".product__detail--gross-price.ng-binding");
  const grossPrice = getGrossPrice(grossDiv);
  const newGrossP = qs(".HYD-gross-price");

  newGrossP.innerHTML = newGrossPricePInner(grossPrice);
};
