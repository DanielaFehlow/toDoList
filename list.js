const getbank = () => JSON.parse(localStorage.getItem('todo')) ?? []
const setBank = (book) => localStorage.setItem('todo', JSON.stringify(book))

let book = []
function addTask(tarefa) {
  const taskCount = document.getElementsByClassName('check').length
  const taskNextCount = taskCount + 1
  console.log('quant', taskNextCount)
  const otherTask = document.createElement('div')
  if (tarefa === '') {
    alert('Please tell me your Task')
  } else {
    otherTask.innerHTML = `
      <div class="check">
          <input
          type="checkbox"
          name=""
          id="input-list-${taskNextCount}"
          class="checkboxtask"
          onclick="okButton(${taskNextCount})"
          />
      </div>
    <div id="oneMoreId -${taskNextCount}" class="input-list">${tarefa}</div>
    `
  }
  document.querySelector('.newTask').appendChild(otherTask)
}

const createTask = (event) => {
  const key = event.key
  const keyboard = event.target.value
  if (key === 'Enter') {
    const book = getbank()
    book.push({ tarefa: keyboard })
    setBank(book)
    refreshScreen()
    event.target.value = ''
  }
}

const okButton = (taskNextCount) => {
  const box = document.getElementById(`input-list-${taskNextCount}`)
  const container = document.getElementById(`oneMoreId -${taskNextCount}`)
  if (box.checked == true) {
    container.classList.add('color-done')
  } else {
    container.classList.remove('color-done')
  }
}

const refreshScreen = () => {
  removeTask()
  const book = getbank()
  book.forEach((refreshTask) => {
    addTask(refreshTask.tarefa)
  })
}

const removeTask = () => {
  const parameter = document.querySelector('.newTask')
  while (parameter.firstChild) {
    parameter.removeChild(parameter.lastChild)
  }
}

document.getElementById('form-list').addEventListener('keypress', createTask)
refreshScreen()
