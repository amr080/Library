fetch('/posts.json')
.then(response => response.json())
.then(posts => {
  const postsDiv = document.getElementById('posts');
  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.innerHTML = `
      <p><strong>Title: </strong>${post.title}</p>
      <p><strong>Body:</strong></p>
      <p>${post.content}</p>
      <small>Date: ${new Date(post.date).toLocaleString()}</small><br>
      <small>ID: ${post.id}</small>
    `;
    postsDiv.appendChild(postElement);
  });
})
.catch(error => console.error('Error fetching posts:', error));
