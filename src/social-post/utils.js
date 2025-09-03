// Utility functions for SocialPost component

/**
 * Truncate content to a specified length, adding ellipsis if needed.
 * @param {string} content - The content to truncate.
 * @param {number} maxLength - Maximum length before truncation.
 * @returns {string}
 */
export function truncateContent(content, maxLength = 150) {
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength) + "...";
}

/**
 * Check if content is longer than the truncation threshold.
 * @param {string} content
 * @param {number} maxLength
 * @returns {boolean}
 */
export function isContentTruncated(content, maxLength = 150) {
  return content.length > maxLength;
}

/**
 * Get theme color variables based on theme name.
 * @param {string} theme
 * @returns {object}
 */
export function getThemeVars(theme) {
  if (theme === "dark") {
    return {
      bg: "#21242B",
      border: "#A4B1C4",
      textPrimary: "#E8ECF3",
      textSecondary: "#A4B1C4",
      hoverBg: "rgba(164, 177, 196, 0.1)",
    };
  }
  return {
    bg: "#FFFFFF",
    border: "#DEE4ED",
    textPrimary: "#364358",
    textSecondary: "#627288",
    hoverBg: "rgba(98, 114, 136, 0.1)",
  };
}
