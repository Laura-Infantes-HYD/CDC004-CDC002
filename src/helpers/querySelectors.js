export function qs(query, parent = document){
return parent.querySelector(query)
}

export function qsa(query, parent = document){
    return toArray(parent.querySelectorAll(query))
}

function toArray(nodeList){
    return [].slice.call(nodeList)
}