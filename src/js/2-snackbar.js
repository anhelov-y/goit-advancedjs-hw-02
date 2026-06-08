import '../css/styles.css';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  // Створюємо новий проміс із затримкою
  createPromise(delay, state)
    .then((ms) => {
      iziToast.success({
        title: "OK",
        message: `✅ Fulfilled promise in ${ms}ms`,
        position: "topRight",
      });
    })
    .catch((ms) => {
      iziToast.error({
        title: "Error",
        message: `❌ Rejected promise in ${ms}ms`,
        position: "topRight",
      });
    });

  form.reset(); // Очищуємо форму після сабміту
});

// Функція-генератор промісу
function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}