



// DOM Elements
const titleInput = document.getElementById('title-input');
const contentInput = document.getElementById('content-input');
const saveButton = document.getElementById('save-btn');
const backButton = document.getElementById('back-btn');
const charCount = document.getElementById('char-count');

// Track character count for title
titleInput.addEventListener('input', () => {
  const titleLength = titleInput.value.length;
  charCount.textContent = `${titleLength}/100 characters`;
});

// Load post for editing if applicable
const editPostIndex = sessionStorage.getItem('editPostIndex');
if (editPostIndex !== null) {
  const posts = JSON.parse(localStorage.getItem('blogs')) || [];
  const postToEdit = posts[editPostIndex];

  if (postToEdit) {
    titleInput.value = postToEdit.title;
    contentInput.value = postToEdit.content.join('\n'); // Restore content with newline for editing
    charCount.textContent = `${postToEdit.title.length}/100 characters`;
    document.getElementById('editor-title').textContent = 'Edit Post';
  }
}

// Save or update post
saveButton.addEventListener('click', () => {
  const title = titleInput.value.trim();
  let content = contentInput.value.trim();

  if (!title || !content.length) {
    alert('Title and content are required!');
    return;
  }

  // Replace newlines with <br> to preserve line breaks
  content = content.replace(/\n/g, '<br>');

  const posts = JSON.parse(localStorage.getItem('blogs')) || [];

  if (editPostIndex !== null) {
    posts[editPostIndex] = { title, content: content.split('<br>') }; // Store content as an array of lines
    sessionStorage.removeItem('editPostIndex');
  } else {
    posts.push({ title, content: content.split('<br>'), createdAt: new Date().toISOString() });
  }

  localStorage.setItem('blogs', JSON.stringify(posts));
  alert('Post saved!');
  window.location.href = 'dashboard.html';
});

// Back button
backButton.addEventListener('click', () => {
  window.location.href = 'dashboard.html';
});
