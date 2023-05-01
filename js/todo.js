window.addEventListener('load', function() {

  // Get elements from the DOM
  const todoInput = document.getElementById('todo-input');
  const dateInput = document.getElementById('date-input');
  const addButton = document.getElementById('add-button');
  const todoList = document.getElementById('todo-list');

  // Limit the date selection to days later than the current day
  const currentDate = new Date();
  const fp = flatpickr("#date-input", {
    minDate: "today",
    disable: [
      {
        from: "1900-01-01",
        to: currentDate.toISOString().split("T")[0],
      },
    ],
    dateFormat: "Y-m-d",
  });

  // Add event listener for form submit
  addButton.addEventListener('click', function(event) {
    event.preventDefault(); // prevent page refresh

    // Check if the submit button was clicked
    if (event.target.id === 'add-button') {
      event.preventDefault(); // prevent page refresh

      // Get the value of the input fields
      const newTask = todoInput.value.trim();
      const dueDate = dateInput.value;

      // Check if the input fields are empty
      if (newTask === '' || dueDate === '') {
      // Show a floating window error
        const error = document.createElement('div');
        error.classList.add('notification', 'is-danger', 'is-light', 'is-flex', 'is-justify-content-center', 'is-align-items-center');
        error.innerHTML = 'Task Name and Due Date cannot be empty.';
        document.body.appendChild(error);

        setTimeout(function() {
        error.remove();
        }, 3000);
              return; 
      }

      todoInput.value = '';
      dateInput.value = '';

      // Create a new li element for the new task
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="task mr-2">${newTask}</span>
        <span class="due-date ml-auto">${dueDate}</span>
        <button class="button is-danger is-small ml-2">Delete</button>
        <button class="button is-success is-small ml-2">Completed</button>
      `;

      // Add event listener for delete button
      const deleteButton = li.querySelector('.is-danger');
      deleteButton.addEventListener('click', function() {
        li.remove();
      });

      // Add event listener for completed button
      const completedButton = li.querySelector('.is-success');
      const taskSpan = li.querySelector('.task');
      completedButton.addEventListener('click', function() {
        taskSpan.classList.toggle('has-text-grey-light');
      }); 

      // Add the new li element to the todo list
      todoList.appendChild(li);
    }
  });
});

window.onload = checkLogin
function checkLogin(){
    console.log("Checking if logged in")
    console.log(sessionStorage.getItem("logged-in") == "true")
    if (sessionStorage.getItem("logged-in") == "true"){

        
        console.log(sessionStorage.getItem("customWallpaper"))
        if (sessionStorage.getItem("customWallpaper") == "true"){
            setWallpaper()
            console.log("Custom wp true!")

        }
        document.getElementById("login").style.visibility = "hidden"
        document.getElementById("signup/logout").href = "main.html"
        document.getElementById("signup/logout").innerText = "Log Out"
        document.getElementById("signup/logout").onclick = endSession
        //restorePreviousVideo()
        addToDoList()
    }
}


function setWallpaper(){

    let wallpaper = sessionStorage.getItem("wallpaper")
    console.log(sessionStorage.getItem("wallpaper"))
    if (wallpaper) {
        let url1 = "url('"
        let url2 = "')"
        let wp = (url1.concat(wallpaper)).concat(url2)
        document.getElementById("background-img").style.backgroundImage = wp
    } else {
        setWallpaper()
    }

}

// function restorePreviousVideo(){
//     let lV = sessionStorage.getItem("latest-video")
//     console.log(lV)

//     if (lV){
//         document.getElementById("link-box").innerText == sessionStorage.getItem("latest-video")
//         document.getElementById("yt").src = lV
//     } else {
//         restorePreviousVideo()
//     }
    
    
// }


function endSession(){
    sessionStorage.removeItem("logged-in")
    sessionStorage.removeItem("customWallpaper")
    sessionStorage.removeItem("wallpaper")
    sessionStorage.removeItem("todo")
    sessionStorage.removeItem("latest-video")
}


function addToDoList(){
  const todoList = document.getElementById('todo-list');
  

  let list = JSON.parse(sessionStorage.getItem("todo"))
  for (let t of list){
    console.log(t)
    var newTask = t.task;
    var dueDate = t.due;

    const li = document.createElement('li');
    li.innerHTML = `
      <span class="task mr-2">${newTask}</span>
      <span class="due-date ml-auto">${dueDate}</span>
      <button class="button is-danger is-small ml-2">Delete</button>
      <button class="button is-success is-small ml-2">Completed</button>
    `;
    const deleteButton = li.querySelector('.is-danger');
    deleteButton.addEventListener('click', function() {
      li.remove();
    });

    const completedButton = li.querySelector('.is-success');
    const taskSpan = li.querySelector('.task');
    completedButton.addEventListener('click', function() {
      taskSpan.classList.toggle('has-text-grey-light');
    }); 

    todoList.appendChild(li);

  }
  

  

}