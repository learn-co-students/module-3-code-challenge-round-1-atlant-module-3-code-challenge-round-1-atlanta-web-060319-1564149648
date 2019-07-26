document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3080 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const image = document.getElementById("image")
  const imageName = document.getElementById('name')
  const likes = document.getElementById("likes")
  const like_button = document.getElementById("like_button")
  const commentForm = document.getElementById("comment_form")
  const comments = document.getElementById("comments")
  const commentInput = document.getElementById("comment_input")

 // getall the data
  function getData(){
    fetch(`${imageURL}`)
   .then(response => response.json() )
   .then(data => createDisplay(data))
  }

  //parse info to the page
  function createDisplay(data){
    console.log(data);
  }

  //update the likes to the dom
      //then update the server

  //update likes to the server

  //update the comments to the dom 
       //then update the server

  //update the comments to the server










  getData()
})




