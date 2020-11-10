
var items_in_cart = 0;


var elemA = "";
var elemB = "";
var elemC = "";
var elemD = "";

/**initailize the cart item count to prevent loss data from refresh*/
if (localStorage.getItem("itemcount")==null) {
  var items_in_cart = 0;
} else {
  var items_in_cart = JSON.parse(localStorage.getItem("itemcount"));
}

if (localStorage.getItem("detailA")==null) {
  init();
}


/**initailize the detail item info*/
//var detail_item = "";




function Roll(index, name, count, price, txt, img) {
  this.index = index;
	this.name = name;
	this.count = count;
	this.price = price;
	this.txt = txt;
	this.image = img;

}

//render selected items in the detail page
function setA() {localStorage.setItem("detail", JSON.stringify(new Roll("A","Air-Fryer Bourbon Bacon Cinnamon Rolls", 0, 5, "----","img/rolls/Air-Fryer Bourbon Bacon Cinnamon Rolls.jpg")));}
function setB() {localStorage.setItem("detail", JSON.stringify(new Roll("B","Autumn Sweet Rolls with Cider Glaze",0, 5,"----","img/rolls/Autumn Sweet Rolls with Cider Glaze.jpg")));}
function setC() {localStorage.setItem("detail", JSON.stringify(new Roll("C","Cappuccino Cinnamon Rolls",0, 5,"----","img/rolls/Cappuccino Cinnamon Rolls.jpg")));}
function setD() {localStorage.setItem("detail", JSON.stringify(new Roll("D","Caramel-Pecan Cinnamon Rolls",0, 5,"----","img/rolls/Caramel-Pecan Cinnamon Rolls.jpg")));}


//check if key in the dictionary eg. detailA|B|C|D == null, then update or call add function in adding process
//render the added items in the cart
function addA() {localStorage.setItem("detailA", JSON.stringify(new Roll("A","Air-Fryer Bourbon Bacon Cinnamon Rolls", 0, 5, "----","img/rolls/Air-Fryer Bourbon Bacon Cinnamon Rolls.jpg")));}
function removeA() {localStorage.removeItem("detailA");} 
function addB() {localStorage.setItem("detailB", JSON.stringify(new Roll("B","Autumn Sweet Rolls with Cider Glaze",0, 5,"----","img/rolls/Autumn Sweet Rolls with Cider Glaze.jpg")));}
function removeB() {localStorage.removeItem("detailB");}
function addC() {localStorage.setItem("detailC", JSON.stringify(new Roll("C","Cappuccino Cinnamon Rolls",0, 5,"----","img/rolls/Cappuccino Cinnamon Rolls.jpg")));}
function removeC() {localStorage.removeItem("detailC");}
function addD() {localStorage.setItem("detailD", JSON.stringify(new Roll("D","Caramel-Pecan Cinnamon Rolls",0, 5,"----","img/rolls/Caramel-Pecan Cinnamon Rolls.jpg")));}
function removeD() {localStorage.removeItem("detailD");}

function retrieve(){
	test();
	console.log("onload triggered");
	var detail_item = JSON.parse(localStorage.getItem("detail"));
	document.getElementById("img").src = detail_item.image;
	document.getElementById("name").innerText = detail_item.name;
	
	document.getElementById("price").innerText = detail_item.price + " each";
	document.getElementById("txt").innerText = detail_item.txt;
}



function init() {
  addA();
  addB();
  addC();
  addD();
  
  
}

function test() {
  //test for total cart num display
	localStorage.setItem("itemcount", JSON.stringify(items_in_cart));
	items_in_cart = JSON.parse(localStorage.getItem("itemcount"));
	var elem = document.getElementById("cartnum");
  console.log("onload triggered");
  //update info displayed
  document.getElementById("cartnum").innerText = items_in_cart;
  //test for cart num display booleon
  if(items_in_cart <= 0) {
    elem.style.display = "none";
  } else {
    elem.style.display = "block";
  } 
}

function testCart() {
  test();
  //update info displayed

  //test for cart modules display booleon
  item_A = JSON.parse(localStorage.getItem("detailA"));
  item_B = JSON.parse(localStorage.getItem("detailB"));
  item_C = JSON.parse(localStorage.getItem("detailC"));
  item_D = JSON.parse(localStorage.getItem("detailD"));
  elemA = CartTemplate(document.getElementById("content"),item_A);
  elemB = CartTemplate(document.getElementById("content"),item_B);
  elemC = CartTemplate(document.getElementById("content"),item_C);
  elemD = CartTemplate(document.getElementById("content"),item_D);
  UpdateCartTemplate("A", item_A);
  UpdateCartTemplate("B", item_B);
  UpdateCartTemplate("C", item_C);
  UpdateCartTemplate("D", item_D);
  Total(item_A,item_B,item_C,item_D);
  if(item_A.count <= 0) {
    elemA.style.display = "none";
  } else {
    elemA.style.display = "block";
  }
  if(item_B.count <= 0) {
    elemB.style.display = "none";
  } else {
    elemB.style.display = "block";
  }
  if(item_C.count <= 0) {
    elemC.style.display = "none";
  } else {
    elemC.style.display = "block";
  }
  if(item_D.count <= 0) {
    elemD.style.display = "none";
  } else {
    elemD.style.display = "block";
  }   
  console.log("onload triggered");
}




