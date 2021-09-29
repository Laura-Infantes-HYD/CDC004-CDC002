import pollForEl from "../../../helpers/pollForEl";
import arrowControls from "./dropdown/arrowControls";
import removeDropdownOnblur from "./dropdown/removeDropdownOnblur";
import input from "./input/input";
import search from "./search/search";

export default () => {
  pollForEl(".search-input input").then(search);
  pollForEl(".input-group input").then(input);
  removeDropdownOnblur();
  pollForEl("product-search").then(arrowControls);
};
