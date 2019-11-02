import React from 'react'
import ViewList from '../modules/todo/containers/TodoList'

class ViewListPage extends React.Component {
  render () {
    const { history } = this.props
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 10
        }}
      >
        <ViewList history={history} />
      </div>
    )
  }
}

export default ViewListPage
