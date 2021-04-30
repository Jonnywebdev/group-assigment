window.onload = function() {
    fetchAllPosts();
}    

async function fetchAllPosts() {
    try {
         const response = await fetch('http://localhost:5000/posts');
         const posts = await response.json();
         console.log(posts);
         
         let postsHTML = '';
         for (let post of posts) {
              let dateObj = new Date(post.date);

              postsHTML += `
                   <li class="list-group-item list-group-item-action">
                        <h2>${post.title}</h2>
                        <h3>${post.author}</h3>
                        <p>${post.content}<br> <span class="date">- ${formatDate(dateObj)}</span> </p>
                        
                        <div>
                             <a class="btn btn-warning" href="update-post.html?id=${post['_id']}">Update</a> |
                             <a href="#" class="delete-link btn btn-danger" data-id="${post['_id']}">Delete</a> 
                        </div>
                   </li>
              `;
         }

         document.getElementById('post-list').innerHTML = postsHTML;
    } catch (error) {
         console.log(error);
    }

    
    deletePostEvent();
}

function formatDate(dateObj) {
    return `${dateObj.getFullYear()}/${dateObj.getMonth()}/${dateObj.getDate()}`;
}

function deletePostEvent () {
    let deletePostLinks = document.getElementsByClassName('delete-link');

    for (deleteLink of deletePostLinks) {
         deleteLink.addEventListener('click', async function(e) {
              e.preventDefault();

              let theClickedLink = e.target;
              let postId = theClickedLink.dataset.id;
              console.log(postId);

              try {
                   await fetch('http://localhost:5000/posts/' + postId, {
                        method: 'DELETE', 
                   });

                   theClickedLink.parentNode.parentNode.remove();
              } catch (error) {
                   console.log(error);
              }
         })
    }
}
