import React from 'react';
import axios from "axios";

import RegisterOrLogin from "./components/RegisterOrLogin";
import ProfilePage from "./components/ProfilePage";

import './App.css';

class App extends React.Component{
  state = {
    user: null
  }

  async componentDidMount() {
    const userRes = await axios({
      method: 'GET',
      url: '/users/me'
    })
    
    if(userRes.data) {
      this.setState({user: {user: userRes.data}})
    }
  }

  logout = async () => {
    await axios({
      method: 'GET',
      url: '/users/logout'
    })
    this.setState({user: null})
  }

  render() {
    const { user } = this.state
    return (
      <div className="App">
       App
       {!user && 
       <RegisterOrLogin updateUser={(user) => this.setState({user})} />
       }
       {user &&
       <div>
       <ProfilePage user={user} />
       <button onClick={this.logout}>Log out</button>
       </div>
       }
      </div>
    );
  }
}

export default App;
