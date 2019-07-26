document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3079 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
  
  const likes = document.querySelector('#likes')
  
  
  document.addEventListener('click', handleClicks)
  
  function init(e){
    fetch(imageURL)
    .then(r => r.json())
    .then(makePostCard)
  }
  
  function makePostCard(data){

    const cardArea = document.querySelector('#image_card')
   console.log(data.likes_count)
    cardArea.innerHTML =
      ` <img src="${data.url}" id="image" data-id='${data.id}'>
      <h4 id="name">${data.name}</h4>
      <span>Likes:
      <span id="likes">${data.like_count} </span>
      </span>
      <button id="like_button">Like</button>
      <form id="comment_form">
      <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
      <input type="submit" value="Submit"/>
      </form>`
  }

  function handleClicks(e){
    if(e.target.innerText === "Like"){
      // let likes = document.querySelector('#like-button')
      
      patchLikes(likes)
    } 

  }

  function patchLikes(likeBtn){
    const counter = likes
    counter.innerText = parseInt(counter.innerText) + 1 

    fetch(likeURL, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json'
      },
      body: JSON.stringify({
        'likes': likes.innerText = `${counter} Likes`
      }
      )}
      .then(r => r.json())
      .then(console.log)
    )
  }
  




  init()
})
