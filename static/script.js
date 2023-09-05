const myButton = document.getElementById('myButton')
myButton.addEventListener('click', onClickGetProducts)

async function getListProducts(ean) {
    let data = await getProducts(ean)
    console.log(data)
    const listProducts = []
    for(let i = 0; i < data.products.length; i++) {
        if(data.products[i].current_price != null) {
            listProducts.push([data.products[i].current_price.price, data.products[i].store.name])
        }
    }
    let byPrice = listProducts.slice(0);
    byPrice.sort(function(a, b) {  
        return a[0] - b[0];
    });
    const byPriceInfo = {list : byPrice, name : data.products[0].name}
    
    return byPriceInfo
}


async function onClickGetProducts() {
    let input = document.getElementById("input").value;
    let products = await getProducts(input);
    let listProducts = getListProducts(products);
    document.getElementById("name").innerHTML = listProducts.name;
    document.getElementById("results").innerHTML = listProducts.list.join("<br>");
}

//Create a dynamic dropdown menu
var ean = [
  "7030019532615",
  "7044610048543",
]

var select = document.getElementById("dropDown")
async function dynamicDropDown(ean) {
  for (const val of ean) {
    let test = await getListProducts(val);
    console.log(test);
    var option = document.createElement("option");
    option.value = val;
    option.text = val.charAt(0).toUpperCase() + val.slice(1);
    document.getElementById("dropdown")[val].option[val] = test.name;
    select.appendChild(option);
  }
}

dynamicDropDown(ean);
function createJson(){
    let input = document.getElementById("input2").value;
    getListProducts(input);
}

