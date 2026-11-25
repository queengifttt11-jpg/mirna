/* ==========================================
   ELEMENT
========================================== */

const pages = document.querySelectorAll(".page");

const startBtn = document.getElementById("startBtn");

const envelope = document.getElementById("envelope");

const restartBtn = document.getElementById("restartBtn");

const bgm = document.getElementById("bgm");

const hugBtn = document.getElementById("hugBtn");

const meterFill = document.getElementById("meterFill");


/* ==========================================
   PAGE STATE
========================================== */

let currentPage = 1;


/* ==========================================
   SHOW PAGE
========================================== */

function showPage(id) {

    pages.forEach(page => {

        page.classList.remove("active");

    });


    const target = document.getElementById(id);

    if (target) {

        target.classList.add("active");

    }

}


/* ==========================================
   MUSIC
========================================== */

document.body.addEventListener("click", () => {

    if (bgm) {

        bgm.play().catch(() => {});

    }

}, {
    once: true
});


/* ==========================================
   PAGE 1 → PAGE 2
========================================== */

if (startBtn) {

    startBtn.addEventListener("click", () => {

        showPage("page2");

    });

}


/* ==========================================
   ENVELOPE
========================================== */

if (envelope) {

    envelope.addEventListener("click", () => {

        envelope.classList.add("open");


        if (meterFill) {

            meterFill.style.width = "25%";

        }


        setTimeout(() => {

            showPage("page3");

        }, 1200);

    });

}


/* ==========================================
   NEXT BUTTON
========================================== */

const nextBtns =
    document.querySelectorAll(".next");


nextBtns.forEach(button => {

    button.addEventListener("click", () => {


        /* ==============================
           PAGE 3 → PAGE 4
        ============================== */

        if (currentPage === 1) {

            showPage("page4");

            currentPage = 2;

        }


        /* ==============================
           PAGE 4 → PAGE 5
        ============================== */

        else if (currentPage === 2) {

            showPage("page5");

            currentPage = 3;

        }


        /* ==============================
           PAGE 5 → PAGE 6
        ============================== */

        else if (currentPage === 3) {

            showPage("page6");

            currentPage = 4;

            currentSlide = 0;

            updateSlider();

        }


        /* ==============================
           PAGE 6 → PAGE 7
        ============================== */

        else if (currentPage === 4) {

            showPage("page7");

            currentPage = 5;

            heartRain();

        }

    });

});


/* ==========================================
   RESTART
========================================== */

if (restartBtn) {

    restartBtn.addEventListener("click", () => {

        currentPage = 1;


        if (envelope) {

            envelope.classList.remove("open");

        }


        if (meterFill) {

            meterFill.style.width = "0%";

        }


        currentSlide = 0;

        updateSlider();


        showPage("page1");

    });

}


/* ==========================================
   MEMORY SLIDER
========================================== */

const memorySlider =
    document.getElementById("memorySlider");

const memoryTrack =
    document.getElementById("memoryTrack");

const memorySlides =
    document.querySelectorAll(".memory-slide");

const memoryDots =
    document.querySelectorAll(".memory-dot");


let currentSlide = 0;


/* ==========================================
   SLIDER POSITION
========================================== */

function updateSlider() {

    if (!memoryTrack) {

        return;

    }


    memoryTrack.style.transform =
        `translate3d(-${currentSlide * 100}%, 0, 0)`;


    memoryDots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentSlide
        );

    });

}


/* ==========================================
   NEXT PHOTO
========================================== */

function nextPhoto() {

    if (memorySlides.length === 0) {

        return;

    }


    if (currentSlide < memorySlides.length - 1) {

        currentSlide++;

    }
    else {

        currentSlide = 0;

    }


    updateSlider();

}


/* ==========================================
   PREVIOUS PHOTO
========================================== */

function previousPhoto() {

    if (memorySlides.length === 0) {

        return;

    }


    if (currentSlide > 0) {

        currentSlide--;

    }
    else {

        currentSlide = memorySlides.length - 1;

    }


    updateSlider();

}


