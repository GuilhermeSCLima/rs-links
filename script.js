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
  setTimeout(() => {
    toggling = false;
  }, 900);
};

const showApps = () => {
  const applicationSection = document.getElementById("aplications");

  const html = []

  apps.map(app => {
    let text = `
      <a
          href="${app.url}"
          class="sm:w-32 w-16 flex flex-col items-center overflow-wrap"
          target="_blank"
        >
          <img
            class="sm:w-32 sm:h-32 w-16 h-16 rounded-4xl shadow"
            src="${app.icon}"
          />
          <span
            class="text-xl font-semibold dark:text-stone-200 overflow-wrap text-center"
          >
            ${app.name}
          </span>
        </a>
    `
    html.push(text)
  })

  console.table(html)

  applicationSection.innerHTML = html.join('')
}

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
