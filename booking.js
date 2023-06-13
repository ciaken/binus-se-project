document.addEventListener('DOMContentLoaded', function() {
    const currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();
  
    const prevIcon = document.getElementById('prev');
    const nextIcon = document.getElementById('next');
  
    const currentMonthText = document.querySelector('.current-date');
    const daysContainer = document.querySelector('.days');
  
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    function renderCalendar(month, year) {
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
  
      currentMonthText.textContent = `${monthNames[month]} ${year}`;
  
      let daysHTML = '';
  
      // Render the days of the previous month
      for (let i = firstDay.getDay(); i > 0; i--) {
        const day = new Date(year, month, -i + 1);
        daysHTML += `<li class="inactive">${day.getDate()}</li>`;
      }
  
      // Render the days of the current month
      for (let i = 1; i <= lastDay.getDate(); i++) {
        const day = new Date(year, month, i);
        const activeClass = isDateToday(day) ? 'active' : '';
        daysHTML += `<li class="${activeClass}">${day.getDate()}</li>`;
      }
  
      daysContainer.innerHTML = daysHTML;
    }
  
    function updateCalendar() {
      renderCalendar(currentMonth, currentYear);
    }
  
    function isDateToday(date) {
      const today = new Date();
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    }
  
    updateCalendar();
  
    prevIcon.addEventListener('click', function() {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      updateCalendar();
    });
  
    nextIcon.addEventListener('click', function() {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      updateCalendar();
    });
  
    daysContainer.addEventListener('click', function(event) {
      const selectedDay = event.target;
      if (selectedDay.classList.contains('inactive')) {
        return;
      }
      const date = new Date(currentYear, currentMonth, selectedDay.textContent);
      const bookingDate = formatDate(date);
      console.log('Selected Booking Date:', bookingDate);
    });
  
    function formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    }
  });
  