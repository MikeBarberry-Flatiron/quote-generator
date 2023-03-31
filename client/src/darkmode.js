let selected_mode = "light";

const toggleMode = (
  iconName,
  iconClass,
  background,
  iconColor,
  currentMode
) => {
  const body = document.getElementById("body");
  body.classList.toggle("darkMode");

  const oldIcon = document.getElementById(iconName === "sun" ? "moon" : "sun");
  const newIcon = document.createElement("i");
  newIcon.id = iconName;
  newIcon.className = iconClass;

  toggleButton.replaceChild(newIcon, oldIcon);
  toggleButton.style.background = background;
  toggleButton.style.color = iconColor;

  const posts = document.querySelectorAll(".post");
  posts.forEach(
    (post) => (post.style.boxShadow = `3px 4px 3px 4px ${background}`)
  );

  selected_mode = currentMode;
  localStorage.setItem("mode", currentMode);
};

window.addEventListener("load", () => {
  const mode = localStorage.getItem("mode");
  if (mode === "dark") {
    toggleMode("sun", "fa fa-sun-o", "white", "rgb(48, 48, 48)", "dark");
  }
});

const toggleButton = document.getElementById("toogle-dark-mode");
toggleButton.addEventListener("click", function () {
  selected_mode === "light"
    ? toggleMode("sun", "fa fa-sun-o", "white", "rgb(48, 48, 48)", "dark")
    : toggleMode("moon", "fa fa-moon-o", "rgb(48, 48, 48)", "white", "light");
});
