(()=>{const paths = location.pathname.split("/")
const categoryName = paths[paths.length - 1]

const prods = document.querySelectorAll(".p-item")
let data = {}

prods.forEach((prod) => {
  const url = prod.querySelector("a").href;
  const name = prod.querySelector(".name").innerText;

  data[name] = url;
});


console.save(data, categoryName)})()