import React from 'react'
import { Link } from 'gatsby'

import useSiteMetadata from '../queries/site-metadata'

import Logo from './Logo'

export default function Navbar() {
  const { title } = useSiteMetadata()

  return (
    <header className="flex items-center justify-between py-2">
      <Link to={`/`} className="px-2 lg:px-0">
        <Logo title={title} />
      </Link>
      <ul className="hidden lg:inline-flex items-center">
        <li key="navbar-blog-index" className="px-2 lg:px-4">
          <Link
            to={`/blog`}
            className="text-gray-500 font-semibold hover:text-gray-700"
          >
            Blog
          </Link>
        </li>
      </ul>
    </header>
  )
}
