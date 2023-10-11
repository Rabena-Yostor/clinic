import React from 'react';

import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
          <h1>Welcome, Patient</h1>
          <p>This is your personal patient dashboard.</p>
          <Link to="/check-perscriptions">
            <button>Check Perscriptions</button>
          </Link>
        </div>
      );
    }



export default Home;
