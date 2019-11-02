import React from 'react'
import Lottie from '../../../libraries/Lottie'

export default () => (
  <div className='loading-session-body'>
    <div className='loading'>
      <Lottie
        options={{
          animationData: require('../../../assets/animations/flight-ticket.json')
        }}
        width={800}
        // height={120}
      />
    </div>
  </div>
)
