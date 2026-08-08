let userAnswers = {};

// Ordered page sequence
const pageOrder = [
  'startPage','q1','q2','q3','q4','q5','q6','q7','results'
];

// Show page function
function showPage(id) {
  pageOrder.forEach(page => {
    const el = document.getElementById(page);
    if (el) el.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

// Start button
document.getElementById('startBtn').addEventListener('click', () => {
  showPage('q1');
});

// Next question function
function nextQuestion(currentId, answer) {
  userAnswers[currentId] = answer;

  const currentIndex = pageOrder.indexOf(currentId);
  if (currentIndex >= 0 && currentIndex < pageOrder.length - 1) {
    const nextId = pageOrder[currentIndex + 1];
    showPage(nextId);

    if (nextId === 'results') displayResults();
  }
}

// Logic to calculate outcome based on answers
function calculateOutcome(answers) {
  const points = { AP:0, SO:0, AF:0, IU:0, DG:0 };

  switch(answers.q1) {
    case 'Art': points.AP++; points.DG++; break;
    case 'Politics': points.AF++; break;
    case 'Entertainment': points.AP++; points.DG++; break;
    case 'Technology': points.DG++; points.AF++; break;
  }

  switch(answers.q2) {
    case 'Like': points.AF++; break;
    case 'Comment': points.AP++; points.AF++; break;
    case 'Share': points.AP++; points.DG++; break;
    case 'Scroll': points.SO++; points.IU++; break;
  }

  switch(answers.q3) {
    case 'A': points.AP++; points.AF++; break;
    case 'B': points.DG++; break;
    case 'C': points.AF++; break;
  }

  switch(answers.q4) {
    case 'A-funny': points.AP++; break;
    case 'B-serious': points.AF++; break;
    case 'C-aspiration': points.AP++; points.DG++; break;
  }

  switch(answers.q5) {
    case 'Yes': points.AP++; points.DG++; break;
    case 'No': points.AF++; break;
    case 'Unsure': points.DG++; points.IU++; break;
  }

  switch(answers.q6) {
    case 'Similar': points.AP++; points.AF++; break;
    case 'Unexpected': points.DG++; points.IU++; break;
  }

  switch(answers.q7) {
    case 1:
    case 2:
      points.SO++; points.IU++; break;
    case 3:
      points.AF++; break;
    case 4:
    case 5:
      points.AP++; points.AF++; break;
  }

  let maxPoints = 0;
  let outcome = '';

  for (const key in points) {
    if (points[key] > maxPoints) {
      maxPoints = points[key];
      outcome = key;
    }
  }

  const tieBreakerPriority = ['AP','DG','AF','SO','IU'];
  const topScores = Object.keys(points).filter(k => points[k] === maxPoints);

  if (topScores.length > 1) {
    for (const key of tieBreakerPriority) {
      if (topScores.includes(key)) {
        outcome = key;
        break;
      }
    }
  }

  return outcome;
}

// Display results (UPDATED)
function displayResults() {
  const container = document.getElementById('resultsContainer');
  container.innerHTML = '';

  const finalOutcomeKey = calculateOutcome(userAnswers);

  const outcomeImages = {
    AP: 'assets/images/Outcome A.png',
    SO: 'assets/images/Outcome B.png',
    AF: 'assets/images/Outcome C.png',
    IU: 'assets/images/Outcome D.png',
    DG: 'assets/images/Outcome E.png'
  };

  const warningImages = {
    AP: 'assets/images/Outcome A warning.png',
    SO: 'assets/images/Outcome B warning.png',
    AF: 'assets/images/Outcome C warning.png',
    IU: 'assets/images/Outcome D warning.png',
    DG: 'assets/images/Outcome E warning.png'
  };

  // Wrapper for both images
  const imageWrapper = document.createElement('div');
  imageWrapper.style.display = 'flex';
  imageWrapper.style.alignItems = 'center';
  imageWrapper.style.justifyContent = 'center';
  imageWrapper.style.gap = '30px';
  imageWrapper.style.flexWrap = 'wrap';

  // Outcome image
  const img = document.createElement('img');
  img.src = outcomeImages[finalOutcomeKey];
  img.alt = `Outcome ${finalOutcomeKey}`;
  img.style.width = '400px';
  img.style.height = 'auto';
  img.classList.add('outcome-spin');
  img.style.cursor = 'pointer';

  const link = document.createElement('a');
  link.href = outcomeImages[finalOutcomeKey];
  link.target = '_blank';
  link.appendChild(img);

  // Warning image
  const warningImg = document.createElement('img');
  warningImg.src = warningImages[finalOutcomeKey];
  warningImg.alt = `Warning for Outcome ${finalOutcomeKey}`;
  warningImg.style.width = '280px';
  warningImg.style.height = 'auto';

  // Add both to wrapper
  imageWrapper.appendChild(link);
  imageWrapper.appendChild(warningImg);

  // Add to page
  container.appendChild(imageWrapper);

  // Button functionality
  const existingButton = document.querySelector('#results button');
  existingButton.onclick = goToNextSection;
}

// Redirect to external website
function goToNextSection() {
  window.location.href = 'https://isabellegriffiths.my.canva.site/dissertation-website';
}