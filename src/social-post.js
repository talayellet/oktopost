import {
  getThemeVars,
  truncateContent,
  isContentTruncated,
} from "./social-post/utils.js";
import { renderSocialPostTemplate } from "./social-post/template.js";
const styleUrl = new URL("./social-post/styles.css", import.meta.url);
class SocialPost extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._isExpanded = false;
    this._likes = parseInt(this.getAttribute("likes")) || 0;
  }

  static get observedAttributes() {
    return [
      "username",
      "display-name",
      "avatar",
      "timestamp",
      "content",
      "likes",
      "theme",
    ];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === "likes") {
        this._likes = parseInt(newValue) || 0;
      }
      if (name === "theme") {
        this.updateTheme(newValue);
      } else {
        this.render();
      }
    }
  }

  // Getters and setters
  get username() {
    return this.getAttribute("username") || "";
  }
  set username(value) {
    this.setAttribute("username", value);
  }
  get displayName() {
    return this.getAttribute("display-name") || "";
  }
  set displayName(value) {
    this.setAttribute("display-name", value);
  }
  get avatar() {
    return this.getAttribute("avatar") || "";
  }
  set avatar(value) {
    this.setAttribute("avatar", value);
  }
  get timestamp() {
    return this.getAttribute("timestamp") || "";
  }
  set timestamp(value) {
    this.setAttribute("timestamp", value);
  }
  get content() {
    return this.getAttribute("content") || "";
  }
  set content(value) {
    this.setAttribute("content", value);
  }
  get likes() {
    return this._likes;
  }
  set likes(value) {
    this._likes = value;
    this.setAttribute("likes", value.toString());
  }
  get theme() {
    return this.getAttribute("theme") || "light";
  }
  set theme(value) {
    this.setAttribute("theme", value);
  }

  // Methods
  incrementLikes() {
    this.likes = this.likes + 1;
    this.animateHeart();
  }

  setTheme(theme) {
    this.theme = theme;
  }

  updateTheme(theme) {
    // Update CSS custom properties for smooth theme transition
    const container = this.shadowRoot.querySelector(".post-container");
    if (container) {
      const vars = getThemeVars(theme);
      container.style.setProperty("--bg-color", vars.bg);
      container.style.setProperty("--border-color", vars.border);
      container.style.setProperty("--text-primary", vars.textPrimary);
      container.style.setProperty("--text-secondary", vars.textSecondary);
      container.style.setProperty("--hover-bg", vars.hoverBg);
      // Update theme switcher button content and aria-label only
      const themeSwitcher = this.shadowRoot.querySelector(".theme-switcher");
      if (themeSwitcher) {
        themeSwitcher.textContent = theme === "light" ? "🌙" : "☀️";
        themeSwitcher.setAttribute(
          "aria-label",
          `Switch to ${theme === "light" ? "dark" : "light"} theme`
        );
      }
    }
  }

  animateHeart() {
    const heartButton = this.shadowRoot.querySelector(".like-button");
    if (heartButton) {
      heartButton.classList.add("pulse");
      setTimeout(() => {
        heartButton.classList.remove("pulse");
      }, 300);
    }
  }

  toggleContent() {
    this._isExpanded = !this._isExpanded;
    this.render();
  }

  setupEventListeners() {
    const likeButton = this.shadowRoot.querySelector(".like-button");
    const seeMoreButton = this.shadowRoot.querySelector(".see-more-button");
    const themeSwitcher = this.shadowRoot.querySelector(".theme-switcher");
    if (likeButton) {
      likeButton.addEventListener("click", () => this.incrementLikes());
    }
    if (seeMoreButton) {
      seeMoreButton.addEventListener("click", () => this.toggleContent());
    }
    if (themeSwitcher) {
      themeSwitcher.addEventListener("click", () =>
        this.setTheme(this.theme === "light" ? "dark" : "light")
      );
    }
  }

  render() {
    // Attach styles
    if (!this._styleSheet) {
      this._styleSheet = document.createElement("link");
      this._styleSheet.rel = "stylesheet";
      this._styleSheet.href = styleUrl;
      this.shadowRoot.appendChild(this._styleSheet);
    }
    // Render template
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(this._styleSheet);
    this.shadowRoot.innerHTML += renderSocialPostTemplate(
      {
        displayName: this.displayName,
        username: this.username,
        avatar: this.avatar,
        timestamp: this.timestamp,
        content: this.content,
        likes: this._likes,
        theme: this.theme,
      },
      this._isExpanded
    );
    this.updateTheme(this.theme);
    this.setupEventListeners();
  }
}
customElements.define("social-post", SocialPost);
