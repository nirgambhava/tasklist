document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    const filterButtons = document.querySelectorAll('.filters button');

    let tasks = [];

    function renderTasks(filter = 'all') {
        taskList.innerHTML = '';
        let filteredTasks = tasks.filter(task => {
            if (filter === 'active') return !task.completed;
            if (filter === 'completed') return task.completed;
            return true;
        });

        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            const taskText = document.createElement('span');
            taskText.textContent = task.text;
            li.appendChild(taskText);

            const buttonsDiv = document.createElement('div');
            buttonsDiv.className = 'task-buttons';

            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.className = 'complete-btn';
            completeButton.addEventListener('click', () => {
                task.completed = !task.completed;
                renderTasks(filter);
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-btn';
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation();
                tasks = tasks.filter(t => t !== task);
                renderTasks(filter);
            });

            buttonsDiv.appendChild(completeButton);
            buttonsDiv.appendChild(deleteButton);
            li.appendChild(buttonsDiv);

            taskList.appendChild(li);
        });
    }

    addTaskButton.addEventListener('click', () => {
        const text = newTaskInput.value.trim();
        if (text) {
            tasks.push({ text, completed: false });
            newTaskInput.value = '';
            renderTasks();
        }
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderTasks(button.getAttribute('data-filter'));
        });
    });

    renderTasks();
});
