// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

function setStatus(status) {
  const statusnode = document.getElementById("status"); // تم تصحيح 'decument' إلى 'document'
  statusnode.innerHTML = status ? "online" : "offline";
}

// تعيين الحالة الحالية عند تحميل الصفحة
setStatus(navigator.onLine);

// استماع إلى أحداث الاتصال بالإنترنت أو فقدانه
window.addEventListener("online", () => {
  setStatus(true);
});

window.addEventListener("offline", () => {
  setStatus(false);
});

let notification = new Notification("My Electron App", {
  body: "Somethings !!",
});
