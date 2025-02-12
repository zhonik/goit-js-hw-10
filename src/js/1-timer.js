import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  datePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),

  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  mins: document.querySelector('span[data-minutes]'),
  secs: document.querySelector('span[data-seconds]'),
};

const timer = {
  intervalId: null,
  initTime: null,

  start() {
    this.initTime = new Date(refs.datePicker.value).getTime();
    this.intervalId = setInterval(() => {
      this.tick();
    }, 1000);
    refs.startBtn.disabled = true;
    refs.datePicker.disabled = true;
    refs.datePicker.classList.add('disabled');
    refs.startBtn.classList.add('disabled');
  },

  tick() {
    const currentTime = Date.now();
    const deltaTime = this.initTime - currentTime;

    if (deltaTime <= 0) {
      clearInterval(this.intervalId);
      this.updateClockface({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      refs.datePicker.disabled = false;
      refs.datePicker.classList.remove('disabled');
      return;
    }

    const time = this.convertMs(deltaTime);
    this.updateClockface(time);
  },

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  },

  updateClockface({ days, hours, minutes, seconds }) {
    refs.days.textContent = String(days).padStart(2, '0');
    refs.hours.textContent = String(hours).padStart(2, '0');
    refs.mins.textContent = String(minutes).padStart(2, '0');
    refs.secs.textContent = String(seconds).padStart(2, '0');
  },
};

refs.startBtn.addEventListener('click', () => {
  timer.start();
});

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      refs.startBtn.disabled = true;
    } else {
      refs.startBtn.disabled = false;
      refs.startBtn.classList.remove('disabled');
      userSelectedDate = selectedDates[0];
    }
  },
};

flatpickr(refs.datePicker, options);
