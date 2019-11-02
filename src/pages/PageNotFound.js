import React, { Component } from 'react'
import Lottie from '../libraries/Lottie.js'
import Nav0 from '../modules/frontpage/containers/Nav0.jsx'
import Footer from '../modules/frontpage/components/Footer1.jsx'

class PageNotFound extends Component {
  render() {
    return (
      <div>
        <Nav0 />
        <div className='margin-navbar'></div>
        <div
          style={{
            height: '80vh',
          }}
        >
          <Lottie
            options={{
              animationData: require('../assets/animations/404-page.json'),
            }}
            width='70%'
          />
        </div>
        <Footer />
      </div>
    )
  }
}

export default PageNotFound
