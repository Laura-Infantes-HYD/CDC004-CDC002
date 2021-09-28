export default (name, url, searchValue) => {
  const words = searchValue.split(" ");
  let matchingTextHighlightedName = name.toLowerCase();

  words.forEach((word) => {
    if (word.length < 2) return;

    matchingTextHighlightedName = matchingTextHighlightedName.replace(
      `${word}`,
      `<i>${word}</i>`
    );
  });

  return `<li class="HYD-search-dropdown-item"><a href=${url}>${matchingTextHighlightedName}</a></li>`;
};
