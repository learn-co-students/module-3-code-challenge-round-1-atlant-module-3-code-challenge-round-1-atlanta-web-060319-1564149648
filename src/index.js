document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3078 //This is the id I obtained

  const backupImgURL = "https://randopic.herokuapp.com/images/3078" //This is the URL I obtained.

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetchInfoForPage(backupImgURL)

})

function fetchInfoForPage(imgURL) {
	fetch(imgURL)
	.then((response) => response.json())
	.then((imageInfo) => {
		setupImageCard(imageInfo)
		setupLikeBtn()
		setupCommentBtn()
	})
}

function setupImageCard(imageInfo) {
	let imgCardDiv = document.querySelector('[id="image_card"]')
	let imgCardImg = imgCardDiv.querySelector("img")
	let imgTitle = imgCardDiv.querySelector("#name")
	let imgLikes = imgCardDiv.querySelector("#likes")
	let commentSection = imgCardDiv.querySelector("#comments")
	let commentsArray = imageInfo.comments
	let commentsLis = commentsArray.map((comment) => {return `<li>${comment.content}</li>`}).join(" ")

	imgCardImg.src = imageInfo.url
	imgCardImg.dataset.id = imageInfo.id
	imgTitle.innerText = imageInfo.name
	imgLikes.innerText = imageInfo["like_count"]
	commentSection.innerHTML = commentsLis

}

function setupLikeBtn() {
	let likeBtn = document.querySelector('[id="like_button"]')

	likeBtn.addEventListener("click", handleLikeBtnClick)
}

function handleLikeBtnClick(event) {
	let likeBtn = event.target
	let imgCardDiv = likeBtn.parentNode
	let imgId = imgCardDiv.querySelector("img").dataset.id
	let imgLikes = imgCardDiv.querySelector("#likes")
	const likeURL = `https://randopic.herokuapp.com/likes/`
	let likeBodyObj = {
						image_id: parseInt(imgId)
					  }
	let postConfigObj = {
  						 headers: {
  						 			'Accept': 'application/json', 
  						 			"Content-Type": "application/json" 
  						 		  },
  						 method: 'POST',
  						 body: JSON.stringify(likeBodyObj)
  						}

	imgLikes.innerText = parseInt(imgLikes.innerText) + 1
	fetch(likeURL, postConfigObj)
	.then((response) => response.json())
	.then((resjso) => console.log(resjso))
}

function setupCommentBtn() {
	let commentForm = document.querySelector('[id="comment_form"]') 

	commentForm.addEventListener("submit", handleCommentFormSub)
}

function handleCommentFormSub(event) {
	event.preventDefault()

	const commentsURL = `https://randopic.herokuapp.com/comments/`
	let content = event.target[0].value
	let imgCardDiv = event.target.parentNode
	let imgId = imgCardDiv.querySelector("img").dataset.id
	let commentSection = imgCardDiv.querySelector("#comments")
	let commentBodyObj = {
						  image_id: imgId,
  						  content: content
						 }
	let postConfigObj = {
						 headers: {
  						 			'Accept': 'application/json', 
  						 			"Content-Type": "application/json" 
  						 		  },
  						 method: 'POST',
  						 body: JSON.stringify(commentBodyObj)
						}

	commentSection.innerHTML = commentSection.innerHTML + ` <li>${content}</li>`
	event.target.reset()

	fetch(commentsURL, postConfigObj)
	.then((response) => response.json())
	.then((resjso) => console.log(resjso))
}































