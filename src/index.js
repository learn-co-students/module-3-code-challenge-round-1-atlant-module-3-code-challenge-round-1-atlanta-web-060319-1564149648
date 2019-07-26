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

  document.addEventListener("click", handleClick)
  

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
    ${image.comments.map((comment) => `<li class="comment-li" id="comment-li-id-${comment.id}"><button id="comment-btn-id-${comment.id}" class="remove-btn">Remove Comment</button>       ${comment.content}</li>`).join("")}`

    likeBtn.dataset.id = image.id
    commentForm.dataset.id = image.id
  }

  function handleClick(e) {
    if(e.target.className === "remove-btn") {
      removeComment(e.target.id.slice(15))
    }
  }

  function removeComment(id) {
    let deleteTarget = document.getElementById(`comment-li-id-${id}`)

    fetch((commentsURL+id), {
      method: "DELETE"
    })

    deleteTarget.remove()
  }

  function handleCommentSubmit(e) {
    e.preventDefault()
    
    let comment = {
      content: e.target.comment.value,
      image_id: e.target.dataset.id
    }
    commentUl.innerHTML += `
    <li class="comment-li" id="comment-li-id-${comment.id}"><button id="comment-btn-id-${comment.id}" class="remove-btn">Remove Comment</button>       ${comment.content}</li>`

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
