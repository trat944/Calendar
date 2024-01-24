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
// Initial rendering
renderCalendar();
