document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3082 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imgCardDiv = document.querySelector('#image_card')
  document.addEventListener('click', handleEvents)

  function handleEvents(e){
    e.preventDefault()
    if (e.target.id === 'like_button'){
      likeComment(e)
    } else if (e.target.id === 'comment-btn'){
      newComment(e)
    }

  }

  loadPage()
  function loadPage(){
    fetchImage()
  }

  function fetchImage(){
    fetch(imageURL)
    .then(res => res.json())
    .then(imageCard)
  }

  function imageCard(image){
    imgCardDiv.innerHTML = `<img src="${image.url}" id="image" data-id="${image.id}"/>
    <h4 id="name">${image.name}</h4>
    <span>Likes:
      <span id="likes" data-likes="${image.like_count}">${image.like_count}</span>
    </span>
    <button id="like_button">Like</button>
    <form id="comment_form">
      <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
      <input id="comment-btn" type="submit" value="Submit"/>
    </form>
    <ul id="comments">
         ${image.comments.map(comment => `<li>${comment.content}</li>`).join(' ')}
    </ul> `
  }

  function likeComment(e){
    e.preventDefault()
    let newLike = parseInt(e.target.parentElement.querySelector('#likes').dataset.likes) + 1
    let spanLike = document.querySelector('#likes')
     spanLike.innerText = newLike
    let likeObject = {
      like_count: newLike,
      image_id: 3082
    }
    saveLike(likeObject)
  }

  function saveLike(likeObject){
    fetch(likeURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(likeObject)
    })
    .then(res => res.json())
    .then(console.log)
  }

  // function newLikeCard(like){
  //   let newlike = document.querySelector('#likes')
  //   newlike.innerText 
  //   console.log(like)
  // }

  function newComment(e){
    let newComment = {
     content: e.target.parentElement.comment.value,
     image_id: 3082
    }
    let commentsUl = document.querySelector('#comments')
    let li = document.createElement('li')

      li.innerText += newComment.content
      commentsUl.appendChild(li)
      
    saveNewCom(newComment)
  }

  function saveNewCom(newComment){
    fetch(commentsURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newComment)
    })
    .then(res => res.json())
    .then(console.log)
  }

})
