import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{i as s}from"./assets/vendor-A92OCY9B.js";const t={form:document.querySelector(".form")};t.form.addEventListener("submit",r=>{r.preventDefault();const o=Number(t.form.delay.value),i=t.form.state.value;new Promise((e,m)=>{setInterval(()=>{i==="fulfilled"?e(o):m(o)},o)}).then(e=>{s.success({title:"Ok",message:`Fulfilled promise in ${e}ms`,position:"topRight"})}).catch(e=>{s.error({title:"Error",message:`Rejected promise in ${e}ms`,position:"topRight"})}),t.form.reset()});
//# sourceMappingURL=2-snackbar.js.map
