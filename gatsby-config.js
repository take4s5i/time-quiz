/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const prefix = process.env.SITE_PREFIX

module.exports = {
  /* Your site config here */
  plugins: ['gatsby-plugin-styled-components'],
  pathPrefix: prefix,
}
