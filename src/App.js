import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {LoadingBar} from 'react-redux-loading'
import {handleInitialData} from './actions/shared'
import Dashboard from './components/dashboard'
import SignIn from './components/signin'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom' 

class App extends Component{

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  
  render() {
    const {loggedIn} = this.props
    return (
      <Router>
        <Fragment>
          <LoadingBar />
            {this.props.loading === true
              ? null
              : <div>
                  <Route path='/signin' exact component={SignIn} />
                  <Route 
                    path='/add'
                    exact 
                    render={props => (
                      loggedIn ?
                        <Dashboard {...props} initialTab={1} /> :
                        <Redirect to={`/signin?redirect_uri=${encodeURIComponent('/add')}`} />
                    )}  
                  />
                  <Route 
                    path='/leaderboard'
                    exact 
                    render={props => (
                      loggedIn ?
                        <Dashboard {...props} initialTab={2} /> :
                        <Redirect to={`/signin?redirect_uri=${encodeURIComponent('/leaderboard')}`} />
                    )}
                  />
                  <Route 
                    path='/questions/:questionId'
                    exact 
                    render={props => {
                      return (loggedIn ?
                        <Dashboard {...props} /> :
                        <Redirect to={`/signin?redirect_uri=${encodeURIComponent(props.location.pathname)}`} />
                      )
                    }}
                  />
                  <Route 
                    path='/'
                    exact
                    render={props => (
                      loggedIn ?
                        <Dashboard {...props} initialTab={0} /> :
                        <Redirect to='/signin' />
                    )}  
                  />
                </div>
              }
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({authedUser}) {
  return {
      loggedIn: authedUser !== null
  }
}

export default connect(mapStateToProps)(App)
