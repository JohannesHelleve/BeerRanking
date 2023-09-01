const myButton = document.getElementById('myButton')
myButton.addEventListener('click', onClickGetProducts)

//Hansa EAN: 7030019532615

async function getProducts(product) {
    try {
        const search = 'https://kassal.app/api/v1/products/ean/'+ product 
        const response = await fetch(search, {
            headers: {
                Authorization: 'Bearer Xeii429PZ59IwlikFPzMDxQbI8sYzSjq4J5PiqHp'
            }
        })
        if (response.ok) {
            const object = await response.json()
            console.log(object)
            return object.data
        } else {
            throw new Error('Response not ok')
        }
    } catch (error) {
        console.log(error)
    }  
}

function getListProducts(data) {
    const listProducts = []
    for(let i = 0; i < data.products.length; i++) {
        console.log(data.products[i].current_price)
        console.log(data.products[i].name)
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
var values = ["dog", "cat", "parrot", "rabbit"];

var select = document.getElementById("dropDown")
console.log(select)

for (const val of values) {
  var option = document.createElement("option");
  option.value = val;
  option.text = val.charAt(0).toUpperCase() + val.slice(1);
  select.appendChild(option);
}

document.getElementById("dropDown").appendChild(label).appendChild(select);

function createJson(){
    
}

//get code from mongodb