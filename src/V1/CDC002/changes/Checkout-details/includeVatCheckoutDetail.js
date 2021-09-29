import calculateGrossPrice from "../../../../helpers/calculateGrossPrice";
import { qsa, qs } from "../../../../helpers/querySelectors";

export default () => {
  addGrossPriceDivs();
  addTotalGrossPriceDiv();
  changeUnitPricesToGross();
};

const extractPriceFromElement = (el) => +el.innerText.replace(/[^0-9.]+/g, "");

const addGrossPriceDivs = () => {
  const netPriceDivs = qsa(
    "div.click-collect-orders div.flex-row.ng-scope, div.delivery-orders div.flex-row.ng-scope"
  );

  netPriceDivs.forEach((netPriceDiv) => {
    insertGrossPriceSibling(netPriceDiv);
  });
};

const addTotalGrossPriceDiv = () => {
  const netPriceTotalDivs = qsa(
    ".click-collect-orders .order-details-row .vcenter span strong, .delivery-orders .order-details-row .vcenter span strong"
  );
  const netPriceTotalParents = qsa(
    ".click-collect-orders .order-details-row .vcenter span, .delivery-orders .order-details-row .vcenter span"
  );

  netPriceTotalDivs.forEach((netPriceTotalDiv) => {
    insertGrossPriceSibling(netPriceTotalDiv, "beforebegin");
  });

  netPriceTotalParents.forEach((netPriceTotalParent) => {
    netPriceTotalParent.innerHTML = netPriceTotalParent.innerHTML.replace(
      "ex",
      "inc"
    );
  });
};

const changeUnitPricesToGross = () => {
  const unitPricesSpans = qsa(
    ".click-collect-orders .order-details-row-qty > span, .delivery-orders .order-details-row-qty > span"
  );

  unitPricesSpans.forEach((priceSpan) => {
    const netPrice = extractPriceFromElement(priceSpan);
    const grossPrice = calculateGrossPrice(netPrice);
    priceSpan.innerText = `£${grossPrice}`;
  });
};

const insertGrossPriceSibling = (div, position = "afterbegin") => {
  const netPrice = extractPriceFromElement(div);
  const grossPrice = calculateGrossPrice(netPrice);
  const grossPriceDivHTML = `<div class="HYD-gross-price-co-detail">£${grossPrice}</div>`;

  div.insertAdjacentHTML(position, grossPriceDivHTML);
};
