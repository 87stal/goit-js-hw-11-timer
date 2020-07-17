import { getDays, getHours, getMins, getSecs } from './timerUtils.js';

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
  }

  marckup(selector) {
    const template = `
    <div class="field">
           <span class="value" data-value="days"></span>
           <span class="label">Days</span>
         </div>

         <div class="field">
           <span class="value" data-value="hours"></span>
           <span class="label">Hours</span>
         </div>
       
         <div class="field">
           <span class="value" data-value="mins"></span>
           <span class="label">Minutes</span>
         </div>
       
         <div class="field">
           <span class="value" data-value="secs"></span>
           <span class="label">Seconds</span>
         </div>
       `;
    document.querySelector(selector).insertAdjacentHTML('beforeend', template);
  }
  updateClockface(time, id) {
    if (time <= 0) {
      document.querySelectorAll('.value').textContent = ``;
      clearInterval(id);
      return;
    }
    const days = getDays(time).toString().padStart(2, 0);
    const hours = getHours(time).toString().padStart(2, 0);
    const minutes = getMins(time).toString().padStart(2, 0);
    const seconds = getSecs(time).toString().padStart(2, 0);

    document.querySelector('span[data-value="days"]').textContent = `${days}`;
    document.querySelector('span[data-value="hours"]').textContent = `${hours}`;
    document.querySelector(
      'span[data-value="mins"]',
    ).textContent = `${minutes}`;
    document.querySelector(
      'span[data-value="secs"]',
    ).textContent = `${seconds}`;
  }
 
  start() {
    const intervalId = setInterval(() => {
      const dataNow = Date.now();
      const deltaTime = this.targetDate - dataNow;
      this.updateClockface(deltaTime, intervalId);
    }, 1000);
    this.marckup(this.selector);
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Sep 1, 2020'),
});
timer.start();
