// タスクの追加ボタンをクリックした時の処理
document.getElementById("addTaskBtn").addEventListener("click", function() {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;
    taskList.appendChild(taskItem);
    taskInput.value = "";
  }
});

// Enterキーを押した時の処理
document.getElementById("taskInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("addTaskBtn").click();
  }
});
