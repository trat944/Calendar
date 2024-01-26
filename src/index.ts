import { Months } from "./enums.js";
import { domVariables } from "./dom_variables.js";

let currentMonth: number = new Date().getMonth();

let currentYear: number = new Date().getFullYear();

function renderCalendar(): void {
  const {calendarDays, currentMonthElement} = domVariables;

  const firstDayOfMonth: number = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth: number = new Date(currentYear, currentMonth + 1, 0).getDate();
  calendarDays.innerHTML = '';

  for (let i = 0; i < firstDayOfMonth; i++) {
      const dayElement = document.createElement('div');
      dayElement.classList.add('day', 'empty');
      calendarDays.appendChild(dayElement);
  }

  for (let i = 1; i <= daysInMonth; i++) {
      const dayElement = document.createElement('div');
      dayElement.classList.add('day');
      dayElement.innerText = i.toString();
      calendarDays.appendChild(dayElement);
  }
  currentMonthElement.innerText = `${Months[currentMonth]} ${currentYear}`;
}
const {prevBtn, nextBtn} = domVariables;

const checkPreviousBtn = (): void => {
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  if (currentMonth === 11) {
      currentYear -= 1;
  }
}

const checkNextBtn = (): void => {
  currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  if (currentMonth === 0) {
      currentYear += 1;
  }
}

prevBtn.addEventListener('click', () => {
  checkPreviousBtn();
  renderCalendar();
});

nextBtn.addEventListener('click', () => {
  checkNextBtn();
  renderCalendar();
});


// Modal code
const {newEventModal, cancelButton, addEventButton, newEventForm} = domVariables;

addEventButton.addEventListener('click', () => {
  newEventModal.classList.add("active");
});

if (cancelButton) {
  cancelButton.addEventListener('click', closeAndResetModal);
} 

window.addEventListener('click', (event) => {
  if (event.target === newEventModal) {
    closeAndResetModal();
  }
});

const {title, initialDate, endDate, eventType, description} = domVariables;

newEventForm.addEventListener('submit', (event) => {
  event.preventDefault();
  title.value;
  initialDate.value;
  endDate.value;
  eventType.value;
  description.value;

  localStorage.setItem('eventTitle', title.value);
  localStorage.setItem('eventInitialDate', initialDate.value);
  localStorage.setItem('eventEndDate', endDate.value);
  localStorage.setItem('eventEventType', eventType.value);
  localStorage.setItem('eventDescription', description.value);

  closeAndResetModal();
});

function closeAndResetModal() {
  newEventModal.style.display = 'none';
  newEventForm.reset();
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeAndResetModal();
  }
});

// Initial rendering
renderCalendar();

