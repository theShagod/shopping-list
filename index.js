
import {download} from "./download.js";



class StorageHandler {
    constructor (){
      if (window.localStorage.getItem('user') == null){ //if localstorage user item exists
        this.storage = {}
        window.localStorage.setItem("user", JSON.stringify(this.storage));
      } else {
        this.storage = JSON.parse(window.localStorage.getItem('user'));
      }
      this.updateListDisplay();

    }
    getUserItemPrice () { //gets item and price from html and confirms and adds it to local storage and to this object
      if (document.getElementById("inputItem").value == "" && document.getElementById("inputPrice").value == ""){
        //nothing
      } else if (document.getElementById("inputItem").value == "" || document.getElementById("inputPrice").value == ""){
        alert("Fields must be complete.")
      } else {
        var inputItem = document.getElementById("inputItem");
        var inputPrice = document.getElementById("inputPrice");
        this.confirmItemPrice(inputItem.value, inputPrice.value);
        this.updateListDisplay();
        inputItem.value = "";
        inputPrice.value = "";
      }
    }
    confirmItemPrice(item, price){ //confirms and then adds item price
      if (this.itemExists(item)){
        if(confirm(`Are you sure you want to change ${item} = ${this.storage[item]} to ${item} = ${price}`)){
          this.addItemPrice(item, price)
        }
      } else {
        this.addItemPrice(item, price)
      }
    }

    addItemPrice(item, price) { //adds time:price to localstorage and to this object
      this.storage[item] = price
      window.localStorage.setItem("user", JSON.stringify(this.storage));
    }

    itemExists (item) {
      if (this.storage[item] != undefined) {
        return true;
      }
      return false;
    }
    //
    deleteItem (item) {
      if (this.itemExists(item)){
        delete this.storage[item]
      } else {
        alert("Item not found.")
      }
      this.updateListDisplay();
    }
    updateListDisplay () {// refreshes list and returns new updated list display
      /*
      //Generates these elements:
      <div class = "item-price-set" id = "uniqueidhere">
        <li class = "ip-set-element">item 1</li>
        <li class = "ip-set-element">price 1</li>
        <li class = "ip-set-button"></li>
        <hr>
      </div>

      */
      var itemList = document.getElementById("new-items-div-sets");

      var itemSets = itemList.getElementsByClassName("item-price-set");


      for (let i = itemSets.length - 1; i >= 0; i--){ //deletes all items in the itemList
        console.log("itemSets[i]",itemSets[i])
        itemSets[i].remove();
      }


      for (var item in this.storage){
        let new_element = document.createElement("div");
        new_element.setAttribute("class", "item-price-set");
        new_element.setAttribute("id", `ip-element-${item}`);
        let new_element_item = document.createElement("li");
        let new_element_price = document.createElement("li");
        let new_element_button = document.createElement("li");
        new_element_item.setAttribute("class", "ip-set-element");
        new_element_price.setAttribute("class", "ip-set-element");
        new_element_button.setAttribute("class","ip-set-button");
        new_element_button.setAttribute("id", `ip-button-${item}`)

        new_element_button.addEventListener("click", function(){
          let item = new_element_button.id.match(/(?<=ip-button-).*/)[0];
          storage.deleteItem(item);
          window.localStorage.setItem("user", JSON.stringify(storage.storage))

        });

        console.log(new_element_item)
        new_element_item.innerText = item;
        new_element_price.innerText = this.storage[item];
        new_element.appendChild(new_element_item);
        new_element.appendChild(new_element_price);
        new_element.appendChild(new_element_button);
        new_element.appendChild(document.createElement("hr"));
        itemList.appendChild(new_element);

      }
      console.log(this.storage)
      if ("{}" == JSON.stringify(this.storage)){
        document.getElementById("helpmessage").innerText ="Press Enter to submit.";
      } else {
        document.getElementById("helpmessage").innerText ="";
      }
    }
    downloadData() {
      download("data.txt", JSON.stringify(this.storage))
    }
    clearStorage() { // clears the lcaol storage and of this object
      if(confirm("Are you sure you want to delete all your items?")){
        console.log("clearStorage runned.")
        this.storage = {}
        console.log(this.storage)
        window.localStorage.setItem("user", JSON.stringify({}));
        this.updateListDisplay();
      }

    }
}
//localstorage to save data
var haslocalStorage = typeof(Storage) !== "undefined"
console.log(`localStorage: ${haslocalStorage}`)
if (haslocalStorage) {
  // Code for localStorage/sessionStorage.
  //localStorage.setItem("lastname", "afsdfd");
  var storage = new StorageHandler;
} else {
  // Sorry! No Web Storage support..
  alert("localStorage is not supported, use updated Chrome!")
}








//////////////////////
/*

User Event Listeners: aka. user interaction with html

*/
//////////////////////

/*

User presses Enter

*/
//detect keyboard presses, in this case keyCode 13 means that it is detecting when user hits enter
document.addEventListener("keyup", function(){
if (event.key === "Enter") {
    storage.getUserItemPrice();
    document.getElementById("inputItem").focus();
    event.preventDefault(); //prevents the return of default
  }
  });

//both 120 and 124 line of code does the same thing (exluding the 2nd parameter)
document.getElementById("clearbutton").addEventListener("click", storage.clearStorage.bind(storage));
  //https://stackoverflow.com/questions/65294928/what-is-the-difference-between-putting-a-function-in-addeventlistener-vs-using-f
  //basically this if we do asdfasdfasdf.addEventListener("click", storage.clerStorage) instead, this will refer to the clearbutton instead


//links button with js
document.getElementById("downloadbutton").addEventListener("click", storage.downloadData.bind(storage));
