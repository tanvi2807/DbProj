
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const divStyle = {
    textAlign: 'center',
    padding: '20px',
  };

  
  return (
    <div className='home-page'>
      <div className='home-div' style={divStyle}>
        <p className='welcome'>WELCOME</p>
        <h1>Alumni MAIT</h1>
        <Link to="/adduser">
          <button className="form-button">
            AddUser
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
