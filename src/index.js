document.addEventListener('DOMContentLoaded', setUpPage)
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3083

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


  function setUpPage(){
    let likeBtn = document.querySelector("#like_button")
    likeBtn.addEventListener("click", handleLike)

    getDetails()

  }

  function getDetails(){
    fetch("https://randopic.herokuapp.com/images/3083")
    .then(res => res.json())
    .then(data => listOfdetails(data))
  }

  function listOfdetails(details){
    const divCard = document.querySelector(".container")
  
   
    const divOne = document.querySelector("#image_card")


    let imagePic = document.querySelector("#image")
    imagePic.src = details.url 

    let name = document.querySelector("#name")
    name.innerText = details.name

    let likeBtn = document.querySelector("#like_button")

    let likes = document.querySelector("#likes")
    likes.innerText = details["like_count"]
  
    
    // // console.log(content)

    // // let ul = document.querySelector("#comment")


    // // let li = document.createElement("li")
    // // li.innerText = content
   
    divCard.appendChild(divOne)
    divOne.appendChild(imagePic)
    divOne.appendChild(name)
    divOne.appendChild(likes)
    likes.appendChild(likeBtn)
  
    // ul.appendChild(li)
    // divOne.appendChild(comments)
    // imagePic.appendChild(li)

  }

  function handleLike(e){
    console.log(e.target.innerText)
    let moreLikes = parseInt(e.target.innerText)
    fetch(imageUR, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({

      })

    })
  }


 