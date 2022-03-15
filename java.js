let iconList = {
	"AdobeXD": "icons/adobeXd.png",
	"Bootstrap": "icons/bootstrap.png",
	"Codepen": "icons/codepen.png",
	"CSS3": "icons/css3.png",
	"GIT": "icons/git.png",
	"Github": "icons/github.png",
	"HTML5": "icons/html5.png",
	"JavaScript": "icons/javascript.png",
	"jQuery": "icons/jquery.png",
	"Node.js": "icons/node.js.png",
	"React.js": "icons/react.js.png",
	"Redux": "icons/redux.png",
	"Sass": "icons/sass.png"
}
let projImageList = {
	"Leads Tracker": "projects/screenshots/lTracker.png",
	"Tribute Page": "images/logoWhite.png",//"projects/screenshots/tPage.png",
	"Blackjack Game": "projects/screenshots/bjGame.png",
	"Tech Document Website": "images/logoWhite.png",//"projects/screenshots/tdWebsite.png",
	"Coming soon project": "images/logoWhite.png" //"projects/screenshots/csProject.png"
}
// let contactIcons = {
	// "email": "icons/email.png",
	// "insta": "icons/ig.png",
	// "LinkedIn": "icons/linkedin.png",
	// "twitter": "icons/twitter.png",
	// "youtube": "icons/youtube.png",
// }

let projectImagesEl = document.getElementById("projectImages")
let iconsEl = document.getElementById("icons")
let socialsEl= document.getElementById("socials")

function displayIcons() {
	for (let k in iconList) {
	iconsEl.innerHTML += 
`
	<img src = ${iconList[k]} alt = "${k} logo"></img>
	 <span>${k}</span>
`
	} 
}
function displayProjectScreenshots() {
	let count = 0
	for (let k in projImageList) {
		count++
		if (count === 1, 3, 5) {
					projectImagesEl.innerHTML += 
		`
			<img class = "left-float mid-img" src = ${projImageList[k]}>
		`
		} else {
					projectImagesEl.innerHTML += 
		`
			<img class = "right-float mid-img"  src = ${projImageList[k]}>
		`		
		}
	}
}
// function displayContactIcons() {
	// for (let k in contactIcons) {
		// iconsEl.innerHTML += 
	// `
		// <img src = ${contactIcons[k]} alt = "${k} logo"></img>
	// `
	// } 
// }

displayIcons()
displayProjectScreenshots()
// displayContactIcons()

