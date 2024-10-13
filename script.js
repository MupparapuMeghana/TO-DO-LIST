const taskInput = document.querySelector(".task-input input"),
    filters = document.querySelectorAll(".filters span"),
    clearAll = document.querySelector(".clear-btn"),
    taskBox = document.querySelector(".task-box"),
    addbtn = document.querySelector(".add-btn");

let editId, isEditTask = false, todos = JSON.parse(localStorage.getItem("todo-list")) || [];

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

function showTodo(filter) {
    let liTag = ""; 

    todos.forEach((todo, id) => {
        if (filter === todo.status || filter === "all") {
            liTag += `<li class="task">
                        <label for="${id}">
                            <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${todo.status === "completed" ? "checked" : ""}>
                            <p class="${todo.status === "completed" ? "checked" : ""}">${todo.name}</p>
                        </label>
                        <div class="task-icons">
                            <i onclick="editTask(${id}, '${todo.name}')" class="uil uil-edit"></i>
                            <i onclick="deleteTask(${id}, '${filter}')" class="uil uil-trash-alt"></i>
                        </div>
                    </li>`;
        }
    });

   
    taskBox.innerHTML = liTag.length ? liTag : `<span>You don't have any task here</span>`;
    
    if (taskBox.querySelectorAll(".task").length === 0) {
        clearAll.classList.remove("active");
    } else {
        clearAll.classList.add("active");
    }

    if (taskBox.offsetHeight >= 300) {
        taskBox.classList.add("overflow");
    } else {
        taskBox.classList.remove("overflow");
    }
}

showTodo("all");

function updateStatus(selectedTask) {
    todos[selectedTask.id].status = selectedTask.checked ? "completed" : "pending";
    localStorage.setItem("todo-list", JSON.stringify(todos));
}

function editTask(taskId, textName) {
    editId = taskId;
    isEditTask = true;
    taskInput.value = textName;
    taskInput.focus();
    taskInput.classList.add("active");
}

function deleteTask(deleteId, filter) {
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(filter);
}

clearAll.addEventListener("click", () => {
    todos = [];
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
});

taskInput.addEventListener("keyup", e => {
    if (e.key === "Enter" && taskInput.value.trim()) {
        const userTask = taskInput.value.trim();
        if (!isEditTask) {
            todos.push({ name: userTask, status: "pending" });
        } else {
            todos[editId].name = userTask;
            isEditTask = false;
        }
        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo(document.querySelector("span.active").id);
    }
});

function add() {
    if (taskInput.value.trim()) {
        const userTask = taskInput.value.trim();
        if (!isEditTask) {
            todos.push({ name: userTask, status: "pending" });
        } else {
            todos[editId].name = userTask;
            isEditTask = false;
        }
        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo(document.querySelector("span.active").id);
    }
}
