const todoInput = document.querySelector('.todo__input'),
      todoBtn = document.querySelector('.todo__btn'),
      todoList = document.querySelector('.todo__list'),
      filterOptions = document.querySelector('.filter-todos'),
      deleteTodos = document.querySelector('.delete-todos');

// listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOptions.addEventListener('click', filterTodos);
deleteTodos.addEventListener('click', deleteAllTodos);

// functions
function addTodo(e){
  e.preventDefault();
  // console.log('clicked')

  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  
  const todoItem = document.createElement('li');
  todoItem.classList.add('todo__item');
  todoItem.innerText = todoInput.value;
  saveLocalTodos(todoInput.value);
  todoInput.value = '';
  todoDiv.appendChild(todoItem);

  const completedBtn = document.createElement('button');
  completedBtn.classList.add('completed__btn');
  completedBtn.innerHTML = '<i class="uil uil-check"></i>'
  todoDiv.appendChild(completedBtn);

  const trashBtn = document.createElement('button');
  trashBtn.classList.add('trash__btn');
  trashBtn.innerHTML = '<i class="uil uil-trash"></i>'
  todoDiv.appendChild(trashBtn);

  todoList.appendChild(todoDiv);
}

function deleteCheck(e){
  let item = e.target;
  let itemParent = item.parentNode;
  // console.log(item); view elements
  
  if(item.classList.contains('completed__btn')){
    itemParent.classList.toggle('completed');
  }
  if(item.classList.contains('trash__btn')){
    removeLocalTodos(itemParent);
    itemParent.remove();
  }
}

function filterTodos(e){
  // let todos = document.querySelectorAll('.todo');
  let todos = todoList.childNodes;

  todos.forEach(todo => {
    switch(e.target.value){
      case 'all':
        todo.style.display = 'flex'
        break;
      case 'completed':
        if(todo.classList.contains('completed')){
          todo.style.display = 'flex'
        } else{
          todo.style.display = 'none'
        }
        break;
      case 'uncompleted':
        if(!todo.classList.contains('completed')){
          todo.style.display = 'flex'
        } else{
          todo.style.display = 'none'
        }
        break;
    }
  })
}

function saveLocalTodos(todo){
  let todos;
  // json strings doesn't take undefined values
  if(localStorage.getItem('todos') === null){
    todos = []; // br mha m shin yin
  } else{
    todos = JSON.parse(localStorage.getItem('todos'));
    // shi kae yin json string ko obj change
  }

  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
  // convert obj to string
}

function removeLocalTodos(todo){
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  } else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  let innerText = todo.children[0].innerText;
  // console.log(innerText);
  // console.log(todos.indexOf(innerText)); // todos = []
  todos.splice(todos.indexOf(innerText), 1); 
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(todo){
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  } else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  // todos referring to line 117 todos
  todos.forEach(todo => {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo__item');
    todoItem.innerText = todo; // *
    // saveLocalTodos(todoInput.value); // to prevent being doubled
    // todoInput.value = ''; 
    todoDiv.appendChild(todoItem);
  
    const completedBtn = document.createElement('button');
    completedBtn.classList.add('completed__btn');
    completedBtn.innerHTML = '<i class="uil uil-check"></i>'
    todoDiv.appendChild(completedBtn);
  
    const trashBtn = document.createElement('button');
    trashBtn.classList.add('trash__btn');
    trashBtn.innerHTML = '<i class="uil uil-trash"></i>'
    todoDiv.appendChild(trashBtn);
  
    todoList.appendChild(todoDiv);
  })
}

function deleteAllTodos(){
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  } else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.splice(0, todos.length)
  localStorage.setItem('todos', JSON.stringify(todos));

  const items = document.querySelectorAll('.todo');
  items.forEach(n => n.remove());
}