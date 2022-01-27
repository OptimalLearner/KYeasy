const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");

let formStepsNum = 0;

nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum++;
    updateFormSteps();
    updateProgressbar();
  });
});

prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum--;
    updateFormSteps();
    updateProgressbar();
  });
});

function updateFormSteps() {
  formSteps.forEach((formStep) => {
    formStep.classList.contains("form-step-active") &&
      formStep.classList.remove("form-step-active");
  });

  formSteps[formStepsNum].classList.add("form-step-active");
}

function updateProgressbar() {
  progressSteps.forEach((progressStep, idx) => {
    if (idx < formStepsNum + 1) {
      progressStep.classList.add("progress-step-active");
    } else {
      progressStep.classList.remove("progress-step-active");
    }
  });

  const progressActive = document.querySelectorAll(".progress-step-active");

  progress.style.width =
    ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}

var times = {}, re = /^\d+(?=:)/;

for (var i = 13, n = 1; i < 24; i++, n++) {
  times[i] = n < 10 ? "0" + n : n
}

document.getElementById("end-time")
.onchange = function() {
  var time = this
  , value = time.value
  , match = value.match(re)[0];
  this.nextElementSibling.innerHTML =
  (match && match >= 13 ? value.replace(re, times[match]) : value)
  + (time.valueAsDate.getTime() < 43200000 ? " AM" : " PM")
}

function getData()
{
    //gettting the values
    const fullname = document.getElementById('fullname').value;
    localStorage.setItem("FULLNAME", fullname );
    return;
}

