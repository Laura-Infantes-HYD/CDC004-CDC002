import { qs, qsa } from "../../../../helpers/querySelectors";
import products from "../../../../../matrix/prods-list.json";
import buildDropdown from "../dropdown/buildDropdown";

export default () => {
  addEventsToSearchBar();
};

const addEventsToSearchBar = () => {
  const inputs = qsa("nav-search product-search > div > input");

  inputs.forEach(
    (input) =>
      (input.onkeyup = (e) => {
        onChange(e);
      })
  );
};

const onChange = ({ target: { value } }) => {
  value = value.trim();
  const casedValue = value.toUpperCase().trim();
  const moreThanOneWord = casedValue.includes(" ");
  let matchingItems = findMatchingItems(value);
  const underFiveMatches = Object.keys(matchingItems).length < 5;

  //ensures an empty dropdown is built if no values
  if (value.length === 0) {
    buildDropdown();
    return;
  }

  if (value.length < 2) return;

  if (underFiveMatches && moreThanOneWord)
    matchingItems = findMatchingItemsByEachWord(value);

  buildDropdown(matchingItems, value);
};

const findMatchingItemsByEachWord = (value) => {
  const words = value.split(" ");
  let multipleWordMatches = {};
  let matchingItems = {};

  words.forEach((word) => {
    if (word.length < 2) return;

    const currentWordMatches = findMatchingItems(word);

    for (let match in currentWordMatches) {
      if (matchingItems[match])
        multipleWordMatches[match] = currentWordMatches[match];

      matchingItems[match] = currentWordMatches[match];
    }
  });

  return Object.keys(multipleWordMatches).length > 10
    ? multipleWordMatches
    : { ...multipleWordMatches, ...matchingItems };
};

const findMatchingItems = (value) => {
  let exactMatch = {}; //Beginning of item name matches search value.
  let closeMatch = {}; // Item name contains search value.

  for (let name in products) {
    const casedName = name.toLocaleLowerCase();
    value = value.toLocaleLowerCase();

    const match = casedName.slice(0, value.length) === value;
    const includesMatch = casedName.indexOf(value) > -1;

    if (match) {
      exactMatch[casedName] = products[name];
    }
    if (includesMatch) {
      closeMatch[casedName] = products[name];
    }
  }

  let overTenExactMatches = Object.keys(exactMatch).length > 10;

  return overTenExactMatches ? exactMatch : { ...exactMatch, ...closeMatch };
};
