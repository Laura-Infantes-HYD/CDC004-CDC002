import buildDropdown from "./buildDropdown";

export default () => {
  window.addEventListener("click", ({ target }) => {
    const listItemsQueries =
      ".HYD-search-dropdown-item, .HYD-search-dropdown-item a";

    if (target.matches(listItemsQueries)) return;

    buildDropdown(); //no params: builds an empty wrap, removing previous list.
  });
};
