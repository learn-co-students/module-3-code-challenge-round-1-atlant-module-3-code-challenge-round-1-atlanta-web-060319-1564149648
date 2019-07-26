document.addEventListener('DOMContentLoaded', init)

let imageId = 3076 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`
const imageCard = document.querySelector("#image_card")
const image = document.querySelector("#image")
const name = document.querySelector("#name")
const likes = document.querySelector("#likes")
const comments = document.querySelector("#comments")
const likeBtn = document.querySelector("#like_button")
const commentForm = document.querySelector("#comment_form")
// const thing = document.querySelector("#thing")


function init(){
  fetch(imageURL)
  .then(resp => resp.json())
  .then(imgData => renderPic(imgData))

  likeBtn.addEventListener("click", handleClick)
  commentForm.addEventListener("submit", handleSubmit)
}

function renderPic(picData){
image.src = picData.url
image.setAttribute("data-id", picData.id)
name.innerText = picData.name
// thing.appendChild(imageCard)
imageCard.appendChild(image)
likes.innerText = picData.like_count
picData.comments.forEach(function(comment){
  let li = document.createElement("li")
  li.innerText = comment.content
  comments.appendChild(li)
})
}

function handleSubmit(e){
  e.preventDefault()
  let li = document.createElement("li")
  li.innerText = e.target[0].value
  comments.appendChild(li)
  
  let data = {image_id: 3076, content: e.target[0].value}

  fetch(commentsURL, {
        method: 'POST',
        headers:
        {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
    .catch(console.log)
  event.target.reset()
}

function handleClick(e){
  let currentLikes = parseInt(likes.innerText)
  let newLikes = currentLikes + 1
  likes.innerText = newLikes

  let data = {image_id: 3076}

  fetch(likeURL, {
        method: 'POST',
        headers:
        {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
    .catch(console.log)
}