import { qs, qsa } from "../../../../helpers/querySelectors";
import dropdownTemplate from "./templates/dropdownTemplate";

export default (items = {}, searchValue = "") => {
  //When no new matching items we allow current to remain
  if (Object.keys(items).length === 0 && searchValue) {
    removeHighlight();
    return;
  }

  addWarp();
  addList(items, searchValue);
};

const addWarp = () => {
  const currentWrap = qs(".HYD-search-dropdown-wrap");

  if (currentWrap) return;

  const parentElemMobile = qs(".dropdown-body");
  const parentElemDesktop = qs(".search-input");

  parentElemMobile.insertAdjacentElement("beforeend", createWrap("HYD-mobile"));
  parentElemDesktop.insertAdjacentElement(
    "beforeend",
    createWrap("HYD-desktop")
  );
};

const createWrap = (...args) => {
  let wrap = document.createElement("div");
  wrap.className = `HYD-search-dropdown-wrap ${args}`;

  wrap.addEventListener("blur", () => {
    console.log("wrap blurred");
  });

  return wrap;
};

const addList = (items, searchValue) => {
  const list = dropdownTemplate(items, searchValue);
  const wraps = qsa(".HYD-search-dropdown-wrap");

  wraps.forEach((wrap) => (wrap.innerHTML = list));
};

const removeHighlight = () => {
  qsa(".HYD-matching-text").forEach((searchResult) => {
    searchResult.classList.remove("HYD-matching-text");
  });
};
