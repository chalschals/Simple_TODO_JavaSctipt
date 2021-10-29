//selectors
const toodInput = document.querySelector("#todo-text");
const todoSubmitButton = document.querySelector(".todo-button");
const todoUL = document.querySelector(".todo-ul");

//functions
const readLocalStorage = () => {
  let todoList;
  if (localStorage.getItem("todo") === null) {
    todoList = [];
  } else {
    todoList = JSON.parse(localStorage.getItem("todo"));
  }
  return todoList;
};
const addIntoLocalStorage = (todo) => {
  const ExistingTodoList = readLocalStorage();
  const todoObj = new todoClass(todo, "incomplete");
  ExistingTodoList.push(todoObj);
  localStorage.setItem("todo", JSON.stringify(ExistingTodoList));
};

const deleteFromLocalStorage = (deleteValue) => {
  const existingTodoList = readLocalStorage();
  let filteredTodoList = existingTodoList.filter(
    (todo) => todo.todoName !== deleteValue
  );
  localStorage.setItem("todo", JSON.stringify(filteredTodoList));
};

const updateLocalStorage = (updateTodo) => {
  const availableTodoList = readLocalStorage();
  let updatedTodoList = [];
  availableTodoList.forEach((todo) => {
    if (todo.todoName === updateTodo) {
      if (todo.todoStatus === "completed") {
        todo.todoStatus = "incompleted";
      } else {
        todo.todoStatus = "completed";
      }
    }
    updatedTodoList.push(todo);
  });
  localStorage.setItem("todo", JSON.stringify(updatedTodoList));
};
const toggleStatus = (event) => {
  event.target.parentNode.classList.toggle("completed");
  updateLocalStorage(event.target.parentNode.childNodes[0].innerText);
};

const deleteTodo = (event) => {
  deleteFromLocalStorage(event.target.parentNode.childNodes[0].innerText);
  event.target.parentNode.classList.add("fall");
  event.target.parentNode.addEventListener("transitionend", () => {
    event.target.parentNode.remove();
  });
};

const createTodoList = (todoValue, todoStatus) => {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-div");
  if (todoStatus === "completed") {
    todoDiv.classList.add("completed");
  }

  const todoLi = document.createElement("li");
  todoLi.classList.add("todo");
  todoLi.innerText = todoValue;

  const todoCheck = document.createElement("button");
  todoCheck.classList.add("todo-check");
  todoCheck.innerHTML = `<i class="fas fa-check"></i>`;
  todoCheck.addEventListener("click", toggleStatus);

  const todoDelete = document.createElement("button");
  todoDelete.classList.add("todo-delete");
  todoDelete.innerHTML = `<i class="fas fa-trash"></i>`;
  todoDelete.addEventListener("click", deleteTodo);

  todoDiv.appendChild(todoLi);
  todoDiv.appendChild(todoCheck);
  todoDiv.appendChild(todoDelete);
  todoUL.appendChild(todoDiv);
};

const setTodoFromLocalStorage = () => {
  const initialTodoList = readLocalStorage();
  initialTodoList.forEach((todo) => {
    createTodoList(todo.todoName, todo.todoStatus);
  });
};

const addTodo = (event) => {
  event.preventDefault();
  const inputValue = toodInput.value;
  if (inputValue) {
    createTodoList(inputValue, "incompleted");
    toodInput.value = "";
    toodInput.focus();
    addIntoLocalStorage(inputValue);
  }
};

//event
todoSubmitButton.addEventListener("click", addTodo);
document.addEventListener("DOMContentLoaded", setTodoFromLocalStorage);
