import React, { Component } from 'react'
import LoginForm from '../modules/user/containers/LoginForm'
import wall1 from '../assets/images/wall3.jpeg'
import Nav0 from '../modules/frontpage/containers/Nav0'
import Footer from '../modules/frontpage/components/Footer1'

class LoginPage extends Component {
  render() {
    const { history } = this.props
    return (
      <div>
        <Nav0 />
        <div className='margin-only-navbar'></div>
        <div
          style={{
            height: '80vh',
            backgroundImage: `url(${wall1})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              width: 310,
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 25px 1px gray',
            }}
          >
            <LoginForm history={history} />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
export default LoginPage
