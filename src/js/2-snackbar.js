import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', e => {
  e.preventDefault();

  const delay = Number(refs.form.delay.value);
  const state = refs.form.state.value;
  const promis = new Promise((resolve, reject) => {
    setInterval(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promis
    .then(delay => {
      iziToast.success({
        title: 'Ok',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });
  refs.form.reset();
});
