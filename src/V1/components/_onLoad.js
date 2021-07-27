import pollForEl from '../../helpers/pollForEl';
import removeDropdownOnblur from './dropdown/removeDropdownOnblur';
import search from './search/search';

export default ()=>{
    pollForEl(".search-input input").then(search)
    removeDropdownOnblur()
}