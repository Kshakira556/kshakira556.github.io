let iconList = {
	"AdobeXD": "icons/adobeXd.png",
	"Bootstrap": "icons/bootstrap.png",
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
	"Blackjack Game": "projects/screenshots/bjGame.png",
	"Tutor Website": "projects/screenshots/fuzzyness_tutoring.png",
	"Scrum Agile To do list": "projects/screenshots/scrum.png" 
}

let projectImagesEl = document.getElementById("projectImages")
let iconsEl = document.getElementById("icons")
let socialsEl= document.getElementById("socials")

function displayIcons() {
	for (let k in iconList) {
	iconsEl.innerHTML += 
`
	<img src = ${iconList[k]} alt = "${k} logo"></img>
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


displayIcons()
displayProjectScreenshots()

