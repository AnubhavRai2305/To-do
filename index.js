let taskInput = document.getElementById('taskInput')
let addBtn = document.getElementById('addBtn')
let taskList = document.getElementById('taskList')
let key = "tasks"


let tasks = JSON.parse(localStorage.getItem(key)) || []

let saveTasks = () =>
  localStorage.setItem(key, JSON.stringify(tasks))


let renderTasks = () => {
  taskList.innerHTML = ""
    if(tasks.length === 0){ 
        empty.hidden = false
        count.textContent = '0 tasks' 
        return }
    empty.hidden = true

  tasks.forEach((task, index) => {
    let li = document.createElement("li")
    li.className = 'task'
    if (task.completed){ 
        li.classList.add("completed")
    }

    let left = document.createElement('div')
    left.className='left'


    let checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.checked = task.completed
    checkbox.onclick = () => toggleComplete(index)

    let label = document.createElement("label")
    label.className = "task-text"
    label.textContent = task.text


    left.appendChild(checkbox)
    left.appendChild(label)
    let btns = document.createElement('div')
    btns.className = 'btns'

    let delBtn = document.createElement("button")
    delBtn.textContent = "Delete"
    delBtn.className = "btn del"
    delBtn.innerHTML='Delete'
    delBtn.onclick = () => deleteTask(index)

    btns.appendChild(delBtn)
    li.appendChild(left)
    li.appendChild(btns)
    taskList.appendChild(li)
  })

    let remaining = tasks.filter(t=>!t.completed).length;
    count.textContent = `${remaining} remaining • ${tasks.length} total`

}



let addTask = () => {
  let text = taskInput.value.trim()
  if (!text){
    return alert("You have still not entered any task")
  }
  tasks.push({ text, completed: false })
  saveTasks()
  renderTasks()
  taskInput.value = ""
}

addBtn.onclick = addTask



let deleteTask = (index) => {
  tasks.splice(index, 1)
  saveTasks()
  renderTasks()
}


let toggleComplete = (index) => {
  tasks[index].completed = !tasks[index].completed
  saveTasks()
  renderTasks()
}


renderTasks()