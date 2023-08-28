const myButton = document.getElementById('myButton')
myButton.addEventListener('click', onClickGetProducts)

async function getProducts(product) {
    try {
        const search = 'https://kassal.app/api/v1/products/ean/' + product
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
    for(let product in data) {
        console.log(data.products[product])
        listProducts.push(data.products[product].name + ' ' + data.products[product].price)
    }
    return listProducts
}

async function onClickGetProducts() {
    let input = document.getElementById("input").value;
    let products = await getProducts(input);
    let listProducts = getListProducts(products);
    document.getElementById("output").innerHTML = listProducts.join('<br>');
}