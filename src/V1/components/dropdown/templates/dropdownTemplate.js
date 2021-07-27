import itemTemplate from "./itemTemplate"

export default (items, searchValue)=>{

    const buildList = (items)=>{return `<ul class="HYD-search-dropdown-list">${items}</ul>`}
    let listItems = ""

    for (const item in items) {
        let name = item;
        let url = items[item]

        listItems+= itemTemplate(name, url, searchValue)
    }

    return buildList(listItems)
}