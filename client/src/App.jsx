import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Dashboard from './Dashboard';
import Dashboard_auth from './Dashboard_auth';

function App() {
  const [disabledButtons, setDisabledButtons] = useState(() => {
    const storedButtons = JSON.parse(localStorage.getItem('disabledButtons'));
    return storedButtons || Array(9).fill(false);
  });

 
   const handleAvailableClick = (index) => {
    const updatedDisabledButtons = [...disabledButtons];
    updatedDisabledButtons[index] = false;
    setDisabledButtons(updatedDisabledButtons);
    localStorage.setItem('disabledButtons', JSON.stringify(updatedDisabledButtons));
  };

  const handleNotAvailableClick = (index) => {
    const updatedDisabledButtons = [...disabledButtons];
    updatedDisabledButtons[index] = true;
    setDisabledButtons(updatedDisabledButtons);
    localStorage.setItem('disabledButtons', JSON.stringify(updatedDisabledButtons));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/dashboard"
          element={<Dashboard disabledButtons={disabledButtons} handleAvailableClick={handleAvailableClick} handleNotAvailableClick={handleNotAvailableClick}
           />}
        />
        <Route
          path="/dashboard_auth"
          element={<Dashboard_auth disabledButtons={disabledButtons} handleAvailableClick={handleAvailableClick} handleNotAvailableClick={handleNotAvailableClick} 
         />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// import Login from "./Login"
// import Signup from "./Signup"
// import Home from "./Home"
// import Dashboard from "./Dashboard"
// import Dashboard_auth from "./Dashboard_auth"
// import {BrowserRouter, Routes, Route} from 'react-router-dom'


// function App() {

//   return (
//     <BrowserRouter>
//       <Routes>
//       <Route path="/" element={<Login  />}></Route>
//         <Route path="/register" element={<Signup />}></Route>
//         <Route path="/login" element={<Login />}></Route>
//         <Route path="/Home" element={<Home/>}></Route>
//         <Route path="/Dashboard" element={<Dashboard />}></Route>
//         <Route path="/Dashboard_auth" element={<Dashboard_auth/>}></Route>
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App