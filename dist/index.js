import { Months } from "./enums.js";
import { domVariables } from "./dom_variables.js";
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
function renderCalendar() {
    const { calendarDays, currentMonthElement } = domVariables;
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
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
const { prevBtn, nextBtn } = domVariables;
const checkPreviousBtn = () => {
    currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    if (currentMonth === 11) {
        currentYear -= 1;
    }
};
const checkNextBtn = () => {
    currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    if (currentMonth === 0) {
        currentYear += 1;
    }
};
prevBtn.addEventListener('click', () => {
    checkPreviousBtn();
    renderCalendar();
});
nextBtn.addEventListener('click', () => {
    checkNextBtn();
    renderCalendar();
});
// Modal code
const { newEventModal, cancelButton, addEventButton, newEventForm } = domVariables;
addEventButton.addEventListener('click', () => {
    newEventModal.classList.add("active");
});
if (cancelButton) {
    cancelButton.addEventListener('click', closeAndResetModal);
}
const { title, initialDate, endDate, eventType, description, saveButton, closeModalButton } = domVariables;
closeModalButton.addEventListener('click', closeAndResetModal);
window.addEventListener('click', (event) => {
    if (event.target === newEventModal) {
        closeAndResetModal();
    }
});
saveButton.addEventListener('submit', (event) => {
    event.preventDefault();
    localStorage.setItem('eventTitle', title.value);
    localStorage.setItem('eventInitialDate', initialDate.value);
    localStorage.setItem('eventEndDate', endDate.value);
    localStorage.setItem('eventEventType', eventType.value);
    localStorage.setItem('eventDescription', description.value);
    closeAndResetModal();
});
function closeAndResetModal() {
    newEventModal.classList.remove("active");
    newEventForm.reset();
}
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeAndResetModal();
    }
});
// Initial rendering
renderCalendar();
