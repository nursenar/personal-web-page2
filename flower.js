
document.addEventListener("DOMContentLoaded", () => {

    // Prevent duplicate initialization
    if (document.getElementById("nurs-flower-controls")) {
        return;
    }

    const emojis = ["🌸", "🌼", "🌺", "🌷", "💮"];

    const settings = {
        enabled: localStorage.getItem("flowers-enabled") !== "false",
        density: localStorage.getItem("flowers-density") || "normal",
        speed: localStorage.getItem("flowers-speed") || "normal"
    };

    // Create animation layer
    let container = document.getElementById("flowers-container");

    if (!container) {
        container = document.createElement("div");
        container.id = "flowers-container";
        document.body.appendChild(container);
    }

    container.replaceChildren();

    // Create controls
    const controls = document.createElement("div");
    controls.id = "nurs-flower-controls";

    controls.innerHTML = `
        <button id="flower-toggle" type="button"></button>

        <label>
            Flowers
            <select id="flower-density">
                <option value="low">Few</option>
                <option value="normal">Normal</option>
                <option value="high">Many</option>
            </select>
        </label>

        <label>
            Speed
            <select id="flower-speed">
                <option value="slow">Slow</option>
                <option value="normal">Normal</option>
                <option value="fast">Fast</option>
            </select>
        </label>
    `;

    document.body.appendChild(controls);

    const toggle = document.getElementById("flower-toggle");
    const densitySelect = document.getElementById("flower-density");
    const speedSelect = document.getElementById("flower-speed");

    densitySelect.value = settings.density;
    speedSelect.value = settings.speed;

    let flowerTimer = null;

    const densityIntervals = {
        low: 900,
        normal: 400,
        high: 160
    };

    const speedMultipliers = {
        slow: 1.6,
        normal: 1,
        fast: 0.6
    };

    function createFlower() {

        if (!settings.enabled) return;

        // Avoid excessive DOM elements
        if (container.childElementCount >= 45) return;

        const flower = document.createElement("span");

        flower.className = "nurs-flower";

        flower.textContent =
            emojis[Math.floor(Math.random() * emojis.length)];

        const size = 17 + Math.random() * 20;
        const duration =
            (5 + Math.random() * 4) *
            speedMultipliers[settings.speed];

        flower.style.left = (Math.random() * 95) + "%";
        flower.style.fontSize = size + "px";

        flower.style.setProperty(
            "--flower-duration",
            duration + "s"
        );

        flower.style.setProperty(
            "--flower-drift",
            (Math.random() * 120 - 60) + "px"
        );

        flower.style.setProperty(
            "--flower-rotation",
            (180 + Math.random() * 360) + "deg"
        );

        flower.addEventListener("animationend", () => {
            flower.remove();
        }, { once: true });

        container.appendChild(flower);
    }

    function updateButton() {
        toggle.textContent = settings.enabled
            ? "🌸 Pause Flowers"
            : "🌸 Play Flowers";

        toggle.setAttribute(
            "aria-pressed",
            String(settings.enabled)
        );
    }

    function restartAnimation() {

        clearInterval(flowerTimer);
        flowerTimer = null;

        container.replaceChildren();
        updateButton();

        if (!settings.enabled) return;

        // Create flowers at different times
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                if (settings.enabled) createFlower();
            }, i * 200);
        }

        flowerTimer = setInterval(
            createFlower,
            densityIntervals[settings.density]
        );
    }

    toggle.addEventListener("click", () => {
        settings.enabled = !settings.enabled;

        localStorage.setItem(
            "flowers-enabled",
            settings.enabled
        );

        restartAnimation();
    });

    densitySelect.addEventListener("change", (event) => {
        settings.density = event.target.value;

        localStorage.setItem(
            "flowers-density",
            settings.density
        );

        restartAnimation();
    });

    speedSelect.addEventListener("change", (event) => {
        settings.speed = event.target.value;

        localStorage.setItem(
            "flowers-speed",
            settings.speed
        );

        restartAnimation();
    });

    // Respect system reduced-motion preference
    if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
        localStorage.getItem("flowers-enabled") === null
    ) {
        settings.enabled = false;
    }

    restartAnimation();

});
