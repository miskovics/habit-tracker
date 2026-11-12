const STORAGE_KEY = 'habits';

const list = document.getElementById('habits');
const newDayButton = document.getElementById('new-day');
const newHabitButton = document.getElementById('new-habit');
const titleInput = document.getElementById('new-title');

let habits = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
}

function render() {
  list.innerHTML = '';
  habits.forEach((habit, index) => {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = habit.status === 'COMPLETE';
    checkbox.addEventListener('change', () => {
      habit.status = checkbox.checked ? 'COMPLETE' : 'INCOMPLETE';
      save();
    });

    const title = document.createElement('span');
    title.className = 'title';
    title.textContent = habit.title;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      habits.splice(index, 1);
      save();
      render();
    });

    li.append(checkbox, title, deleteButton);
    list.append(li);
  });
}

newDayButton.addEventListener('click', () => {
  habits.forEach(habit => habit.status = 'INCOMPLETE');
  save();
  render();
});

newHabitButton.addEventListener('click', () => {
  titleInput.hidden = false;
  titleInput.focus();
});

titleInput.addEventListener('keydown', event => {
  if (event.key !== 'Enter' || event.isComposing) return;
  const title = titleInput.value.trim();
  if (!title) return;
  habits.push({ title, status: 'INCOMPLETE' });
  save();
  render();
  titleInput.value = '';
  titleInput.hidden = true;
});

render();
