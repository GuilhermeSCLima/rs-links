if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}

let theme = "light";
let themeIcon = "./assets/sun.png";
let containerWidth = 0;

const toggleButton = document.getElementById("theme-toggle");
const themeIconimage = document.getElementById("theme-icon");
const themeSlider = document.getElementById("theme-slider");

const updateThemeAndIcon = (newTheme) => {
  let icon = themeIcon;
  themeIconimage.animate({ rotate: "360deg" }, { duration: 900 });
  if (newTheme === "dark") {
    document.documentElement.classList.add("dark");
    icon = "./assets/moon.png";
    themeSlider.style.transform = `translateX(${containerWidth - 24}px)`;
  } else {
    document.documentElement.classList.remove("dark");
    icon = "./assets/sun.png";
    themeSlider.style.transform = `translateX(0px)`;
  }

  setTimeout(() => {
    themeIconimage.src = icon;
  }, 300);
};

const showApps = () => {
  const applicationSection = document.getElementById("aplications");

  if (!applicationSection) {
    console.error("Elemento #aplications não encontrado.");
    return;
  }

  if (!Array.isArray(apps) || apps.length === 0) {
    applicationSection.innerHTML = `<p class="text-center text-zinc-500 dark:text-zinc-300">Nenhum link disponível.</p>`;
    return;
  }

  const html = apps.map((app) => {
    const safeName = app.name || "Aplicativo";
    const safeUrl = app.url || "#";
    const safeIcon = app.icon || "./assets/logo.png";

    return `
      <a
        href="${safeUrl}"
        class="sm:w-32 w-20 flex flex-col items-center overflow-wrap hover:scale-105 transition-transform"
        target="_blank"
        rel="noopener noreferrer"
        title="${safeName}"
      >
        <img
          class="sm:w-32 sm:h-32 w-16 h-16 rounded-4xl shadow"
          src="${safeIcon}"
          alt="${safeName}"
        />
        <span class="text-center text-sm sm:text-base font-medium mt-2 dark:text-stone-200 text-stone-800">
          ${safeName}
        </span>
      </a>
    `;
  });

  applicationSection.innerHTML = html.join("");
};

document.addEventListener("DOMContentLoaded", () => {
  if (toggleButton) {
    containerWidth = toggleButton.offsetWidth - 20;
  }

  const cookie = GetCookie("theme");
  if (cookie) {
    theme = cookie;
    updateThemeAndIcon(theme);
  } else {
    const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    theme = preferredTheme;
    updateThemeAndIcon(theme);
    SetCookie("theme", preferredTheme, 60 * 60 * 24 * 30);
  }

  showApps();
});

function toggleTheme() {
  theme = theme === "dark" ? "light" : "dark";
  SetCookie("theme", theme, 60 * 60 * 24 * 30);
  updateThemeAndIcon(theme);
}
