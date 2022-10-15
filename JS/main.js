// skills section
const skillsSection = document.getElementById("skills");
const progress = document.querySelectorAll(".skill .fill");
// latest events counter
const seconds = document.querySelector("#events .counters .sec");
const minutes = document.querySelector("#events .counters .min");
const hours = document.querySelector("#events .counters .hours");
const days = document.querySelector("#events .counters .days");
// status section
const statsSection = document.getElementById("stats");
const statsNumbers = document.querySelectorAll(".stats .box .num");
let lock = true;
// progress animation starts
window.addEventListener("scroll", progressBars);
// increasing counter animation starts
window.addEventListener("scroll", () => {
  if (window.scrollY >= statsSection.offsetTop - 300 && lock) {
    ubdateCounter();
    lock = false;
  }
  if (window.scrollY <= statsSection.offsetTop - 300) {
    statsNumbers.forEach((number) => {
      number.textContent = 0;
    });
    lock = true;
  }
});
// progress bars animation function
function progressBars() {
  if (window.scrollY >= skillsSection.offsetTop - 200) {
    progress.forEach((bar) => {
      bar.style.width = bar.getAttribute("data-progress");
    });
  } else {
    progress.forEach((bar) => {
      bar.style.width = 0;
    });
  }
}
// counter animation function
function ubdateCounter() {
  statsNumbers.forEach((number) => {
    const target = +number.getAttribute("data-max");
    const increament = target / 100;
    const current = +number.innerText;
    if (current < target) {
      number.innerText = Math.ceil(current + increament);
      setTimeout(ubdateCounter, 80);
    }
  });
}
// events countdown
// target day
const targetDate = new Date("Dec 31, 2022 23:59:59");
let countDown = setInterval(() => {
  // current day
  let currentDate = new Date().getTime();
  // the difference between now and target day
  let diffTime = targetDate - currentDate;
  let daysNumber = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  let hoursNumber = Math.floor(
    (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutesNumber = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
  let secondsNumber = Math.floor((diffTime % (1000 * 60)) / 1000);
  days.innerText = daysNumber < 10 ? `0${daysNumber}` : daysNumber;
  hours.innerText = hoursNumber < 10 ? `0${hoursNumber}` : hoursNumber;
  minutes.innerText = minutesNumber < 10 ? `0${minutesNumber}` : minutesNumber;
  seconds.innerText = secondsNumber < 10 ? `0${secondsNumber}` : secondsNumber;
  if (!daysNumber && !hoursNumber && !minutesNumber && !secondsNumber) {
    let year = targetDate.getFullYear() + 1;
    targetDate.setFullYear(year);
  }
}, 1000);
