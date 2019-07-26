document.addEventListener('DOMContentLoaded', setUpPage)


let imageId = 3081
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`


function setUpPage(){
  fetch(imageURL)
  .then(res => res.json())
  .then(picture => renderPicture(picture))
}

function renderPicture(picture){
  let img = document.querySelector("img")
  img.src = picture.url
  img.dataset.id = picture.id
  let h4 = document.querySelector("h4")
  h4.innerText = picture.name
  let likes = document.querySelector("#likes")
  let likeBtn = document.querySelector("#like_button")
  likeBtn.addEventListener("click", handleLikes)
  likes.innerText = picture.like_count
  let comments = document.querySelector("#comments")
  let form = document.querySelector("#comment_form")
  form.addEventListener("submit", handleSubmit)

  picture.comments.forEach(comment => {
    let li = document.createElement("li")
    li.innerText = comment.content

    comments.appendChild(li)
  })

}



function handleLikes(e){
  if (e.target.id = "like_button"){
    let prevLikes = parseInt(document.querySelector("#likes").innerText)
    let updateLikes = (prevLikes + 1) 
    let likes = document.querySelector("#likes")
    likes.innerText = updateLikes

    
    fetch(likeURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        image_id: 3081
      })
    })
  } 
}

function handleSubmit(e){
  e.preventDefault()
  
  let comment = e.target.comment.value
  let commentLi = document.createElement("li")
  commentLi.innerText = comment
  let commentList = document.querySelector("#comments")

  commentList.appendChild(commentLi)
  
  e.target.comment.value = ''

  fetch(commentsURL, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      image_id: 3081,
      content: comment
    })
  })
  .then(res => res.json())
  .then(comment => console.log(comment))

}



    
    
    





  



