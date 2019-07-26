document.addEventListener('DOMContentLoaded', function() {


const imageId = 3017 //Enter your assigned imageId here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`



const likeButton = document.getElementById('like_button')
const commentForm = document.getElementById('comment_form')
const comment = document.getElementById('comment_input')
const commentContainer = document.getElementById('comments')
const likesCount = document.getElementById('likes')

 fetch(imageURL)
 .then(resp => resp.json())
  .then((image) => {
   console.log(image);

    const imageHolder = document.getElementById('image')
    imageHolder.src = image.url

    const nameHolder = document.getElementById('name')
    nameHolder.innerText = image.name

   
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