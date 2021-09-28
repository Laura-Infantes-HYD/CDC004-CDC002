import { qs, qsa } from "../../../../helpers/querySelectors";

export default () => {
  const inputs = qsa("nav-search product-search > div > input");
  const isFocusedClass = "HYD-search-focused";

  inputs.forEach((input) => {
    input.onfocus = () => {
      input.parentElement.classList.add(isFocusedClass);
    };
    input.onblur = () => {
      input.parentElement.classList.remove(isFocusedClass);
    };
  });
};
