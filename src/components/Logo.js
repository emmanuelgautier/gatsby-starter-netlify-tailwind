import { StaticImage } from 'gatsby-plugin-image'
import PropTypes from 'prop-types'
import React from 'react'

export default function Logo({ title, className }) {
  return (
    <StaticImage
      src="../images/gatsby-icon.png"
      formats={['auto', 'webp', 'avif']}
      alt={title}
      title={title}
      className={className}
      placeholder="blurred"
      width={50}
      height={50}
    />
  )
}

Logo.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
}
