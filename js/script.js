const todoInput = document.querySelector('.todo__input'),
      todoBtn = document.querySelector('.todo__btn'),
      todoList = document.querySelector('.todo__list');

// listeners
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);


// functions
function addTodo(e){
  e.preventDefault();
  // console.log('clicked')

  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  
  const todoItem = document.createElement('li');
  todoItem.classList.add('todo__item');
  todoItem.innerText = todoInput.value;
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
  console.log(itemParent)
  if(itemParent.classList.contains('completed-btn')){
    console.log('clicked')
    // itemParent.classList.add('fall');
  }
}