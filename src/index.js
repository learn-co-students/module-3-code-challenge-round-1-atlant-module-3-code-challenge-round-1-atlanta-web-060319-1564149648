
document.addEventListener('DOMContentLoaded', function() {

  const imageId = 2986 //Enter your assigned imageId here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imageContainer = document.getElementById('image')
  const nameContainer = document.getElementById('name')
  const likesCount = document.getElementById('likes')
  const likeButton = document.getElementById('like_button')
  const commentForm = document.getElementById('comment_form')
  const comment = document.getElementById('comment_input')
  const commentContainer = document.getElementById('comments')

  fetch(imageURL)
  .then(resp => resp.json())
  .then((image) => {
    console.log(image);
    imageContainer.src = image.url
    nameContainer.innerText = image.name
    likesCount.innerText = image.like_count
    image.comments.forEach((comment) => {
      commentLi = document.createElement('li')
      commentLi.innerText = comment.content
      commentContainer.append(commentLi)
    })
  })


  likeButton.addEventListener("click", () => {
    likesCount.innerText = parseInt(likesCount.innerText) + 1
    fetch(likeURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId
      })
    })
  })

  commentForm.addEventListener("submit", (event) => {
    event.preventDefault()
    commentLi = document.createElement('li')
    commentLi.innerText = comment.value
    commentContainer.append(commentLi)
    fetch(commentsURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        content: comment.value
      })
    })

  })
})
