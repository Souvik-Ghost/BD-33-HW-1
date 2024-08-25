let express = require("express");
let app = express();
let port = 3000;
app.listen(port, () => {
  console.log(`The server running at http://localhost:${port}`);
});

//1
let watchList0 = [
  { videoId: 1, title: 'JavaScript Tutorial', watched: false, url: 'https://youtu.be/shorturl1' },
  { videoId: 2, title: 'Node.js Basics', watched: true, url: 'https://youtu.be/shorturl2' },
  { videoId: 3, title: 'React.js Guide', watched: false, url: 'https://youtu.be/shorturl3' }
];

function getUnwatchedVideos(watchList0) {
  return watchList0.filter((video) => video.watched);
}
app.get("/watchlist/delete-unwatched", (req, res) => {
  let result = getUnwatchedVideos(watchList0);
  res.json(result);
});
//watchlist/delete-unwatched

//2
let watchList1 = [
  { videoId: 1, title: 'JavaScript Tutorial', watched: false, url: 'https://youtu.be/shorturl1', isFavorite: false },
  { videoId: 2, title: 'Node.js Basics', watched: true, url: 'https://youtu.be/shorturl2', isFavorite: false },
  { videoId: 3, title: 'React.js Guide', watched: false, url: 'https://youtu.be/shorturl3', isFavorite: false }
];
function markVideoAsFavorite(watchList1, videoId, isFavorite) {
  for (let i = 0; i < watchList1.length; i++) {
    if (watchList1[i].videoId === videoId) {
      watchList1[i].isFavorite = isFavorite;
      break;
    }
  }
  return watchList1;
}
app.get("/watchlist/favorite", (req, res) => {
  let videoId = parseInt(req.query.videoId);
  let isFavorite = req.query.isFavorite === 'true';
  let result = markVideoAsFavorite(watchList1, videoId, isFavorite);
  res.json(result);
});
//watchlist/favorite?videoId=1&isFavorite=true

//3
let tasks = [
  { taskId: 1, title: 'Buy groceries', completed: false },
  { taskId: 2, title: 'Walk the dog', completed: false },
  { taskId: 3, title: 'Do laundry', completed: true }
];

function updateTaskStatusById(tasks, taskId, completed) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].completed = completed;
      break;
    }
  }
  return tasks;
}
app.get("/tasks/update", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let completed = req.query.completed === 'true';
  let result = updateTaskStatusById(tasks, taskId, completed);
  res.json(result);
});
//tasks/update?taskId=1&completed=true

//4
function removeCompletedTasks(tasks) {
  return tasks.filter(task => !task.completed);
}
app.get("/tasks/remove-completed", (req, res) => {
  let result = removeCompletedTasks(tasks);
  tasks = result;
  res.json(result);
});
//tasks/remove-completed

//5
let books = [
  { bookId: 1, title: '1984', available: true },
  { bookId: 2, title: 'Brave New World', available: true },
  { bookId: 3, title: 'Fahrenheit 451', available: false }
];
function updateBookAvailabilityById(books, bookId, available) {
  for (let i = 0; i < books.length; i++) {
    if (books[i].bookId === bookId) {
      books[i].available = available;
      break;
    }
  }
  return books;
}
app.get("/library/update", (req, res) => {
  let bookId = parseInt(req.query.bookId);
  let available = req.query.available === "true";
  let result = updateBookAvailabilityById(books, bookId, available);
  res.json(result);
});
//library/update?bookId=1&available=false
