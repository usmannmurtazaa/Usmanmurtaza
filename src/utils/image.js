/**
 * Shared image path helpers.
 *
 * Background: the `srcset` attribute is space-delimited. A URL in `srcset`
 * is terminated by the first whitespace, and anything after it is interpreted
 * as a descriptor (like `2x` or `100w`). This means filenames that contain
 * spaces — e.g. "ResumeAi Pro.png" — must be percent-encoded when passed to
 * `srcset`, otherwise the browser drops the candidate entirely.
 *
 * The `src` attribute is more lenient and can take the raw path with spaces.
 * The two helpers below let each caller choose the correct form for the
 * attribute it is rendering.
 */

/**
 * Replace a raster image extension with `.webp`.
 * Non-matching paths are returned unchanged. Falsy input returns ''.
 *
 * @param {string} src
 * @returns {string}
 */
export const toWebp = src => (src ? src.replace(/\.(png|jpe?g|jfif)$/i, '.webp') : '');

/**
 * Build a `srcset`-safe URL for the WebP variant of an image.
 * Applies `toWebp` and then percent-encodes the result so that paths
 * containing spaces (or other characters that must be escaped in a URL)
 * are parsed correctly by the browser.
 *
 * @param {string} src
 * @returns {string}
 */
export const toWebpSrcSet = src => (src ? encodeURI(toWebp(src)) : '');
