// Template rendering for SocialPost component
import { truncateContent, isContentTruncated } from "./utils.js";

/**
 * Returns the HTML string for the SocialPost component.
 * @param {object} props
 * @param {boolean} isExpanded
 * @returns {string}
 */
export function renderSocialPostTemplate(props, isExpanded) {
  const { displayName, username, avatar, timestamp, content, likes, theme } =
    props;
  const truncated = isContentTruncated(content);
  const displayContent =
    !truncated || isExpanded ? content : truncateContent(content);
  return `
    <article class="post-container" role="article" aria-label="Social media post by ${displayName}">
      <button class="theme-switcher"
              aria-label="Switch to ${
                theme === "light" ? "dark" : "light"
              } theme">
        ${theme === "light" ? "🌙" : "☀️"}
      </button>
      <header class="post-header">
        <img class="avatar"
             src="${avatar}"
             alt="${displayName} profile picture"
             onerror="this.style.display='none'"
             role="img">
        <div class="user-info">
          <p class="display-name">${displayName}</p>
          <p class="username-timestamp">
            <span class="sr-only">Username:</span>@${username} ·
            <time class="timestamp">${timestamp}</time>
          </p>
        </div>
      </header>
      <div class="post-content" role="main">
        <span class="content-text">${displayContent}</span>
      </div>
      ${
        truncated
          ? `
        <button class="see-more-button"
                aria-expanded="${isExpanded}"
                aria-label="${
                  isExpanded ? "Show less content" : "Show more content"
                }">
          ${isExpanded ? "See less" : "See more"}
        </button>
      `
          : ""
      }
      <footer class="post-actions" role="contentinfo">
        <button class="like-button"
                aria-label="Like this post. Currently ${likes} likes"
                aria-pressed="false">
          <svg class="heart-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <span aria-live="polite">${likes}</span>
        </button>
      </footer>
    </article>
  `;
}
