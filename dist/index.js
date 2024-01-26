// import { Event } from "./interface.js";
import { variables } from "./variables/variables.js";
import { Months } from "./enums.js";
import { domVariables } from "./variables/dom_variables.js";
function renderCalendar() {
    const { currentMonth, currentYear } = variables;
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
    let { currentMonth, currentYear } = variables;
    variables.currentMonth = variables.currentMonth === 0 ? 11 : variables.currentMonth - 1;
    if (variables.currentMonth === 11) {
        variables.currentYear -= 1;
    }
};
const checkNextBtn = () => {
    let { currentMonth, currentYear } = variables;
    variables.currentMonth = variables.currentMonth === 11 ? 0 : variables.currentMonth + 1;
    if (variables.currentMonth === 0) {
        variables.currentYear += 1;
    }
};
const loadPreviousMonth = () => {
    prevBtn.addEventListener('click', () => {
        checkPreviousBtn();
        renderCalendar();
    });
};
loadPreviousMonth();
const loadNextMonth = () => {
    nextBtn.addEventListener('click', () => {
        checkNextBtn();
        renderCalendar();
    });
};
loadNextMonth();
// Modal code
const { newEventModal, cancelButton, addEventButton, newEventForm, saveButton, closeModalButton } = domVariables;
const loadModal = () => {
    addEventButton.addEventListener('click', () => {
        newEventModal.classList.add("active");
    });
    //if (cancelButton) {
    cancelButton.addEventListener('click', closeAndResetModal);
    //} 
    closeModalButton.addEventListener('click', closeAndResetModal);
    window.addEventListener('click', (event) => {
        if (event.target === newEventModal) {
            closeAndResetModal();
        }
    });
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeAndResetModal();
        }
    });
};
loadModal();
const submitEvent = () => {
    const { title, initialDate, endDate, eventType, description, } = domVariables;
    saveButton.addEventListener('submit', (event) => {
        // event.preventDefault();
        //   localStorage.setItem('eventTitle', title.value);
        //   localStorage.setItem('eventInitialDate', initialDate.value);
        //   localStorage.setItem('eventEndDate', endDate.value);
        //   localStorage.setItem('eventEventType', eventType.value);
        //   localStorage.setItem('eventDescription', description.value);
        closeAndResetModal();
    });
};
function closeAndResetModal() {
    newEventModal.classList.remove("active");
    newEventForm.reset();
}
// Initial rendering
renderCalendar();
