import '../css/styles.css';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector("[data-start]");
const dateInput = document.querySelector("#datetime-picker");

const timerRefs = {
  days: document.querySelector("[data-days]"),
  hours: document.querySelector("[data-hours]"),
  minutes: document.querySelector("[data-minutes]"),
  seconds: document.querySelector("[data-seconds]"),
};

let userSelectedDate = null;
let timerId = null;

// Налаштування календаря flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    
    if (selectedDate <= new Date()) {
      iziToast.error({
        title: "Error",
        message: "Please choose a date in the future",
        position: "topRight",
      });
      startBtn.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startBtn.disabled = false;
    }
  },
};

flatpickr(dateInput, options);

// Запуск таймера
startBtn.addEventListener("click", () => {
  // Блокуємо елементи інтерфейсу під час роботи таймера
  startBtn.disabled = true;
  dateInput.disabled = true;

  timerId = setInterval(() => {
    const currentTime = new Date();
    const deltaTime = userSelectedDate - currentTime;

    if (deltaTime <= 0) {
      clearInterval(timerId);
      updateTimerInterface({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      dateInput.disabled = false; // Розблокуємо інпут після завершення
      return;
    }

    const timeComponents = convertMs(deltaTime);
    updateTimerInterface(timeComponents);
  }, 1000);
});

// Функція оновлення інтерфейсу з додаванням нулів
function updateTimerInterface({ days, hours, minutes, seconds }) {
  timerRefs.days.textContent = addLeadingZero(days);
  timerRefs.hours.textContent = addLeadingZero(hours);
  timerRefs.minutes.textContent = addLeadingZero(minutes);
  timerRefs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

// Допоміжна функція підрахунку часу
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}