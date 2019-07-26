document.addEventListener('DOMContentLoaded', getImage)
document.addEventListener('submit', submitComment)
document.addEventListener('click', likeImage)

  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3050 //Enter the id from the fetched image here

  const imageURL = 'https://randopic.herokuapp.com/images/3050'

  const likeURL = 'https://randopic.herokuapp.com/likes/3050'

  const commentsURL = 'https://randopic.herokuapp.com/comments/3050'



  function getImage(){
    fetch('https://randopic.herokuapp.com/images/3050')
    .then(res => res.json())
    .then(image => populatePage(image))
  }

  function getComments(){
    fetch('https://randopic.herokuapp.com/comments/3050')
    .then(res => res.json)
  }


function populatePage(image){
console.log(image)
  const div = document.querySelector('#image_card')

  div.innerHTML =
  `<img src= "http://blog.flatironschool.com/wp-content/uploads/2016/07/072716-js-saved-web-4-352x200.jpg"/>
  <h4 id="name">"The Internet!"</h4>
  <span>Likes: <span id="likes">Likes Go Here: 0</span>
  </span>
<button id="like_button">Like</button>
<form id="comment_form">
  <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
  <input type="submit" value="Submit"/>
</form>
<ul id="comments">
     <li id = 'individual_comment"></li>
</ul>`
}

function createComment(){

}


