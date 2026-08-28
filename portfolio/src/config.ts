/** Knobs that were canvas-editor props in the original design file. */
export const config = {
  /** Play motion even when the OS asks for reduced motion. Leave false. */
  forceMotion: false,
  /** Where the downloadable CV lives, anchored to the deploy base. */
  resumeHref: `${import.meta.env.BASE_URL}assets/Resume-Eduardo-Azuolas-Product-Designer-UX-UI.pdf`,
  email: 'eduardoazuolas@gmail.com',
  linkedin: 'https://www.linkedin.com/in/eduardo-azuolas',
  name: 'Eduardo Azuolas',
} as const;