function add_to_cart(ind) {
    items_in_cart = items_in_cart + 1;

    var item = "detail" + ind;
    var item_to_remove = JSON.parse(localStorage.getItem("detail"));
    item_to_remove.count = item_to_remove.count + 1;
    localStorage.setItem(item, JSON.stringify(loadItem));

    document.getElementById("cartnum").innerText = items_in_cart;
    test();
    console.log("add_triggered");
}

function add_to_cart_detail() {
    //get client side data
    var c = document.getElementById("count").value;
    //update the total count
    
    items_in_cart += parseInt(c);
    document.getElementById("cartnum").innerText = items_in_cart;


    //get the proper index to update from the detail_item stored in detail page
    var detail_item = JSON.parse(localStorage.getItem("detail"));
    var ind = detail_item.index;
    var item = "detail" + ind; //the item to update in dictionary
    console.log(item);
    //update the dict
    var loadItem = JSON.parse(localStorage.getItem(item));
    console.log(loadItem);
    loadItem.count = loadItem.count + parseInt(c);
    console.log(loadItem.count);
    console.log(loadItem);
    localStorage.setItem(item, JSON.stringify(loadItem));

    console.log("add detail triggered");
    test();
}

function remove_from_cart(ind) {
    items_in_cart = items_in_cart - 1;

    var item = "detail" + ind;
    var item_to_remove = JSON.parse(localStorage.getItem("detail"));
    item_to_remove.count = item_to_remove.count - 1;
    localStorage.setItem(item, JSON.stringify(loadItem));

    document.getElementById("cartnum").innerText = items_in_cart;

    test();
    console.log("remove_triggered");
}








function CartTemplate(parentEl, item) {
	//create template 
  //initialize info stored in dictionary 
  var itm = item;
  let div2 = document.createElement("div");
  div2.class = "row";
  div2.style.cssText = " grid-area: a; width: 100%; height: 40%;"
  parentEl.appendChild(div2);

  let div3 = document.createElement("div");
  div3.class = "column";
  div3.style.cssText = "float: left; width: 50%; clear: both; display: table";
  div2.appendChild(div3);

	let imgE = document.createElement("img");
  imgE.src = item.image;
  imgE.width = 200;
  imgE.id = "img" + item.index;
  div3.appendChild(imgE);

  let div4 = document.createElement("div");
  div4.class = "column";
  div4.style.cssText = "float: left; width: 50%; display: table";
  div2.appendChild(div4);

  let h3_1 = document.createElement("h3");
  h3_1.innerText = item.name;
  h3_1.id = "name" + item.index;
  div4.appendChild(h3_1);


  let h3_2 = document.createElement("h3");
  h3_2.innerText = "count : " + item.count;
  h3_2.id = "count" + item.index;
  div4.appendChild(h3_2);

  let btn_1 = document.createElement("button");
  btn_1.innerText = "+";
  btn_1.onclick =  function(itm) {
    items_in_cart = items_in_cart + 1;
    var ind = item.index;
    var item_name = "detail" + ind;
    var item_to_remove = JSON.parse(localStorage.getItem(item_name));
    item_to_remove.count = item_to_remove.count + 1;
    localStorage.setItem(item_name, JSON.stringify(item_to_remove));

    document.getElementById("cartnum").innerText = items_in_cart;
    testCart();
    location.reload();
    console.log("add_triggered");
  }
  div4.appendChild(btn_1);


  let btn_2 = document.createElement("button");
  btn_2.innerText = "-";
  btn_2.onclick = function(itm) {
    items_in_cart = items_in_cart - 1;
    var ind = item.index;
    var item_name = "detail" + ind;
    var item_to_remove = JSON.parse(localStorage.getItem(item_name));
    item_to_remove.count = item_to_remove.count - 1;
    localStorage.setItem(item_name, JSON.stringify(item_to_remove));

    document.getElementById("cartnum").innerText = items_in_cart;

    testCart();
    location.reload();
    console.log("remove_triggered");
  }
  div4.appendChild(btn_2);


  let h3_3 = document.createElement("h3");
  h3_3.innerText = "price : $" + item.price;
  h3_3.id = "price" + item.index;
  div4.appendChild(h3_3);

  let h3_4 = document.createElement("h3");
  h3_4.innerText = item.txt;
  h3_4.id = "txt" + item.index;
  div4.appendChild(h3_4);


 	return div2;
}

function UpdateCartTemplate(index, item) {
  //create template 
  //initialize info stored in dictionary 

  imgID = "img" + item.index;
  let imgE = document.getElementById(imgID)
  imgE.src = item.image;

  
  h3_1ID = "name" + item.index;
  let h3_1 = document.createElement(h3_1ID);
  h3_1.innerText = item.name;

  h3_2ID = "count" + item.index;
  let h3_2 = document.createElement(h3_2ID);
  h3_2.innerText = "count : " + item.count;

  h3_3ID = "price" + item.index;
  let h3_3 = document.createElement(h3_3ID);
  h3_3.innerText = "price : $" + item.price;

  h3_4ID = "txt" + item.index;
  let h3_4 = document.createElement(h3_4ID);
  h3_4.innerText = item.txt;
}

function Total(a,b,c,d) {
  var total = a.count * a.price + b.count * b.price + c.count * c.price + d.count * d.price;
  let totalTxt = document.getElementById("total");
  totalTxt.innerText = "Total Price :" + "$" + total;

}



