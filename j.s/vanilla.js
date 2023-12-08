// Function to change background image
function changeBackground() {
    return setInterval(function () {
        const randomNumber = Math.floor(Math.random() * arrayOfimg.length);
        landingPage.style.backgroundImage = `url(img/${arrayOfimg[randomNumber]})`;
    }, 3000);
}

// Set theme color from localStorage
const storageColor = localStorage.getItem("themeColor");
if (storageColor !== null) {
    document.documentElement.style.setProperty('--main-color', storageColor);

    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");
        if (element.dataset.color === storageColor) {
            element.classList.add("active");
        }
    });
}

// Set background option from localStorage
let randomOption = localStorage.getItem("storedback") === 'true';
let randomInterval;

if (randomOption) {
    randomInterval = changeBackground();
}

// Toggle setting box
document.querySelector('.toggle-setting .gr').addEventListener('click', function () {
    this.classList.toggle('fa-spin');
    document.querySelector('.setting-box').classList.toggle('open');
});

// Handle color switching
const colorLi = document.querySelectorAll('.colors-list li');
colorLi.forEach(li => {
    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
        localStorage.setItem("themeColor", e.target.dataset.color);

        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });

        e.target.classList.toggle("active");
    });
});

// Handle background option switching
const randomBack = document.querySelectorAll('.background-image span');
randomBack.forEach(span => {
    span.addEventListener("click", (e) => {
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });

        e.target.classList.toggle("active");

        if (e.target.dataset.background === "yes") {
            randomOption = true;
            randomInterval = changeBackground();
        } else {
            randomOption = false;
            clearInterval(randomInterval);
        }

        localStorage.setItem("storedback", randomOption.toString());
    });
});

// Scroll event for skills section
let skillsElements = document.querySelectorAll(".skills");
window.onscroll = function () {
    skillsElements.forEach(ourSkills => {
        let ourSkillsOffset = ourSkills.offsetTop;
        let ourSkillsHeight = ourSkills.offsetHeight;
        let windowHeight = window.innerHeight;
        let windowScrollDown = window.scrollY;

        if (windowScrollDown > ourSkillsOffset + ourSkillsHeight - windowHeight) {
            let allSpan = ourSkills.querySelectorAll(".skill-box .skill-progress span");
            allSpan.forEach(span => {
                span.style.width = span.dataset.progress;
            });
        }
    });
};

// Handle image click to show a popup
const ourGallery = document.querySelectorAll(".gallary img");
ourGallery.forEach(img => {
    img.addEventListener('click', e => {
        let popOverlay = document.createElement("div");
        popOverlay.classList.add("pop-overlay");
        document.body.appendChild(popOverlay);

        let popBox = document.createElement("div");
        popBox.classList.add("pop-box");

        if (img.alt !== null) {
            let altText = document.createElement("h3");
            altText.textContent = `${img.alt}`;
            popBox.appendChild(altText);
        }

        let closeButton = document.createElement("span");
        closeButton.classList.add("close-button");
        closeButton.textContent = `X`;
        popBox.appendChild(closeButton);

        let popImage = document.createElement("img");
        popImage.src = img.src;
        popBox.appendChild(popImage);

        document.body.appendChild(popBox);
    });
});

// Close popup when the close button is clicked
document.addEventListener("click", e => {
    if (e.target.className === "close-button") {
        document.querySelector(".pop-overlay").remove();
        document.querySelector(".pop-box").remove();
    }
});

// Handle navigation bullets
const allBullets = document.querySelectorAll(".new .links-new li , .header .links li");
allBullets.forEach(bullet => {
    bullet.addEventListener("click", e => {
        const targetSection = document.querySelector(e.target.dataset.section);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});
document.getElementById('toggleButton').addEventListener('click', function() {
    var menu = document.querySelector('.new .links-new');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
});
