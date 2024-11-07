const loginForm = document.getElementById('login-form');
const adminPanel = document.getElementById('admin-panel');
const newPostForm = document.getElementById('new-post-form');

loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const password = document.getElementById('password').value;
  fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        loginForm.style.display = 'none';
        adminPanel.style.display = 'block';
      } else {
        alert('Incorrect password');
      }
    })
    .catch(error => console.error('Login error:', error));
});

newPostForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  fetch('/add-post', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Post added successfully!');
        newPostForm.reset();
      } else {
        alert('Error adding post');
      }
    })
    .catch(error => console.error('Error adding post:', error));
});
