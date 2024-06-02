import React, { useState, useEffect } from 'react';
import './Dashboard_auth.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


function Dashboard_auth({ disabledButtons, handleAvailableClick, handleNotAvailableClick }){
    const [sucd, setSucd] = useState();
    const [feta, setFeta] = useState([]);


    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('https://lnmiit-barber-back.onrender.com/Dashboard_auth')
            .then(res => {
                console.log(res.data);
                if (res.data === "Success") {
                    setSucd("Succeeded OK");
                } else {
                    navigate('/login');
                }
            })
            .catch(err => console.log(err));
    }, [navigate]);

    useEffect(() => {
        axios.get('backend-plum-alpha-76.vercel.app/Dashboard_1')
            .then(response => {
                console.log(response.data);
                setFeta(response.data);
            }).catch(err => console.log(err));
    }, []);

    const auth_c = (name, time, status, index) => {
        axios.post('backend-plum-alpha-76.vercel.app/updated', { name, time, status })
            .then(result => {
                console.log(result);
                window.location.reload();
            }).catch(err => console.log(err));
    };

    const reject_c = (name, time) => {
        axios.post('backend-plum-alpha-76.vercel.app/rejected', { name, time })
            .then(result => {
                console.log(result);
                window.location.reload();
            }).catch(err => console.log(err));
    };
   

    return (
        <div className='d_containera'>
            <navbar className='d_nava'>
                LNMIIT - Barber Shop
            </navbar>

            <div className="d_contenta">
                <div className="d_buttonsa">
                    <div className="d_bonea">
                        <button className="d_btna" id="b1" disabled={disabledButtons[0] }>9:30 AM </button>
                        
                        <button className="d_btna" id="b2" disabled={disabledButtons[1] }>10:30 AM</button>
                        
                    </div>
                    <div>
                    <button className="available_btn" onClick={() => handleAvailableClick(0)} >Available</button>
                    <button className="not_available_btn "onClick={() => handleNotAvailableClick(0)}>Not Available</button>
                    <button className="available_btn" onClick={() => handleAvailableClick(1)}>Available</button>
                     <button className="not_available_btn" onClick={() => handleNotAvailableClick(1)}>Not Available</button>
                    </div>
                    <div className="d_btwoa">
                        <button className="d_btna" id="b3"disabled={disabledButtons[2] }>11:30 AM</button>
                      
                        <button className="d_btna" id="b4"disabled={disabledButtons[3] }>12:30 PM</button>
                       
                    </div>

                    <div>
                    <button className="available_btn"onClick={() => handleAvailableClick(2)}>Available</button>
                    <button className="not_available_btn"onClick={() => handleNotAvailableClick(2)}>Not Available</button>
                    <button className="available_btn" onClick={() => handleAvailableClick(3)}>Available</button>
                     <button className="not_available_btn"onClick={() => handleNotAvailableClick(3)}>Not Available</button>
                    </div>
                    <div className="d_bthreea">
                        <button className="d_btna" id="b5" disabled={disabledButtons[4] }>2:30 PM</button>
                   
                        <button className="d_btna" id="b6"disabled={disabledButtons[5] }>3:30 PM</button>
                       
                    </div>

                    <div>
                    <button className="available_btn"onClick={() => handleAvailableClick(4)}>Available</button>
                    <button className="not_available_btn"onClick={() => handleNotAvailableClick(4)}>Not Available</button>
                    <button className="available_btn"onClick={() => handleAvailableClick(5)}>Available</button>
                     <button className="not_available_btn"onClick={() => handleNotAvailableClick(5)}>Not Available</button>
                    </div>
                    <div className="d_bfoura">
                        <button className="d_btna" id="b7"disabled={disabledButtons[6] }>4:30 PM</button>
                      
                        <button className="d_btna" id="b8"disabled={disabledButtons[7]}>5:30 PM</button>
                       
                    </div>

                    <div>
                    <button className="available_btn"onClick={() => handleAvailableClick(6)}>Available</button>
                    <button className="not_available_btn"onClick={() => handleNotAvailableClick(6)}>Not Available</button>
                    <button className="available_btn"onClick={() => handleAvailableClick(7)}>Available</button>
                     <button className="not_available_btn"onClick={() => handleNotAvailableClick(7)}>Not Available</button>
                    </div>
                    <div className="d_bfivea">
                        <button className="d_btna" id="b9"disabled={disabledButtons[8] }>6:30 PM</button>
             
                    </div>

                    <div>
                    <button className="available_btn_1"onClick={() => handleAvailableClick(8)}>Available</button>
                    <button className="available_btn_1"onClick={() => handleNotAvailableClick(8)}>Not Available</button>
                    
                    </div>
                </div>

                <div className="d_statusa">
                    <h2>Current Status 
                        <ul>
                            {feta && feta.map((item, index) => (
                                <li key={index} className="fetching">
                                    <p>Name: {item.name} | Timing: {item.timing} | Status: 
                                        <span className={item.status === 'Accepted' ? 'accepted' : ''}>
                                            {item.status}
                                        </span>
                                    </p>
                                    <div className="button_group">
                                        <button 
                                            className="accept_btn" 
                                            onClick={() => auth_c(item.name, item.timing, item.status, index)} 
                                            disabled={item.status === 'Accepted'}
                                        >
                                            Accept
                                        </button>
                                        <button className="reject_btn" onClick={() => reject_c(item.name, item.timing)}>
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </h2>
                </div>
            </div>
        </div>
    );
}


export default Dashboard_auth;
