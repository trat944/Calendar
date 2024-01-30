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
const createBtnForEachDay = (currentYear, currentMonth, i) => {
    const { initialDate } = domVariables;
    let currentMonthAsString = `${currentMonth + 1}`;
    console.log(currentMonthAsString);
    let currentDayAsString = `${i}`;
    if (currentMonth + 1 < 10) {
        currentMonthAsString = "0" + (currentMonth + 1).toString();
    }
    if (i < 10) {
        currentDayAsString = "0" + i;
    }
    const eventBtn = document.createElement('button');
    eventBtn.innerText = "Add Event";
    eventBtn.classList.add('eventDay');
    eventBtn.addEventListener('click', () => {
        newEventModal.classList.add('active');
        newEventModal.focus();
        initialDate.value = `${currentYear}-${currentMonthAsString}-${currentDayAsString}T12:00`;
    });
    return eventBtn;
};
function renderCalendar() {
    const { currentMonth, currentYear } = variables;
    const { calendarDays, currentMonthElement, initialDate } = domVariables;
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    calendarDays.innerHTML = '';
    const presentTime = highlightPresentDate();
    const { presentDay, presentMonth, presentYear } = presentTime;
    for (let i = 0; i < firstDayOfMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day', 'empty');
        calendarDays.appendChild(dayElement);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        const eventBtn = createBtnForEachDay(currentYear, currentMonth, i);
        dayElement.classList.add('day');
        dayElement.innerText = i.toString();
        if (dayElement.innerText === presentDay.toString() && presentMonth === currentMonth && presentYear === currentYear) {
            dayElement.classList.add('presentDay');
        }
        calendarDays.appendChild(dayElement);
        dayElement.appendChild(eventBtn);
    }
    currentMonthElement.innerText = `${Months[currentMonth]} ${currentYear}`;
}
renderCalendar();
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
const { prevBtn, nextBtn } = domVariables;
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
            const remindDate = getReminderDate();
            setInterval(() => {
                checkReminder(remindDate);
            }, 10000);
        }
        ///añadir evento al día
        closeAndResetModal();
    }
    else {
        highlightIncompleteFields();
    }
});
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
const checkReminder = (remindDate) => {
    const currentDate = new Date();
    if (currentDate > remindDate)
        alert('yepa');
    console.log({ remindDate }, { currentDate });
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
function highlightIncompleteFields() {
    const { eventTitle, initialDate, endDateContainer, endDate, reminderContainer, reminderSelect, description } = domVariables;
    const highlightField = (field) => {
        field.style.border = '2px solid red';
    };
    const resetFieldStyle = (field) => {
        field.style.border = '';
    };
    if (!eventTitle.value || eventTitle.value.length > 60) {
        highlightField(eventTitle);
    }
    else {
        resetFieldStyle(eventTitle);
    }
    if (!initialDate.value) {
        highlightField(initialDate);
    }
    else {
        resetFieldStyle(initialDate);
    }
    if (!endDateContainer.classList.contains('hide') && !endDate.value) {
        highlightField(endDate);
    }
    else {
        resetFieldStyle(endDate);
    }
    if (!reminderContainer.classList.contains('hide') && reminderSelect.value === "0") {
        highlightField(reminderSelect);
    }
    else {
        resetFieldStyle(reminderSelect);
    }
    if (description.value.length > 500) {
        highlightField(description);
    }
    else {
        resetFieldStyle(description);
    }
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
