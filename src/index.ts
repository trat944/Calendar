import { domVariables } from "./dom_variables";
 enum Months {
  January,
  February,
  March, 
  April, 
  May, 
  June,
  July, 
  August, 
  September, 
  October, 
  November, 
  December
};

let currentMonth: number = new Date().getMonth();

let currentYear: number = new Date().getFullYear();

function renderCalendar(): void {
  const calendarDays = document.querySelector('.days') as HTMLDivElement;

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

  const currentMonthElement = document.getElementById('currentMonth') as HTMLHeadingElement;
  currentMonthElement.innerText = `${Months[currentMonth]} ${currentYear}`;
}

const prevBtn = document.querySelector('#prevMonth') as HTMLButtonElement;
const nextBtn = document.querySelector('#nextMonth') as HTMLButtonElement;

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

// Initial rendering
renderCalendar();