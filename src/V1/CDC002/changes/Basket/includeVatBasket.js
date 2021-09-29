import calculateGrossPrice from "../../../../helpers/calculateGrossPrice";
import mutObs from "../../../../helpers/mutObs";
import pollForTrue from "../../../../helpers/pollForTrue";
import { qsa, qs } from "../../../../helpers/querySelectors";

export default () => {
  addGrossPriceParagraphs();
  addTotalPriceObservers();
  checkoutContainerChangeObserver();
};

const addGrossPriceParagraphs = () => {
  const prices = qsa(`collect-quantity + h2:not(.HYD-gross-sibling-added), 
    deliver-quantity + h2:not(.HYD-gross-sibling-added),
    .details-total h2:not(.HYD-gross-sibling-added)`);

  prices.forEach((price) => {
    const priceIsLoaded = () => {
      return price.innerText.match(/[0-9]/g) !== null;
    };

    pollForTrue(priceIsLoaded).then(() => {
      addAfterPriceLoaded(price);
    });
  });
};

const addAfterPriceLoaded = (price) => {
  const amount = +price.innerText.replace("£", "");
  const grossAmount = calculateGrossPrice(amount);
  const isMobile = price.parentElement.classList.contains("img");
  const isTotal =
    !isMobile &&
    price.parentElement.parentElement.classList.contains("details-total");
  const grossPriceP = document.createElement("p");
  const elClass = isTotal ? "HYD-gross-price-total" : "HYD-gross-price-item";
  const innerHTML = isTotal
    ? `£${grossAmount}`
    : `£${grossAmount}<span>inc. VAT<span>`;

  price.classList.add("HYD-gross-sibling-added");

  const priceWrap = document.createElement("div");
  priceWrap.classList.add("HYD-price-wrap");

  grossPriceP.innerHTML = innerHTML;
  grossPriceP.classList.add(elClass);
  isMobile && grossPriceP.classList.add("hidden-md-up");

  if (!isTotal) {
    price.insertAdjacentElement("beforebegin", priceWrap);
    priceWrap.insertAdjacentElement("afterbegin", price);
    priceWrap.insertAdjacentElement("afterbegin", grossPriceP);
    return;
  }

  price.insertAdjacentElement("beforebegin", grossPriceP);
};

const addTotalPriceObservers = () => {
  const totalPrices = qsa(
    ".details-total h2:not(.HYD-total-price-observer-added)"
  );
  const config = { subtree: true, characterData: true };

  totalPrices.forEach((price) => {
    mutObs(price, config, (mutations) => {
      updateTotal(mutations);
      updateNonTotalPrices();
    });
    price.classList.add("HYD-total-price-observer-added");
  });
};

const updateTotal = (mutations) => {
  const grossPriceDiv = mutations[0].target.parentElement.previousSibling;
  const netTotalDivText = mutations[0].target.textContent;
  const netTotalAmount = +netTotalDivText.replace("£", "");
  const grossAmount = calculateGrossPrice(netTotalAmount);

  grossPriceDiv.innerHTML = `£${grossAmount}`;
};

const checkoutContainerChangeObserver = () => {
  let target = qs(".container.checkout-container");
  let config = { childList: true };

  mutObs(target, config, onCheckoutContainerMutation);
};

const onCheckoutContainerMutation = (mutations) => {
  addGrossPriceParagraphs();
  addTotalPriceObservers();
};
