window.zIndexCounter = 10;

function openWindow(id) {
  const win = document.getElementById(id);
  if (!win) return;

  // Her pencere flex olmalı çünkü .window sınıfı zaten display: flex ile tanımlanmış
  win.style.display = "flex";
  win.style.zIndex = ++window.zIndexCounter;

  // Maksimize et
  win.style.top = "0";
  win.style.left = "0";
  win.style.width = "100%";
  win.style.height = "calc(100vh - 40px)";
  win.classList.add("maximized");

  const title = win.querySelector(".title-bar span")?.innerText || "Pencere";
  addToTaskbar(id, title);
}



// Pencereyi Kapat
function closeWindow(id) {
  document.getElementById(id).style.display = "none";
  removeFromTaskbar(id);
}

// Pencereyi Manuel Maksimize/Küçültme
function maximizeWindow(id) {
  const win = document.getElementById(id);
  if (win.classList.contains("maximized")) {
    win.style.width = "350px";
    win.style.height = "auto";
    win.style.top = "120px";
    win.style.left = "100px";
    win.classList.remove("maximized");
  } else {
    win.style.top = "0";
    win.style.left = "0";
    win.style.width = "100%";
    win.style.height = "calc(100vh - 40px)";
    win.classList.add("maximized");
  }
}

// Pencereyi Minimize Et
function minimizeWindow(id) {
  const win = document.getElementById(id);
  win.style.display = "none";

  const btn = document.getElementById(`task-btn-${id}`);
  if (btn) btn.classList.remove("active");
}

// Başlat Menüsünü Aç/Kapat
function toggleStartMenu() {
  const menu = document.getElementById("startMenu");
  menu.style.display = (menu.style.display === "block") ? "none" : "block";

  // Arama temizlensin
  document.getElementById("searchInput").value = "";
  document.querySelector(".start-menu ul").style.display = "none";
}

// Arama ile Menüde Filtreleme
function searchStartMenu() {
  const input = document.getElementById("searchInput");
  const filter = input.value.toLowerCase();
  const ul = document.querySelector(".start-menu ul");
  const items = ul.getElementsByTagName("li");

  let found = false;
  for (let i = 0; i < items.length; i++) {
    const text = items[i].textContent.toLowerCase();
    if (text.includes(filter) && filter.trim() !== "") {
      items[i].style.display = "";
      found = true;
    } else {
      items[i].style.display = "none";
    }
  }

  ul.style.display = found ? "block" : "none";
}

// Pencereyi Sürükleme
let offsetX = 0, offsetY = 0, draggedWindow = null;

function startDrag(event, id) {
  draggedWindow = document.getElementById(id);
  if (draggedWindow.classList.contains("maximized")) return;
  offsetX = event.clientX - draggedWindow.offsetLeft;
  offsetY = event.clientY - draggedWindow.offsetTop;
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", stopDrag);
}

function drag(e) {
  if (!draggedWindow) return;
  draggedWindow.style.left = (e.clientX - offsetX) + "px";
  draggedWindow.style.top = (e.clientY - offsetY) + "px";
}

function stopDrag() {
  draggedWindow = null;
  document.removeEventListener("mousemove", drag);
  document.removeEventListener("mouseup", stopDrag);
}

// CV'yi Tamamen Kapat
function closeAllCV() {
  document.body.innerHTML = "<h1 style='color:white;text-align:center;margin-top:30vh;'>CV Kapatıldı. Teşekkürler!</h1>";
}

// === Görev Çubuğu ===
function addToTaskbar(id, title) {
    const existingBtn = document.getElementById(`task-btn-${id}`);
    if (existingBtn) return;
  
    const taskbar = document.getElementById("taskbarWindows");
    const btn = document.createElement("button");
    btn.id = `task-btn-${id}`;
    btn.className = "taskbar-window-button active";
  
    // ID'ye göre ikon belirle
    let iconSrc = "";
    switch (id) {
      case "about":
        iconSrc = "assets/hakkımda.png";
        break;
      case "projects":
        iconSrc = "assets/project.jpg";
        break;
      case "contact":
        iconSrc = "assets/iletisim.jpg";
        break;
      default:
        iconSrc = "assets/default.png"; // varsa bir default ikon
    }
  
    btn.innerHTML = `<img src="${iconSrc}" class="taskbar-icon" alt="${title}" title="${title}">`;
    btn.onclick = () => toggleWindowFromTaskbar(id);
  
    taskbar.appendChild(btn);
  }
  
  

function removeFromTaskbar(id) {
  const btn = document.getElementById(`task-btn-${id}`);
  if (btn) btn.remove();
}

function toggleWindowFromTaskbar(id) {
  const win = document.getElementById(id);
  const btn = document.getElementById(`task-btn-${id}`);
  const style = window.getComputedStyle(win);
  if (style.display === "none") {
    win.style.display = "flex";
    btn.classList.add("active");
  } else {
    win.style.display = "none";
    btn.classList.remove("active");
  }
}


// Splash ekranını 4 saniyede kapat
window.addEventListener("load", () => {
  setTimeout(() => {
    const splash = document.getElementById("splash-screen");
    if (splash) splash.style.display = "none";

    const taskbar = document.getElementById("taskbar");
    if (taskbar) taskbar.style.display = "flex";
  }, 1000); // 1 saniye sonra splash kapanacak ve taskbar açılacak
});



function openProjectWindow(id) {
  const win = document.getElementById(id);
  if (!win) return;

  win.style.display = "flex";
  win.style.zIndex = ++window.zIndexCounter;
  win.style.top = "0";
  win.style.left = "0";
  win.style.width = "100%";
  win.style.height = "calc(100vh - 40px)";
  win.classList.add("maximized");

  const title = win.querySelector(".title-bar span")?.innerText || "Detay";
  addToTaskbar(id, title);
}


function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const mins = now.getMinutes().toString().padStart(2, '0');
  document.getElementById("xpClock").textContent = `${hours}:${mins}`;
}

// Sayfa yüklenince çalıştır
updateClock();
setInterval(updateClock, 60000); // her dakika güncelle


function closeAllCV() {
  // Sekme kapatmayı dene (sadece window.open ile açıldıysa çalışır)
  window.open('', '_self');
  window.close();
}
