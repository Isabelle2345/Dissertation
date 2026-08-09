```javascript
// ======================================================
// USER ANSWERS
// ======================================================

let userAnswers = {};


// ======================================================
// PAGE ORDER
// ======================================================

const pageOrder = [
    "startPage",
    "q1",
    "q2",
    "q3",
    "q4",
    "q5",
    "q6",
    "q7",
    "results"
];


// ======================================================
// SHOW PAGE
// ======================================================

function showPage(id) {

    console.log("Showing page:", id);

    // Hide every page
    pageOrder.forEach(function(pageId) {

        const page = document.getElementById(pageId);

        if (page) {
            page.classList.remove("active");
        }

    });


    // Show requested page
    const targetPage = document.getElementById(id);

    if (targetPage) {

        targetPage.classList.add("active");

    } else {

        console.error("Page not found:", id);

    }

}


// ======================================================
// START BUTTON
// ======================================================

document.addEventListener("DOMContentLoaded", function() {

    console.log("JavaScript loaded successfully.");

    const startButton =
        document.getElementById("startBtn");


    if (!startButton) {

        console.error(
            "ERROR: startBtn could not be found."
        );

        return;

    }


    console.log("Start button found.");


    startButton.addEventListener("click", function() {

        console.log("Start button clicked.");

        showPage("q1");

    });

});


// ======================================================
// NEXT QUESTION
// ======================================================

function nextQuestion(currentId, answer) {

    console.log(
        "Answer:",
        currentId,
        answer
    );


    // Save answer
    userAnswers[currentId] = answer;


    // Find current page
    const currentIndex =
        pageOrder.indexOf(currentId);


    if (currentIndex === -1) {

        console.error(
            "Current page not found:",
            currentId
        );

        return;

    }


    // Find next page
    const nextIndex =
        currentIndex + 1;


    if (nextIndex >= pageOrder.length) {

        return;

    }


    const nextId =
        pageOrder[nextIndex];


    // Show next page
    showPage(nextId);


    // Display results when reaching results page
    if (nextId === "results") {

        displayResults();

    }

}


// ======================================================
// CALCULATE OUTCOME
// ======================================================

function calculateOutcome(answers) {

    const points = {

        AP: 0,
        SO: 0,
        AF: 0,
        IU: 0,
        DG: 0

    };


    // --------------------------------------------------
    // QUESTION 1
    // --------------------------------------------------

    switch (answers.q1) {

        case "Art":

            points.AP++;
            points.DG++;

            break;


        case "Politics":

            points.AF++;

            break;


        case "Entertainment":

            points.AP++;
            points.DG++;

            break;


        case "Technology":

            points.DG++;
            points.AF++;

            break;

    }


    // --------------------------------------------------
    // QUESTION 2
    // --------------------------------------------------

    switch (answers.q2) {

        case "Like":

            points.AF++;

            break;


        case "Comment":

            points.AP++;
            points.AF++;

            break;


        case "Share":

            points.AP++;
            points.DG++;

            break;


        case "Scroll":

            points.SO++;
            points.IU++;

            break;

    }


    // --------------------------------------------------
    // QUESTION 3
    // --------------------------------------------------

    switch (answers.q3) {

        case "A":

            points.AP++;
            points.AF++;

            break;


        case "B":

            points.DG++;

            break;


        case "C":

            points.AF++;

            break;

    }


    // --------------------------------------------------
    // QUESTION 4
    // --------------------------------------------------

    switch (answers.q4) {

        case "A-funny":

            points.AP++;

            break;


        case "B-serious":

            points.AF++;

            break;


        case "C-aspiration":

            points.AP++;
            points.DG++;

            break;

    }


    // --------------------------------------------------
    // QUESTION 5
    // --------------------------------------------------

    switch (answers.q5) {

        case "Yes":

            points.AP++;
            points.DG++;

            break;


        case "No":

            points.AF++;

            break;


        case "Unsure":

            points.DG++;
            points.IU++;

            break;

    }


    // --------------------------------------------------
    // QUESTION 6
    // --------------------------------------------------

    switch (answers.q6) {

        case "Similar":

            points.AP++;
            points.AF++;

            break;


        case "Unexpected":

            points.DG++;
            points.IU++;

            break;

    }


    // --------------------------------------------------
    // QUESTION 7
    // --------------------------------------------------

    switch (answers.q7) {

        case 1:
        case 2:

            points.SO++;
            points.IU++;

            break;


        case 3:

            points.AF++;

            break;


        case 4:
        case 5:

            points.AP++;
            points.AF++;

            break;

    }


    // ==================================================
    // FIND HIGHEST SCORE
    // ==================================================

    let maxPoints = 0;
    let outcome = "";


    for (const key in points) {

        if (points[key] > maxPoints) {

            maxPoints = points[key];
            outcome = key;

        }

    }


    // ==================================================
    // TIE BREAKER
    // ==================================================

    const tieBreakerPriority = [
        "AP",
        "DG",
        "AF",
        "SO",
        "IU"
    ];


    const topScores =
        Object.keys(points).filter(function(key) {

            return points[key] === maxPoints;

        });


    if (topScores.length > 1) {

        for (
            const key of tieBreakerPriority
        ) {

            if (topScores.includes(key)) {

                outcome = key;

                break;

            }

        }

    }


    console.log(
        "Scores:",
        points,
        "Outcome:",
        outcome
    );


    return outcome;

}


// ======================================================
// DISPLAY RESULTS
// ======================================================

function displayResults() {

    const container =
        document.getElementById(
            "resultsContainer"
        );


    if (!container) {

        console.error(
            "resultsContainer not found."
        );

        return;

    }


    // Clear previous results
    container.innerHTML = "";


    // Calculate outcome
    const finalOutcomeKey =
        calculateOutcome(userAnswers);


    // ==================================================
    // OUTCOME IMAGES
    // ==================================================

    const outcomeImages = {

        AP: "Outcome-A.png",
        SO: "Outcome-B.png",
        AF: "Outcome-C.png",
        IU: "Outcome-D.png",
        DG: "Outcome-E.png"

    };


    // ==================================================
    // WARNING IMAGES
    // ==================================================

    const warningImages = {

        AP: "Outcome-A-warning.png",
        SO: "Outcome-B-warning.png",
        AF: "Outcome-C-warning.png",
        IU: "Outcome-D-warning.png",
        DG: "Outcome-E-warning.png"

    };


    // Check that the outcome exists
    if (!outcomeImages[finalOutcomeKey]) {

        console.error(
            "No outcome image for:",
            finalOutcomeKey
        );

        return;

    }


    // ==================================================
    // IMAGE WRAPPER
    // ==================================================

    const imageWrapper =
        document.createElement("div");


    imageWrapper.className =
        "results-images";


    // ==================================================
    // OUTCOME IMAGE LINK
    // ==================================================

    const link =
        document.createElement("a");


    link.href =
        outcomeImages[finalOutcomeKey];


    link.target = "_blank";


    // ==================================================
    // OUTCOME IMAGE
    // ==================================================

    const img =
        document.createElement("img");


    img.src =
        outcomeImages[finalOutcomeKey];


    img.alt =
        "Outcome " + finalOutcomeKey;


    img.className =
        "outcome-spin";


    // Add image to link
    link.appendChild(img);


    // ==================================================
    // WARNING IMAGE
    // ==================================================

    const warningImg =
        document.createElement("img");


    warningImg.src =
        warningImages[finalOutcomeKey];


    warningImg.alt =
        "Warning for Outcome " +
        finalOutcomeKey;


    warningImg.className =
        "warning-image";


    // ==================================================
    // ADD IMAGES TO PAGE
    // ==================================================

    imageWrapper.appendChild(link);

    imageWrapper.appendChild(warningImg);

    container.appendChild(imageWrapper);

}


// ======================================================
// FINAL BUTTON
// ======================================================

function goToNextSection() {

    window.location.href =
        "https://isabellegriffiths.my.canva.site/dissertation-website";

}
```
