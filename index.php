<?php
session_start();

if (!isset($_SESSION['tasks'])) {
    $_SESSION['tasks'] = [];
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['task'])) {
        $task = [
            'text' => $_POST['task'],
            'completed' => false
        ];
        $_SESSION['tasks'][] = $task;
    }

    if (isset($_POST['complete'])) {
        $index = $_POST['complete'];
        $_SESSION['tasks'][$index]['completed'] = !$_SESSION['tasks'][$index]['completed'];
    }

    if (isset($_POST['delete'])) {
        $index = $_POST['delete'];
        array_splice($_SESSION['tasks'], $index, 1);
    }

    header('Location: ' . $_SERVER['PHP_SELF']);
    exit;
}

$tasks = $_SESSION['tasks'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do List</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>To-Do List</h1>
        <form action="" method="post" class="input-group">
            <input type="text" name="task" id="new-task" placeholder="Add a new task...">
            <button type="submit" id="add-task">Add</button>
        </form>
        <ul id="task-list">
            <?php foreach ($tasks as $index => $task): ?>
                <li class="<?= $task['completed'] ? 'completed' : '' ?>">
                    <span><?= htmlspecialchars($task['text']) ?></span>
                    <div class="task-buttons">
                        <form action="" method="post" style="display:inline;">
                            <button type="submit" name="complete" value="<?= $index ?>" class="complete-btn">Complete</button>
                        </form>
                        <form action="" method="post" style="display:inline;">
                            <button type="submit" name="delete" value="<?= $index ?>" class="delete-btn">Delete</button>
                        </form>
                    </div>
                </li>
            <?php endforeach; ?>
        </ul>
        <div class="filters">
            <button data-filter="all" class="active">All</button>
            <button data-filter="active">Active</button>
            <button data-filter="completed">Completed</button>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
