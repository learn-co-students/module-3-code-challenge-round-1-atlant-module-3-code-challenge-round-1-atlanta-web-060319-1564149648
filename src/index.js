document.addEventListener('DOMContentLoaded', () => {
// console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

let imageId = 3020 //Enter the id from the fetched image here

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

const likeURL = `https://randopic.herokuapp.com/likes/`

const commentsURL = `https://randopic.herokuapp.com/comments/`


const name = document.getElementById('name')
const likes = document.getElementById('likes')
const ul = document.getElementById('comments') //**comments -> ul
const likeBtn = document.getElementById('like_button')
const commBox = document.getElementById('comment_form')

  fetch(imageURL)
  .then(res => res.json())
  // .then(picData => console.log(picData))
  .then(picData => renderImg(picData))

  //use .src

  function renderImg(picData){
    // console.log(picData)
    image.src = picData.url 
    name.innerText = picData.name
    likes.innerText = picData.like_count

    // *comments = lis
    picData.comments.forEach(function(comment){
      let li = document.createElement('li')
      li.dataset.id = comment.id
      li.innerText = comment.content

      ul.appendChild(li)
    })
  }

  likeBtn.addEventListener('click', () => {
    let likeNum = likes.innerText
    likes.innerText = ++likeNum
    // likes.parseInt

    addLikes({image_id: imageId})
  })

  function addLikes(likes){
    return fetch(likeURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(likes)
    })
    // .then(res => res.json())
    // .then(console.log(likes))
  }

  function addComment(data){
    return fetch(commentsURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
  }
})
  
commBox.addEventListener('submit', (e) => {
  e.preventDefault()
  // console.log(e)
  let li = document.createElement('li')
  let content = e.target[0].value
  li.innerText = content
  ul.appendChild(li)
  commBox.reset()

  addComment({image_id: imageId, content: content})
  .then((res) => {
    li.dataset.id = res.id
  })
})

