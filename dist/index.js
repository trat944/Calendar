import { variables } from "./variables/variables.js";
import { Months } from "./enums.js";
import { domVariables } from "./variables/dom_variables.js";
const highlightPresentDate = () => {
    const date = new Date;
    const presentDate = {
        presentDay: date.getDate(),
        presentMonth: date.getMonth(),
        presentYear: date.getFullYear()
    };
    return presentDate;
};
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
        // if (dayElement.innerText === highlightPresentDay().presentDay) {
        //   dayElement.classList.add('presentDay');
        // }
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
const { newEventModal, cancelButton, addEventButton, newEventForm, saveButton, closeModalButton, checkEndDate, endDateContainer, reminderContainer, checkRemindDate, reminderSelect, description } = domVariables;
addEventButton.addEventListener('click', () => {
    newEventModal.classList.add('active');
    newEventModal.focus();
});
saveButton.addEventListener('click', () => {
    const formVerification = checkForm();
    if (formVerification) {
        objectCreation();
        localStorage.setItem('event', JSON.stringify(objectCreation()));
        if (objectCreation().reminderSelect) {
            const datee = getReminderDate();
            setInterval(() => {
                checkReminder(datee);
            }, 10000);
        }
        closeAndResetModal();
    }
    else {
        alert('Atiende cojones');
    }
});
const getReminderDate = () => {
    const hourOfDay = objectCreation().initialDate.slice(11);
    const [hour, minute] = hourOfDay.split(':');
    const dayOfEvent = objectCreation().initialDate.slice(0, 10);
    let [year, month, day] = dayOfEvent.split('-');
    const reminder = Number(objectCreation().reminderSelect);
    const minutes = Number(minute) - reminder;
    const reminderDate = new Date();
    reminderDate.setHours(parseInt(hour));
    reminderDate.setMinutes(minutes);
    reminderDate.setFullYear(parseInt(year));
    reminderDate.setMonth(parseInt((month)) - 1);
    reminderDate.setDate(parseInt(day));
    return reminderDate;
};
const checkReminder = (datee) => {
    const currentDate = new Date();
    if (currentDate > datee)
        alert('yepa');
    console.log({ datee }, { currentDate });
};
const objectCreation = () => {
    const { eventTitle, initialDate, endDate, checkRemindDate, reminderSelect, description, eventType, checkEndDate } = domVariables;
    const newEvent = {
        eventTitle: eventTitle.value,
        initialDate: initialDate.value,
        checkEndDate: checkEndDate.value,
        endDate: endDate.value,
        checkRemindDate: checkRemindDate.value,
        reminderSelect: reminderSelect.value,
        description: description.value,
        eventType: eventType.value
    };
    return newEvent;
};
cancelButton.addEventListener('click', closeAndResetModal);
closeModalButton.addEventListener('click', closeAndResetModal);
newEventModal.addEventListener('click', (event) => {
    if (event.target === newEventModal) {
        closeAndResetModal();
    }
});
newEventModal.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeAndResetModal();
    }
});
//event checkbox
checkEndDate.addEventListener('change', () => {
    if (endDateContainer.classList.contains('hide')) {
        endDateContainer.classList.remove('hide');
    }
    else
        endDateContainer.classList.add('hide');
});
checkRemindDate.addEventListener('change', () => {
    if (reminderContainer.classList.contains('hide')) {
        reminderContainer.classList.remove('hide');
    }
    else
        reminderContainer.classList.add('hide');
});
function checkForm() {
    const { eventTitle, initialDate, endDate } = domVariables;
    if (!eventTitle.value || eventTitle.value.length > 60)
        return false;
    if (!initialDate.value)
        return false;
    if (!endDateContainer.classList.contains('hide') && !endDate.value)
        return false;
    if (!reminderContainer.classList.contains('hide') && reminderSelect.value === "0")
        return false;
    if (description.length > 500)
        return false;
    else
        return true;
}
function closeAndResetModal() {
    const { eventTitle, initialDate, endDate, description, checkRemindDate, checkEndDate, reminderSelect } = domVariables;
    newEventModal.classList.remove("active");
    reminderSelect.value = "0";
    initialDate.value = "";
    eventTitle.value = "";
    endDate.value = "";
    description.value = "";
    checkRemindDate.checked = false;
    checkEndDate.checked = false;
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
