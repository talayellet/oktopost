class SocialPost extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._likes = 0;
    this._theme = "light";
    this._isExpanded = false;
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
    this.setupEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === "theme") {
        this.updateTheme(newValue);
      } else {
        this.render();
      }
    }
  }

  // Getters and setters for JavaScript properties
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
    return parseInt(this.getAttribute("likes")) || 0;
  }

  set likes(value) {
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
    if (!this.shadowRoot.innerHTML) {
      // If not rendered yet, do a full render
      this.render();
      return;
    }

    // Update CSS custom properties for smooth theme transition
    const container = this.shadowRoot.querySelector(".post-container");
    if (container) {
      container.style.setProperty(
        "--bg-color",
        theme === "dark" ? "#21242B" : "#FFFFFF"
      );
      container.style.setProperty(
        "--border-color",
        theme === "dark" ? "#A4B1C4" : "#DEE4ED"
      );
      container.style.setProperty(
        "--text-primary",
        theme === "dark" ? "#E8ECF3" : "#364358"
      );
      container.style.setProperty(
        "--text-secondary",
        theme === "dark" ? "#A4B1C4" : "#627288"
      );
      container.style.setProperty(
        "--hover-bg",
        theme === "dark"
          ? "rgba(164, 177, 196, 0.1)"
          : "rgba(98, 114, 136, 0.1)"
      );

      // Update theme switcher button content and aria-label
      const themeSwitcher = this.shadowRoot.querySelector(".theme-switcher");
      if (themeSwitcher) {
        themeSwitcher.textContent = theme === "light" ? "🌙" : "☀️";
        themeSwitcher.setAttribute(
          "aria-label",
          `Switch to ${theme === "light" ? "dark" : "light"} theme`
        );
        themeSwitcher.onclick = () =>
          this.setTheme(theme === "light" ? "dark" : "light");
      }
    }
  }

  animateHeart() {
    const heartButton = this.shadowRoot.querySelector(".like-button");
    heartButton.classList.add("pulse");
    setTimeout(() => {
      heartButton.classList.remove("pulse");
    }, 300);
  }

  toggleContent() {
    this._isExpanded = !this._isExpanded;

    // Update content without full re-render for smoother transition
    const contentElement = this.shadowRoot.querySelector(".post-content");
    const seeMoreButton = this.shadowRoot.querySelector(".see-more-button");

    if (contentElement) {
      contentElement.textContent = this.getDisplayContent();

      // Update content display style
      if (!this._isExpanded && this.isContentTruncated()) {
        contentElement.style.cssText += `
          display: -webkit-box;
          -webkit-line-clamp: 3;
          line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        `;
      } else {
        contentElement.style.display = "block";
        contentElement.style.webkitLineClamp = "none";
        contentElement.style.lineClamp = "none";
        contentElement.style.webkitBoxOrient = "unset";
        contentElement.style.overflow = "visible";
      }
    }

    if (seeMoreButton) {
      seeMoreButton.textContent = this._isExpanded ? "See less" : "See more";
      seeMoreButton.setAttribute("aria-expanded", this._isExpanded);
      seeMoreButton.setAttribute(
        "aria-label",
        this._isExpanded ? "Show less content" : "Show more content"
      );
    }
  }

  isContentTruncated() {
    return this.content.length > 150; // Approximate 3 lines worth of text
  }

  getDisplayContent() {
    if (!this.isContentTruncated() || this._isExpanded) {
      return this.content;
    }
    return this.content.substring(0, 150) + "...";
  }

  setupEventListeners() {
    const likeButton = this.shadowRoot.querySelector(".like-button");
    const seeMoreButton = this.shadowRoot.querySelector(".see-more-button");

    if (likeButton) {
      likeButton.addEventListener("click", () => this.incrementLikes());
    }

    if (seeMoreButton) {
      seeMoreButton.addEventListener("click", () => this.toggleContent());
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap');
        
        :host {
          display: block;
          max-width: 400px;
          font-family: 'Inter', sans-serif;
          line-height: 1.5;
        }

        .post-container {
          background: var(--bg-color, ${
            this.theme === "dark" ? "#21242B" : "#FFFFFF"
          });
          border: 1px solid var(--border-color, ${
            this.theme === "dark" ? "#A4B1C4" : "#DEE4ED"
          });
          border-radius: 8px;
          padding: 16px;
          transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
          position: relative;
        }

        .post-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          background: var(--border-color, ${
            this.theme === "dark" ? "#A4B1C4" : "#DEE4ED"
          });
          transition: background-color 0.3s ease;
        }

        .user-info {
          flex: 1;
        }

        .display-name {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-primary, ${
            this.theme === "dark" ? "#E8ECF3" : "#364358"
          });
          margin: 0;
          transition: color 0.3s ease;
        }

        .username-timestamp {
          font-size: 12px;
          color: var(--text-secondary, ${
            this.theme === "dark" ? "#A4B1C4" : "#627288"
          });
          margin: 0;
          transition: color 0.3s ease;
        }

        .post-content {
          font-size: 16px;
          color: var(--text-primary, ${
            this.theme === "dark" ? "#E8ECF3" : "#364358"
          });
          margin-bottom: 16px;
          word-wrap: break-word;
          transition: color 0.3s ease;
          ${
            !this._isExpanded && this.isContentTruncated()
              ? `
            display: -webkit-box;
            -webkit-line-clamp: 3;
            line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          `
              : ""
          }
        }

        .see-more-button {
          background: none;
          border: none;
          color: var(--text-secondary, ${
            this.theme === "dark" ? "#A4B1C4" : "#627288"
          });
          cursor: pointer;
          font-size: 14px;
          padding: 4px 0;
          margin-top: 4px;
          text-decoration: underline;
          border-radius: 2px;
          transition: color 0.3s ease, opacity 0.2s ease;
        }

        .see-more-button:hover {
          opacity: 0.8;
        }

        .see-more-button:focus {
          outline: 2px solid #0066CC;
          outline-offset: 2px;
        }

        .post-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .like-button {
          display: flex;
          align-items: center;
          gap: 4px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 20px;
          transition: background-color 0.2s ease, color 0.3s ease;
          color: var(--text-secondary, ${
            this.theme === "dark" ? "#A4B1C4" : "#627288"
          });
          font-size: 12px;
        }

        .like-button:hover {
          background: var(--hover-bg, ${
            this.theme === "dark"
              ? "rgba(164, 177, 196, 0.1)"
              : "rgba(98, 114, 136, 0.1)"
          });
        }

        .like-button:focus {
          outline: 2px solid #0066CC;
          outline-offset: 2px;
        }

        .like-button.pulse {
          animation: heartPulse 0.3s ease;
        }

        .heart-icon {
          width: 16px;
          height: 16px;
          fill: currentColor;
        }

        @keyframes heartPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        .theme-switcher {
          position: absolute;
          top: 16px;
          right: 16px;
          background: none;
          border: 1px solid var(--border-color, ${
            this.theme === "dark" ? "#A4B1C4" : "#DEE4ED"
          });
          border-radius: 4px;
          padding: 4px 8px;
          cursor: pointer;
          font-size: 12px;
          color: var(--text-secondary, ${
            this.theme === "dark" ? "#A4B1C4" : "#627288"
          });
          transition: border-color 0.3s ease, color 0.3s ease, opacity 0.2s ease;
        }

        .theme-switcher:hover {
          opacity: 0.8;
        }

        .theme-switcher:focus {
          outline: 2px solid #0066CC;
          outline-offset: 2px;
        }

        /* Responsive design */
        @media (max-width: 480px) {
          .post-container {
            padding: 12px;
          }
          
          .post-header {
            margin-bottom: 12px;
          }
          
          .avatar {
            width: 36px;
            height: 36px;
          }
        }

        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          .like-button.pulse,
          .post-container {
            animation: none;
            transition: none;
          }
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      </style>

      <article class="post-container" role="article" aria-label="Social media post by ${
        this.displayName
      }">
        <button class="theme-switcher" 
                onclick="this.getRootNode().host.setTheme('${
                  this.theme === "light" ? "dark" : "light"
                }')"
                aria-label="Switch to ${
                  this.theme === "light" ? "dark" : "light"
                } theme">
          ${this.theme === "light" ? "🌙" : "☀️"}
        </button>
        
        <header class="post-header">
          <img class="avatar" 
               src="${this.avatar}" 
               alt="${this.displayName} profile picture" 
               onerror="this.style.display='none'"
               role="img">
          <div class="user-info">
            <p class="display-name">${this.displayName}</p>
            <p class="username-timestamp">
              <span class="sr-only">Username:</span>@${this.username} · 
              <time class="timestamp">${this.timestamp}</time>
            </p>
          </div>
        </header>

        <div class="post-content" role="main">
          ${this.getDisplayContent()}
        </div>
        
        ${
          this.isContentTruncated()
            ? `
          <button class="see-more-button" 
                  aria-expanded="${this._isExpanded}"
                  aria-label="${
                    this._isExpanded ? "Show less content" : "Show more content"
                  }">
            ${this._isExpanded ? "See less" : "See more"}
          </button>
        `
            : ""
        }

        <footer class="post-actions" role="contentinfo">
          <button class="like-button" 
                  aria-label="Like this post. Currently ${this.likes} likes"
                  aria-pressed="false">
            <svg class="heart-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span aria-live="polite">${this.likes}</span>
          </button>
        </footer>
      </article>
    `;

    // Set initial CSS custom properties for theme
    this.updateTheme(this.theme);
    this.setupEventListeners();
  }
}

customElements.define("social-post", SocialPost);
