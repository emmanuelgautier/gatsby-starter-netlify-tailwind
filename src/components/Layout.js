import 'fontsource-open-sans'

import { withPrefix } from 'gatsby'
import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

import useSiteMetadata from '../queries/site-metadata'

import './all.css'

const Layout = ({ children }) => {
  const { color } = useSiteMetadata()

  return (
    <>
      <Helmet>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link
          rel="alternate"
          type="application/rss+xml"
          href={`${withPrefix('/')}rss.xml`}
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix('/')}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-16x16.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix('/')}img/safari-pinned-tab.svg`}
          color="#ff4400"
        />
        <link rel="manifest" href="/manifest.webmanifest" />

        <meta name="theme-color" content={color} />
        <meta name="msapplication-navbutton-color" content={color} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="msapplication-TileColor" content={color} />
      </Helmet>

      <div className="max-w-screen-lg mx-auto antialiased">
        <Navbar />

        <main className="mt-4 lg:mt-12">{children}</main>

        <Footer />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
