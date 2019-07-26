document.addEventListener('DOMContentLoaded', setUpPage)
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3011 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const likesCount = document.getElementById("likes")
  const container = document.getElementsByClassName("container")
  const imageCard = document.getElementById("image_card")
  const name = document.getElementById("name")
  const likes = document.getElementById("likes")
  const likeBtn = document.getElementById("like_button")
  const commentForm = document.getElementById("comment_form")
  const comments = document.getElementById("comments")
  const commentContainer = document.getElementById("comment_input")
  // const likeBtn = document.getElementById("like_button")

  // document.addEventListener('click', handleLikes)
  commentForm.addEventListener('submit', handleSubmit)
  


  function setUpPage() {
    fetch(imageURL)
    .then(resp => resp.json())
    .then(data => renderImage(data))
  }

  function renderImage(img) {
    console.log(img)
      imageCard.innerHTML =
       `<div id="image_card" class="card col-md-4">
          <img src=${img.url} id="image" data-id="${img.id}"/>
          <h4 id="name">${img.name}</h4>
          <span>Likes:
            <span id="likes">${img.like_count}</span>
          </span>
          <button data-id="${img.id} id="like_button">Like</button>
          <form id="comment_form">
            <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
            <input type="submit" value="Submit"/>
          </form>
          <ul id="comments">
               <!-- <li> for each comment goes here -->
          </ul>
        </div>` 
        let like_button = document.querySelector("#like_button")
        like_button.addEventListener('click', handleLikes)

        console.log(likeBtn)
  }

  function handleLikes(e) {
    
    debugger;
    likesCount.innerText = parseInt(likesCount.innerText) + 1

    fetch('https://randopic.herokuapp.com/likes', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            image_id: e.target.dataset.id
        })
    })
    .then(res => res.json())
    .then(console.log)
    // .then(updateLike) 
    // .then(renderImage)
   
}
// likes broken, moving on
// was increasing likes, just after a refresh, Will tried to help and now showing NaN

// function updateLike() {
//   console.log(likesCount.innerText)
  
//   let span = document.querySelector('#likes')
//   span.innerText = parseInt(likesCount.innerText) + 1
//   // console.log(span)
// }
// 
function handleSubmit(e) {
  console.log(comment.content)
  e.preventDefault()
  comments.innerHTML += `<li>${comment.value}</li>`
  // console.log(comment.content)
  fetch('https://randopic.herokuapp.com/comments', {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body:JSON.stringify({
          image_id: imageId,
          content: comment.value
      })
  })
  .then(resp => resp.json())
}








