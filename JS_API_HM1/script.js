import { workouts } from "./data.js";

const workoutsInfo = JSON.parse(workouts);

const scheduleElement = document.getElementById("schedule");

workoutsInfo.forEach((item) => {
  const { name, time, maxParticipants } = item;
  let { currentParticipants } = item;

  const listItem = document.createElement("div");
  listItem.classList.add("card", "mb-3");

  listItem.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">${item.name}</h5>
      <p class="card-text">Время: ${item.time}</p>
      <p class="card-text">Максимальное количество участников: ${item.maxParticipants}</p>
      <p class="card-text" id="currentParticipants">Текущее количество участников: ${item.currentParticipants}</p>
      <button class="btn btn-primary" id="${item.name}">Записаться</button>
      <button class="btn btn-danger disabled" id="cancel-${item.name}">Отменить запись</button>
    </div>`;

  scheduleElement.appendChild(listItem);

  const cancelButton = listItem.querySelector(".btn-danger");

  const signUpButton = listItem.querySelector(".btn-primary");

  setEventListeners(signUpButton, cancelButton, item.id);
  function setEventListeners(add, remove, id) {
    add.removeEventListener("click", addFunc);
    remove.removeEventListener("click", removeFunc);
    add.addEventListener("click", addFunc);
    remove.addEventListener("click", removeFunc);

    function addFunc() {
      workoutsInfo.forEach((el) => {
        if (el.id === id) {
          console.log(el.id, id);
          currentParticipants++;
          listItem.querySelector(
            ".card-text:last-of-type"
          ).textContent = `Текущее количество участников: ${currentParticipants}`;
          signUpButton.classList.add("disabled");
          signUpButton.nextElementSibling.classList.remove("disabled");
        }
        if (currentParticipants == maxParticipants) {
          signUpButton.classList.add("disabled");
        }
      });
    }
    function removeFunc() {
      workoutsInfo.forEach((el) => {
        if (el.id === id && !currentParticipants == 0) {
          currentParticipants--;
          listItem.querySelector(
            ".card-text:last-of-type"
          ).textContent = `Текущее количество участников: ${currentParticipants}`;
          cancelButton.classList.add("disabled");
          cancelButton.previousElementSibling.classList.remove("disabled");
        }
      });
    }
  }
});
