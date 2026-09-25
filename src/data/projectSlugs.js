/**
 * Slug map for portfolio projects.
 *
 * Keeps URL slugs separate from project titles so each can evolve
 * independently. The keys are the numeric `id` values from
 * `src/data/constants.js`. The values are the URL-safe slugs used in
 * routes like `/projects/resumeai-pro`.
 *
 * When adding a new project to `constants.js`, add a matching entry
 * here. If the map is missing an entry, `getProjectSlug` falls back to
 * `project-${id}` so the page still works — it will just have a less
 * friendly URL.
 */

export const PROJECT_SLUGS = {
  0: 'nexa-calculator',
  1: 'resumeai-pro',
  2: 'zain-real-estate',
  4: 'maniesta-campus',
  5: 'maniesta-suite',
  6: 'maniesta',
  7: 'maniesta-veyra',
  8: 'maniesta-label',
  9: 'maniesta-travel',
  10: 'maniesta-resume-ai',
  11: 'maniesta-digital',
  12: 'maniesta-school',
  13: 'maniesta-one',
  14: 'maniesta-play',
  15: 'maniesta-weather',
  16: 'maniesta-notes',
};

/**
 * Returns the URL slug for a given project object.
 * @param {{ id: number|string }} project
 * @returns {string}
 */
export const getProjectSlug = project =>
  PROJECT_SLUGS[project?.id] || `project-${project?.id ?? 'unknown'}`;

/**
 * Finds a project by its slug.
 * @param {Array<{ id: number|string }>} projects
 * @param {string} slug
 * @returns {object | null}
 */
export const getProjectBySlug = (projects, slug) => {
  if (!Array.isArray(projects) || !slug) return null;
  return projects.find(p => getProjectSlug(p) === slug) || null;
};
