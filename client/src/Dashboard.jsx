import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Dashboard_auth from './Dashboard_auth';


function Dashboard({ disabledButtons, handleAvailableClick, handleNotAvailableClick}) {
    const [suc, setSuc] = useState();
    const [fet, setFet] = useState();
    
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('backend-plum-alpha-76.vercel.app/Dashboard')
            .then(res => {
                console.log(res.data);
                if (res.data === "Success") {
                    setSuc("Successded OK");
                } else {
                    navigate('/login');
                }
            }).catch(err => console.log(err));
           
          
    }, []);
    useEffect(() => {
     
           
            axios.get('backend-plum-alpha-76.vercel.app/Dashboard_1')
            .then(response => {
                console.log(response.data);
                setFet(response.data);
                
            }).catch(err => console.log(err));
    }, []);
    
    
  const status="Pending";
    const handleClick=(timing)=>{
        
       
        axios.post('backend-plum-alpha-76.vercel.app/dashboard', {timing,status})
        .then(result => {console.log(result) 
            window.location.reload();
        }).catch(err => console.log(err))
    }
    return (
        <div className='d_container'>
            <navbar className='d_nav'>
                LNMIIT - Barber Shop
            </navbar>
            <div className="d_content">
                <div className="d_buttons">
                    <div className="d_bone">
                    <button className="d_btn" id="b1" onClick={() => { handleClick("9:30 AM"); handleNotAvailableClick(0) }} disabled={disabledButtons[0]}>9:30 AM</button>

                            <button className="d_btn" id="b2" onClick={() =>{ handleClick("10:30 AM"); handleNotAvailableClick(1)}} disabled={disabledButtons[1]} >10:30 AM</button>
                    </div>
                    <div className="d_btwo">
                        <button className="d_btn" id="b3" onClick={() => {handleClick("11:30 AM");handleNotAvailableClick(2)}}disabled={disabledButtons[2] }>11:30 AM</button>
                        <button className="d_btn" id="b4" onClick={() => { handleClick("12:30 AM");handleNotAvailableClick(3)}}disabled={disabledButtons[3] }>12:30 PM</button>
                    </div>
                    <div className="d_bthree">
                        <button className="d_btn" id="b5" onClick={() => { handleClick("2:30 AM");handleNotAvailableClick(4)}} disabled={disabledButtons[4]}>2:30 PM</button>
                        <button className="d_btn" id="b6" onClick={() => {handleClick("3:30 AM");handleNotAvailableClick(5)}} disabled={disabledButtons[5]}>3:30 PM</button>
                    </div>
                    <div className="d_bfour">
                        <button className="d_btn" id="b7"onClick={() => {handleClick("4:30 AM");handleNotAvailableClick(6)}}disabled={disabledButtons[6]}>4:30 PM</button>
                        <button className="d_btn" id="b8"onClick={() => { handleClick("5:30 AM");handleNotAvailableClick(7)}}disabled={disabledButtons[7]}>5:30 PM</button>
                    </div>
                    <div className="d_bfive">
                        <button className="d_btn" id="b9"onClick={() => {handleClick("6:30 AM");handleNotAvailableClick(8)}}disabled={disabledButtons[8]}>6:30 PM</button>
                    </div>
                </div>
                <div className="d_status">
                    <h2>Current Status 
                        <ul>
                            {fet &&fet.map((item,index)=>(
                                   <li key={index} className="fetching">
                                   <p>Name: {item.name} | Timing: {item.timing} | Status: 
                                       <span className={item.status === 'Accepted' ? 'accepted' : ''}>
                                           {item.status}
                                       </span>
                                   </p>
                               </li>
                            ))}
                        </ul>
                    </h2>
                    <p></p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
