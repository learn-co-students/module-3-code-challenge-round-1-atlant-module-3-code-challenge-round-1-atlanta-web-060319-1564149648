document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3077
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const mainLikes = document.getElementById("likes")

  const likeBtn = document.getElementById("like_button")
  likeBtn.addEventListener("click", handleLike)

  const commentForm = document.getElementById("comment_form")
  commentForm.addEventListener("submit", handleCommentSubmit)

  const commentUl = document.getElementById("comments")

  const commentInputField = document.getElementById("comment_input")
  

  function init() {
    getImage()
  }

  function displayImage(image) {
    
    let mainImg = document.getElementById("image")
    mainImg.src = image.url

    let mainName = document.getElementById("name")
    mainName.innerText = image.name

    mainLikes.innerText = image.like_count

    commentUl.innerHTML += `
    ${image.comments.map((comment) => `<li>${comment.content}</li>`).join("")}`

    likeBtn.dataset.id = image.id
    commentForm.dataset.id = image.id
  }

  function handleCommentSubmit(e) {
    e.preventDefault()
    
    let comment = {
      content: e.target.comment.value,
      image_id: e.target.dataset.id
    }
    commentUl.innerHTML += `
    <li class="comment-li" id="image-id-${comment.id}">${comment.content}</li>`

    fetch((commentsURL), {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify(comment)
    })
    .then(resp => resp.json())
    .then(commentInputField.value = "")
  }

  function handleLike(e) {
    let currentLikes = parseInt(e.target.previousElementSibling.firstElementChild.innerText)
    let newLikes = currentLikes+1
    let imageId = e.target.dataset.id

    fetch((likeURL), {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify({
        image_id: imageId,
        like_count: newLikes
      })
    })
    .then(resp => resp.json())
    .then(mainLikes.innerText = newLikes) 
  }

  function getImage() {
    fetch(imageURL) 
    .then(resp => resp.json())
    .then(displayImage)
  }



  init();
})
