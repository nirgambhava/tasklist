document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filters button');
    const taskList = document.getElementById('task-list');
    let currentFilter = 'all';

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentFilter = button.getAttribute('data-filter');
            filterTasks();
        });
    });

    function filterTasks() {
        const tasks = taskList.querySelectorAll('li');
        tasks.forEach(task => {
            switch (currentFilter) {
                case 'active':
                    task.style.display = task.classList.contains('completed') ? 'none' : 'flex';
                    break;
                case 'completed':
                    task.style.display = task.classList.contains('completed') ? 'flex' : 'none';
                    break;
                default:
                    task.style.display = 'flex';
                    break;
            }
        });
    }

    filterTasks();
});