/* ==========================================
   DOT CLICK
========================================== */

memoryDots.forEach((dot, index) => {

    dot.addEventListener("click", (event) => {

        event.stopPropagation();

        currentSlide = index;

        updateSlider();

    });

});


/* ==========================================
   TOUCH SWIPE
========================================== */

if (memorySlider) {

    let touchStartX = 0;

    let touchStartY = 0;

    let touchEndX = 0;

    let touchEndY = 0;


    memorySlider.addEventListener(
        "touchstart",
        (event) => {

            touchStartX =
                event.changedTouches[0].clientX;

            touchStartY =
                event.changedTouches[0].clientY;

        },
        {
            passive: true
        }
    );


    memorySlider.addEventListener(
        "touchend",
        (event) => {

            touchEndX =
                event.changedTouches[0].clientX;

            touchEndY =
                event.changedTouches[0].clientY;


            handleTouchSwipe();

        },
        {
            passive: true
        }
    );


    function handleTouchSwipe() {

        const differenceX =
            touchEndX - touchStartX;

        const differenceY =
            touchEndY - touchStartY;


        /*
           Abaikan kalau gerak lebih dominan
           ke atas / bawah.
        */

        if (
            Math.abs(differenceY) >
            Math.abs(differenceX)
        ) {

            return;

        }


        /*
           Minimal swipe 40px
        */

        if (Math.abs(differenceX) < 40) {

            return;

        }


        /* swipe kiri */

        if (differenceX < 0) {

            nextPhoto();

        }


        /* swipe kanan */

        else {

            previousPhoto();

        }

    }

}


/* ==========================================
   MOUSE DRAG
========================================== */

if (memorySlider) {

    let mouseStartX = 0;

    let mouseEndX = 0;

    let isDragging = false;


    memorySlider.addEventListener(
        "mousedown",
        (event) => {

            isDragging = true;

            mouseStartX = event.clientX;

            memorySlider.classList.add("dragging");

        }
    );


    memorySlider.addEventListener(
        "mousemove",
        (event) => {

            if (!isDragging) {

                return;

            }

            mouseEndX = event.clientX;

        }
    );


    memorySlider.addEventListener(
        "mouseup",
        () => {

            if (!isDragging) {

                return;

            }


            isDragging = false;

            memorySlider.classList.remove("dragging");


            const difference =
                mouseEndX - mouseStartX;


            if (Math.abs(difference) < 40) {

                return;

            }


            if (difference < 0) {

                nextPhoto();

            }
            else {

                previousPhoto();

            }

        }
    );


    memorySlider.addEventListener(
        "mouseleave",
        () => {

            if (!isDragging) {

                return;

            }


            isDragging = false;

            memorySlider.classList.remove("dragging");

        }
    );

}


/* ==========================================
   HEART RAIN
========================================== */

function heartRain() {

    for (let i = 0; i < 80; i++) {

        setTimeout(() => {

            createHeart();

        }, i * 80);

    }

}


/* ==========================================
   CREATE HEART
========================================== */

function createHeart() {

    const heart =
        document.createElement("div");


    heart.className = "heart";


    heart.innerHTML = "💗";


    heart.style.left =
        Math.random() * 100 + "vw";


    heart.style.fontSize =
        (18 + Math.random() * 22) + "px";


    heart.style.animationDuration =
        (5 + Math.random() * 5) + "s";


    document.body.appendChild(heart);


    setTimeout(() => {

        heart.remove();

    }, 9000);

}


/* ==========================================
   FLOATING HEARTS
========================================== */

setInterval(() => {

    createHeart();

}, 1200);


/* ==========================================
   HUG BUTTON
========================================== */

if (hugBtn) {

    hugBtn.addEventListener("click", () => {

        for (let i = 0; i < 30; i++) {

            setTimeout(() => {

                createHeart();

            }, i * 60);

        }


        alert(
            "Makasih ya sayang...Aku bakal berusaha jadi lebih baik🤍"
        );

    });

}


/* ==========================================
   INITIAL
========================================== */

updateSlider();