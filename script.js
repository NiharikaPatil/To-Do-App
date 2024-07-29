document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const addTaskBtn = document.getElementById('add-task-btn');
    const newTaskInput = document.getElementById('new-task');
    const dueDateInput = document.getElementById('due-date');
    const themeSelect = document.getElementById('theme-select');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <span>${task.text} (due: ${task.dueDate})</span>
                <div>
                    <button class="btn complete" onclick="completeTask(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button class="btn delete" onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    }

    window.completeTask = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    addTaskBtn.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        const dueDate = dueDateInput.value;
        if (taskText !== '') {
            tasks.push({ text: taskText, dueDate: dueDate, completed: false });
            saveTasks();
            renderTasks();
            newTaskInput.value = '';
            dueDateInput.value = '';
        }
    });

    themeSelect.addEventListener('change', (e) => {
        document.body.dataset.theme = e.target.value;
    });

    renderTasks();
});
