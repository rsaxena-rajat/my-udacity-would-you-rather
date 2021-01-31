import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleInitialData} from './actions/shared'
import Dashboard from './components/dashboard'
import SignIn from './components/signin'

class App extends Component{
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  
  render() {
    const {loggedIn} = this.props
    return (
      <div>
        {!loggedIn && (<SignIn />)}
        {loggedIn && (<Dashboard />)}
      </div>
    )
  }
}

function mapStateToProps({authedUser}) {
  return {
      loggedIn: authedUser !== null
  }
}

export default connect(mapStateToProps)(App)
