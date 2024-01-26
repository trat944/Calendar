export const domVariables = {
  prevBtn: document.querySelector('#prevMonth') as HTMLButtonElement,
  nextBtn: document.querySelector('#nextMonth') as HTMLButtonElement,
  currentMonthElement: document.getElementById('currentMonth') as HTMLHeadingElement,
  calendarDays: document.querySelector('.days') as HTMLDivElement,
  addEventButton: document.getElementById('showModal') as HTMLButtonElement,
  newEventModal: document.getElementById('newEventModal') as HTMLDivElement,
  closeModalButton: document.getElementById('closeModal') as HTMLButtonElement,
  saveButton: document.getElementById('saveButton') as HTMLButtonElement,
  cancelButton: document.getElementById('cancelButton') as HTMLButtonElement,
  newEventForm: document.getElementById('newEventForm') as HTMLFormElement,
  reminderSelect: document.getElementById('reminder') as HTMLElement,
  title: document.getElementById('title') as HTMLFormElement,
  initialDate: document.getElementById('initialDate') as HTMLFormElement,
  endDate: document.getElementById('endDate') as HTMLFormElement,
  eventType: document.getElementById('eventType') as HTMLFormElement,
  description: document.getElementById('description') as HTMLFormElement
};