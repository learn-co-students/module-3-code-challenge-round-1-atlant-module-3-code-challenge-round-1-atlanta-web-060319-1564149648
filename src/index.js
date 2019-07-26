
  document.addEventListener("DOMContentLoaded", setUpPage)
const imageId = 3085
const imageURL =  `https://randopic.herokuapp.com/images/${imageId}`
const photo = document.getElementById("image_card")
const like = document.querySelector("#likes")
// const allComments = document.getElementById("comments")
const formInputOfComment = document.getElementById("comment_input")
const thisIsTheIdForCommentForm = document.getElementById("comment_form")
// const button = document.getElementById("like_button")
// const form = document.getElementById("comment_form")
document.addEventListener("submit", handleSubmit)
document.addEventListener("click", handleClick)




function setUpPage(){
    fetch(imageURL)
    .then(res => res.json())
    .then(image => renderImage(image))

   getTheComments()
}

function getTheComments(){
    fetch(imageURL)
    .then(res => res.json())
    .then(data => renderCommentList(data.comments))

}

function renderCommentList(comments){
    
    comments.forEach(comment => showInfo(comment))

    // console.log("hererere", comments)  
}

function showInfo(comments){
  
    console.log(comments)
   let ul = document.querySelector("#comments")
   let li = document.createElement("li")
   li.innerText = comments.content

   ul.appendChild(li)
}

function renderImage(image){
    // console.log(image)
    // let nameTag = document.getElementById("name")
    // photo.setAttribute("src", image.url)
    // photo.setAttribute("data-id", image.id)
    
    // let h4 = document.createElement("h4")
    // h4.innerText = image.name

    // nameTag.appendChild(h4)
    photo.innerHTML = `<img src=${image.url} id="image" data-id=${image.id}/>
          <h4 id="name">${image.name}</h4>
          <span>Likes:
            <span id="likes">${image.like_count}</span>
          </span>
          <button id="like_button">Like</button>
          <form id="comment_form"><input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
          <input type="submit" value="Submit"/>
          <ul id="comments">
               <!-- <li> for each comment goes here -->
          </ul>
        </form>`
        // console.log(image)
}

function handleSubmit(e){
    e.preventDefault()
    if( e.target["comment_input"].value)
    
    addComment(e.target["comment_input"].value)
    console.log("Right Here")
}

// e.preventDefault()

//     console.log(e.target["new-quote"].value)

//     let quote = {
//         quote: e.target["new-quote"].value,
//         author: e.target.author.value,
//         likes: []
//     }
//     saveQuote(quote)
//     console.log(quote)

// function renderComment(){
//     addComment()
// }

function addComment(data){
    
    fetch("https://randopic.herokuapp.com/comments", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            image_id: imageId,
            content: data
        })
    })
    .then(res => res.json())
    .then(comment => showInfo(comment))
    thisIsTheIdForCommentForm.reset()
    console.log("YOOOOOO")
}

function handleClick(e){
    if(e.target.id === "like_button")
    {
      addLikes(e.target.id === "likes")
    }
    // console.log("Hiiii")
}
function addLikes(){
    console.log("Hiiii")
    let moreLikes = parseInt(image.like_count) + 1
    fetch("https://randopic.herokuapp.com/likes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            image_id: imageId,
            like_count: moreLikes
        })
    })
    .then(res => res.json())
    .then(data => setUpPage(data))
}

// function showLike(data){
//     return data
// }



