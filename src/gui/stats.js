import Stats from "stats.js";

// Create stats panel
export const stats = new Stats();
document.body.appendChild(stats.dom);
stats.dom.style.display = 'none';