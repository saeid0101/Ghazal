// =============================
// غزل و محسن — editable settings
// =============================
const CONFIG = {
  // Change this number to the couple's WhatsApp number, country code included.
  whatsappNumber: "4915906407590",
  whatsappMessage: "سلام، با افتخار حضور خودم را در جشن عروسی غزل و محسن تأیید می‌کنم. ♡",
  // Replace this Google Maps search with the exact venue address or a Maps URL.
  //googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Golestan+Garden+Hall+Tehran",
  googleMapsUrl: "  https://www.google.com/maps/place/%D8%AA%D8%A7%D9%84%D8%A7%D8%B1+%D8%AA%D8%B4%D8%B1%DB%8C%D9%81%D8%A7%D8%AA%DB%8C+%D8%AF%DB%8C%D9%BE%D9%84%D9%85%D8%A7%D8%AA%E2%80%AD/@32.6699147,51.6822413,12662m/data=!3m1!1e3!4m10!1m2!2m1!1z2KrYp9mE2KfYsSDYudix2YjYs9uMINin2LXZgdmH2KfZhg!3m6!1s0x3fbc4b8e7c8855b5:0x705026d3dbab14cf!8m2!3d32.7050911!4d51.7614228!15sCiLYqtin2YTYp9ixINi52LHZiNiz24wg2KfYtdmB2YfYp9mGkgEMYmFucXVldF9oYWxs4AEA!16s%2Fg%2F11hd6sqjf1!5m1!1e2?entry=ttu&g_ep=EgoyMDI2MDgxMi4wIKXMDSoASAFQAw%3D%3D",

  // ISO date/time used by the countdown.
  weddingDate: "2026-08-26T17:30:00"
};

const fa = new Intl.NumberFormat("fa-IR");
const $ = (id) => document.getElementById(id);

function updateCountdown(){
  const target = new Date(CONFIG.weddingDate).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor(diff / 3600000) % 24;
  const minutes = Math.floor(diff / 60000) % 60;
  const seconds = Math.floor(diff / 1000) % 60;
  $("days").textContent = fa.format(days).padStart(3, "۰");
  $("hours").textContent = fa.format(hours).padStart(2, "۰");
  $("minutes").textContent = fa.format(minutes).padStart(2, "۰");
  $("seconds").textContent = fa.format(seconds).padStart(2, "۰");
}
updateCountdown();
setInterval(updateCountdown, 1000);

const wa = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;
$("rsvpWhatsApp").href = wa;
$("whatsappRail").href = wa;
$("mapLink").href = CONFIG.googleMapsUrl;

const music = $("bgMusic");
const musicToggle = $("musicToggle");

musicToggle.addEventListener("click", async () => {
  try {
    if (music.paused) {
      await music.play();
      musicToggle.classList.add("playing");
      musicToggle.setAttribute("aria-label", "توقف موسیقی");
    } else {
      music.pause();
      musicToggle.classList.remove("playing");
      musicToggle.setAttribute("aria-label", "پخش موسیقی");
    }
  } catch(e) {
    alert("برای پخش موسیقی، یک بار دیگر روی دکمه موسیقی بزنید.");
  }
});

// Smooth reveal on scroll
const revealEls = document.querySelectorAll(".story-copy, .polaroids, .detail, .gallery-title");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("revealed");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});

revealEls.forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(22px)";
  el.style.transition = "opacity .8s ease, transform .8s ease";
  observer.observe(el);
});

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    revealEls.forEach(el => {
      if(el.classList.contains("revealed")){
        el.style.opacity = "1";
        el.style.transform = "none";
      }
    });
  }, 100);
});

const style = document.createElement("style");
style.textContent = ".revealed{opacity:1!important;transform:none!important}";
document.head.appendChild(style);
