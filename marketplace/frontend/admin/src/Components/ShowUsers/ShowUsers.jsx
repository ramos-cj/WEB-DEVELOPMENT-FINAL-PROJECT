import React, { useState, useEffect } from 'react';
import './ShowUsers.css';

const ShowUsers = () => {
    const [allusers, setAllusers] = useState([]);

    const fetchInfo = async () => {
        try {
            const response = await fetch('http://localhost:4000/allusers');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setAllusers(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    return (
        <div className='showuser'>
            <h1>ALL USERS</h1>
            <div className="showuser-format-main">
                <p>Name</p>
                <p>Email</p>
                <p>Registration Date</p>
            </div>
            <div className="showuser-allusers">
                <hr />
                {allusers.map((user, index) => (
                    <div key={index} className="showuser-format-main showuser-format">
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                        <p>{user.date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShowUsers;
