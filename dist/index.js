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
renderCalendar();
const { prevBtn, nextBtn } = domVariables;
const checkPreviousBtn = () => {
    variables.currentMonth = variables.currentMonth === 0 ? 11 : variables.currentMonth - 1;
    if (variables.currentMonth === 11) {
        variables.currentYear -= 1;
    }
};
const checkNextBtn = () => {
    variables.currentMonth = variables.currentMonth === 11 ? 0 : variables.currentMonth + 1;
    if (variables.currentMonth === 0) {
        variables.currentYear += 1;
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
const { newEventModal, cancelButton, addEventButton, newEventForm, saveButton, closeModalButton, checkEndDate, endDateContainer, reminderContainer, remindDate, reminderSelect } = domVariables;
saveButton.addEventListener('click', () => {
    checkForm();
    // closeAndResetModal();
});
addEventButton.addEventListener('click', () => {
    newEventModal.classList.add('active');
});
cancelButton.addEventListener('click', closeAndResetModal);
closeModalButton.addEventListener('click', closeAndResetModal);
//evento checkbox
checkEndDate.addEventListener('change', () => {
    if (endDateContainer.classList.contains('hide')) {
        endDateContainer.classList.remove('hide');
    }
    else
        endDateContainer.classList.add('hide');
});
remindDate.addEventListener('change', () => {
    if (reminderContainer.classList.contains('hide')) {
        reminderContainer.classList.remove('hide');
    }
    else
        reminderContainer.classList.add('hide');
});
function checkForm() {
    const { eventTitle, initialDate, checkEndDate, endDate } = domVariables;
    if (!eventTitle.value || eventTitle.value.length > 60)
        console.log('Error');
    if (!initialDate.value)
        console.log('Error');
    if (!endDateContainer.classList.contains('hide') && !endDate.value)
        console.log('error');
    if (!reminderContainer.classList.contains('hide') && reminderSelect.value === "0")
        console.log('calabaza');
}
function closeAndResetModal() {
    newEventModal.classList.remove("active");
    newEventForm.reset();
}
//const submitEvent = () => {
//   const {eventTitle, initialDate, endDate, eventType, description,} = domVariables;
// }
// event.preventDefault();
//   localStorage.setItem('eventTitle', title.value);
//   localStorage.setItem('eventInitialDate', initialDate.value);
//   localStorage.setItem('eventEndDate', endDate.value);
//   localStorage.setItem('eventEventType', eventType.value);
//   localStorage.setItem('eventDescription', description.value);
