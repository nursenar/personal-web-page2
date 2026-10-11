
document.addEventListener("DOMContentLoaded", () => {

    const themeButton = document.createElement("button");

    themeButton.textContent = "🌙 Dark Mode";
    themeButton.className = "theme-toggle";
    themeButton.type = "button";

    document.body.appendChild(themeButton);

    const savedTheme = localStorage.getItem("nursena-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    function updateButton() {
        themeButton.textContent =
            document.body.classList.contains("dark-mode")
            ? "☀️ Light Mode"
            : "🌙 Dark Mode";
    }

    updateButton();

    themeButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        const isDark =
            document.body.classList.contains("dark-mode");

        localStorage.setItem(
            "nursena-theme",
            isDark ? "dark" : "light"
        );

        updateButton();
    });

});
