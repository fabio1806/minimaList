//BUTTON MODEL
var addButton = document.getElementById("add");
var uncheckedButton = document.getElementById("uncheck");
var removeButton = document.getElementById("removeCompleted");

function mouseDown(event) {
  event.path[0].style.transform = "translate(0px, 1px)";
  event.path[0].style.boxShadow = "0px 0px";
}

function mouseUp(event) {
  event.path[0].style.transform = "translate(0px, -1px)";
  event.path[0].style.boxShadow = "0px 1px #796149";
};

//"ADD" BUTTON INTERACTIONS
addButton.onclick = getTodoText;
addButton.addEventListener("mousedown", event => mouseDown(event));
addButton.addEventListener("mouseup", event => mouseUp(event));

//"UNCHECK" BUTTON INTERACTIONS
uncheckedButton.onclick = uncheckAll;
uncheckedButton.addEventListener("mousedown", event => mouseDown(event));
uncheckedButton.addEventListener("mouseup", event => mouseUp(event));

//"REMOVE" BUTTON INTERACTIONS
removeButton.onclick = removeCompleted;
removeButton.addEventListener("mousedown", event => mouseDown(event));
removeButton.addEventListener("mouseup", event => mouseUp(event));

//Make all the list unchecked
function uncheckAll() {
  for(todo of list) {
    todo.completed = false;
  }

  updateDb();
  render();
}

//remove completed elements from list
function removeCompleted() {
  for (todo of list) {
    if(todo.completed)
      todo.show = false;
  }

  updateDb();
  render();
}

//ADD WHEN PRESS ENTER
document.getElementById("todo-input").addEventListener("keyup", function(event) {
    if (event.keyCode == 13) {
      document.getElementById("add").click()
    }
  })

//model for db document
let dbDoc = createDbDoc;
let list = [];

//SET TITLE AND NEW DOCUMENT
const titleInput = document.getElementById("title-input");
const inputContainer = document.getElementById("input-container");

titleInput.addEventListener("keyup", function(event){
  if(event.keyCode == 13){
    if(titleInput.value.trim() != ""){

      //REMOVE INPUT AND SUBSTITUTE WITH THE TITLE
      const title = document.createElement("h1");
      title.textContent = titleInput.value;
      //console.log(title.textContent);
      inputContainer.appendChild(title);

      titleInput.removeEventListener("keyup", function(event){});
      inputContainer.removeChild(inputContainer.children[0]);

      dbDoc = db.collection("list").doc(document.getElementsByTagName("h1")[0].textContent);

      console.log(dbDoc);
      dbDoc.onSnapshot(dbcallback);
    }
  }
});

function createDbDoc(docName){
  a = db.collection("list").doc(docName).set({rows: []});
  return a;
}

//UPDATE LOCAL LIST FROM DB
function dbcallback(doc){
  if(doc.data()){
    console.log("Read list...")
    list = doc.data().rows;
    render();
  }
  else {
    console.log("Create a new list...")
    db.collection("list").doc(document.getElementsByTagName("h1")[0].textContent).set({rows: []});
  }
};

//ADD ELEMENT TO LIST
function getTodoText() {
  const input = document.getElementById("todo-input");

  if (input.value.trim() != "") {
    list.push(
      {
        text: input.value,
        completed: false,
        show: true
      });
    input.value = "";

    console.log(list);
    updateDb();
    render();
  }
}

function updateDb(){
  dbDoc.update({rows: list});
};

function render(){
  const listContainer = document.getElementById("list-container");

  //remove old element at every render
  while (listContainer.lastChild) {
    listContainer.removeChild(listContainer.lastChild);
  }

  list.forEach(function(todo, index){
    if (todo.show)
      listContainer.appendChild(createRow(todo.text, todo.completed, index));
  });
};

//CREATE ELEMENT OF THE LIST-CONTAINER FROM LIST
function createRow(text, completed, index) {
  const row = document.createElement("div");
  row.classList.add("todo");

  if (completed) {
    row.classList.add("completed");
  }

  const label = document.createElement("label");
  row.appendChild(label);

  //create a checkbox
  const input = document.createElement("input");
  input.setAttribute("id", "check");
  input.setAttribute("type", "checkbox");
  if (completed) {
    input.setAttribute("checked", "true");
  }

  input.onclick = function() {
    row.classList.toggle("completed");
    list[index].completed = !list[index].completed;
    updateDb();
  }

  //add text from input
  const labelText = document.createTextNode(text);

  label.appendChild(input);
  label.appendChild(labelText);

  //return the row div
  return row;
};
