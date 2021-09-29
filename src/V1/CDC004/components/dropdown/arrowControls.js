import { qs } from "../../../../helpers/querySelectors";

export default () => {
  addArrowControls();
};

const addArrowControls = () => {
  const wrap = qs("product-search");
  const input = qs("product-search input");

  wrap.addEventListener("keydown", (e) => {
    e.preventDefault();

    const elem = e.target.tagName;
    const atLink = elem === "A";
    const atInput = elem === "INPUT";

    switch (e.key) {
      case "ArrowUp":
        if (atInput) break;
        if (atLink) getAdjacentLink("prev")?.focus();
        break;

      case "ArrowDown":
        const firstItem = qs("a", wrap);
        if (atInput) firstItem.focus();
        if (atLink) getAdjacentLink("next")?.focus();
        break;

      case "Escape":
        input.focus();
        break;
    }
  });
};

const getAdjacentLink = (position) => {
  const currentA = document.activeElement;
  const currentLi = currentA.parentElement;
  const adjacent = () => {
    switch (position) {
      case "next":
        return currentLi.nextElementSibling?.firstElementChild;
      case "prev":
        return currentLi.previousElementSibling?.firstElementChild;
    }
  };

  return adjacent();
};
