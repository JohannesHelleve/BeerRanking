
async function getData() {
  const response = await fetch("http://localhost:1000/data");

  const data = await response.json();

  return data;
}

getData();

//create a dynamic dropdown menu from database
const select = document.getElementById("dropDown");
async function createDropDown() {
const response = await fetch("http://localhost:1000/data");

  const data = await response.json();

  for (let i = 0; i < data.length; i++) {
    const option = document.createElement("option");
    option.text = data[i].name;
    select.add(option);
  }
  return data;
}

createDropDown();

select.addEventListener("change",async function() {
  const selectedOption = this.selectedIndex;
  const totProducts =  await getData();
  for(const product of totProducts) {
    if(product._id == selectedOption){
      document.getElementById("name").innerHTML = product.name;
      document.getElementById("list").innerHTML = product.list.join("<br>"); 
      //legge til nærmeste butikk??
    }
  }
});

