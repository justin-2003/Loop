import React,{useEffect, useState} from 'react';
import "./homePage.css";

function HomePage(){
    const [user, setUser] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:4000/home/me")
        .then(res => res.json())
        .then(data => setUser(data));
    }, []);

    
    return (
        <div className='home-page'>
                  <div className='home-card'>

            {user ? (
                <h1>Hi {user.display_name}</h1>
            ) : (
                <h1>Loading...</h1>
            )}
  
        </div>
        </div>
    );
}

export default HomePage;