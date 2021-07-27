export default (name, url, searchValue) => {
  let matchingTextHighlightedName = name
    .toLowerCase()
    .replace(
      searchValue,
      `<span class="HYD-matching-text">${searchValue}</span>`
    );

  return `<li class="HYD-search-dropdown-item"><a href=${url} >${matchingTextHighlightedName}</a></li>`;
};
