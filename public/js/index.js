// TODO organize this mess of a JS file

let introSceneActive = false
const introSceneCommand = "start";
const isMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4));

function onIntroSceneCmdProgress(event) {
    const commandElem = document.querySelector("#command");
    commandElem.innerHTML = introSceneCommand.substring(0, Math.round(event.progress * introSceneCommand.length));
}

/**
 * Gets the age of an individual by birth date
 * @param {Date} birthDate Date of birth
 * @param {Date} currentDate Current date to reference from
 * @returns {Number} Age
 */
 function getAge(birthDate, currentDate) {
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    if (currentDate.getMonth() > birthDate.getMonth()) {
        return age;
    } else if (currentDate.getMonth() === birthDate.getMonth()) {
        if (currentDate.getDate() >= birthDate.getDate()) return age;
    }
    return age - 1;
}

/**
 * Displays the currently selected carousel item
 * 
 * @param {HTMLImageElement} item Image element of the currently selected item. Will be `undefined` if none is selected
 */
function setCarouselItemHover(item) {
    if (item === undefined)
        document.querySelector("#active-tech-text").innerHTML = "&nbsp;";
    else
        document.querySelector("#active-tech-text").innerHTML = item.dataset.hoverText;
}

/**
 * Displays the currently selected carousel item. If this is the same as the currently displayed item, will hide
 * @param {HTMLImageElement} item Image element of the currently selected item 
 */
function toggleCarouselItemHover(item) {
    if (document.querySelector("#active-tech-text").innerHTML === "&nbsp;" || document.querySelector("#active-tech-text").innerHTML !== item.dataset.hoverText)
        document.querySelector("#active-tech-text").innerHTML = item.dataset.hoverText;
    else
        document.querySelector("#active-tech-text").innerHTML = "&nbsp;";
}

function init() {
    // Setup nav toggles
    const navContainer = document.querySelector("nav > div");
    const navButton = document.querySelector("nav > button");
    // Visibility state that the user chose
    let navUserState = false;

    function showNav() {
        navButton.classList.remove("nav-btn--minimized");
        navContainer.classList.remove("nav-content--minimized");
    }

    function hideNav() {
        navButton.classList.add("nav-btn--minimized");
        navContainer.classList.add("nav-content--minimized");
    }

    // Setup navigation minimize functionality
    
    navButton.addEventListener("click", () => {
        if (navButton.classList.contains("nav-btn--minimized")) {
            showNav();
            navUserState = true;
        } else {
            hideNav();
            navUserState = false;
        }
    });

    // Setup title page cursor
    const flashingBlock = document.querySelector(".title--flashing-block");
    setInterval(() => {
        if (flashingBlock.style.background === "none")
            flashingBlock.style.background = "white";
        else
            flashingBlock.style.background = "none";
    }, 530);

    // Calculate age for bio
    document.querySelector("#age-text").innerHTML = getAge(new Date(2003, 8, 24), new Date());

    // Add hover for carousel items
    const imageNodeList = document.querySelectorAll(".language-carousel img");
    for (let i = 0; i < imageNodeList.length; i++) {
        const image = imageNodeList[i];
        image.addEventListener("click", () => toggleCarouselItemHover(image));
        image.addEventListener("mouseenter", () => setCarouselItemHover(image));
        image.addEventListener("mouseleave", () => setCarouselItemHover(undefined));
    }

    // Create carousel with Flickity

    new Flickity(".language-carousel", {
        draggable: true,
        freeScroll: true,
        wrapAround: true,
        autoPlay: true
    })

    // Setup title hook and animation

    const controller = new ScrollMagic.Controller();

    const introScene = new ScrollMagic.Scene({
        duration: 1000,
        triggerHook: 0
    }).setPin("header").addTo(controller)
    .on("progress", onIntroSceneCmdProgress)
    .on("enter", () => {
        introSceneActive = true
        hideNav();
    })
    .on("leave", () => {
        introSceneActive = false
        if (navUserState) {
            showNav();
        }
    });

    // Setup bio history plane

    function generateAirplaneTween() {
        const tween = new TimelineLite();
        tween.add(
            TweenLite.to(".airplane", 1, {
                bezier: {
                    curviness: 1.25,
                    autoRotate: true,
                    values: [
                        {
                            x: 0,
                            y: 0
                        },
                        {
                            x: window.innerWidth / 2,
                            y: 0
                        },
                        {
                            x: window.innerWidth + 600,
                            y: -200
                        }
                    ]
                },
                ease: Power1.easeInOut
            })
        );
        return tween;
    }

    const planeScene = new ScrollMagic.Scene({
        duration: 1000,
        triggerHook: 0,
        triggerElement: ".bio-history"
    }).setPin(".bio-history").setTween(generateAirplaneTween()).addTo(controller).tweenChanges(true)
    .on("enter", () => {
        document.querySelector(".airplane").style.display = "block";
    })
    .on("leave", () => {
        document.querySelector(".airplane").style.display = "none";
    });

    window.addEventListener("resize", (ev) => {
        planeScene.removeTween(false).setTween(generateAirplaneTween());
    });

    // Change the towers of hanoi to an iframe if on desktop
    if (!isMobile) {
        document.querySelector("figcaption#hanoi-caption").innerHTML += "<br />Click to load interactive.";
        document.querySelector("#towers-of-hanoi-img").addEventListener("click", (ev) => {
            ev.preventDefault();
            document.querySelector("#towers-of-hanoi-img").style.display = "none";
            document.querySelector("#towers-of-hanoi-iframe").style.display = "block";
        });
    }
  
    document.querySelector(".page-cover").classList.add("page-cover--inactive");
    setInterval(() => document.querySelector(".page-cover").style.display = "none", 1000);

}

window.addEventListener("load", (ev) => init());