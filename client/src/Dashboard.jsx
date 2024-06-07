import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Dashboard({ disabledButtons, handleAvailableClick, handleNotAvailableClick }) {
    const [suc, setSuc] = useState();
    const [fet, setFet] = useState();

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('https://lnmiit-barber-back.onrender.com/Dashboard', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data);
                if (res.data === "Success") {
                    setSuc("Succeeded OK");
                } else {
                    navigate('/login');
                }
            }).catch(err => console.log(err));
    }, [navigate]);

    useEffect(() => {
        axios.get('https://lnmiit-barber-back.onrender.com/Dashboard_1')
            .then(response => {
                console.log(response.data);
                setFet(response.data);
            }).catch(err => console.log(err));
    }, []);

    const status = "Pending";
    const handleClick = (timing) => {
        const token = localStorage.getItem('token');
        axios.post('https://lnmiit-barber-back.onrender.com/dashboard', { timing, status }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(result => {
                console.log(result);
                window.location.reload();
            }).catch(err => console.log(err));
    }

    return (
        <div className='d_container'>
            <navbar className='d_nav'>
                LNMIIT - Barber Shop
            </navbar>
            <div className="d_content">
                <div className="d_header">
                    <h2 className="d_title">Available Time Slots</h2>
                    <p className="d_description">
                        Please select an available time slot for your appointment.
                    </p>
                </div>
                <div className="d_slots">
                    <ul className="d_slotsList">
                        {fet && fet.map((item) => (
                            <li key={item.timing}>
                                <div className="d_slot">
                                    <div className="d_time">{item.timing}</div>
                                    <div className={`d_status ${item.status === 'Accepted' ? 'accepted' : item.status === 'Rejected' ? 'rejected' : 'pending'}`}>
                                        {item.status}
                                    </div>
                                    <div className="d_buttons">
                                        <button
                                            className={`d_button ${disabledButtons[item.timing] ? 'disabled' : ''}`}
                                            onClick={() => handleClick(item.timing)}
                                            disabled={disabledButtons[item.timing] || item.status !== 'Pending'}
                                        >
                                            Book
                                        </button>
                                        <button
                                            className={`d_button ${disabledButtons[item.timing] ? 'disabled' : ''}`}
                                            onClick={() => handleAvailableClick(item.timing)}
                                            disabled={disabledButtons[item.timing] || item.status !== 'Pending'}
                                        >
                                            Available
                                        </button>
                                        <button
                                            className={`d_button ${disabledButtons[item.timing] ? 'disabled' : ''}`}
                                            onClick={() => handleNotAvailableClick(item.timing)}
                                            disabled={disabledButtons[item.timing] || item.status !== 'Pending'}
                                        >
                                            Not Available
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
