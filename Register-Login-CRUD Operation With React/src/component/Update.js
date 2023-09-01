import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../Api/URL';
import './login.css';

function Update() {
  const [yourName, setYourName] = useState('');
  const [address, setAddress] = useState('');
  const [birthday, setBirthday] = useState('');
  const [mail, setMail] = useState('');
  const [linkedinURL, setLinkedinURL] = useState(''); // Added linkedinURL state
  const [id, setId] = useState('');
  const [yourNameError, setYourNameError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [birthdayError, setBirthdayError] = useState(false);
  const [mailError, setMailError] = useState(false);
  const [linkedinURLError, setLinkedinURLError] = useState(false); // Added linkedinURLError state
  const navigate = useNavigate();
  const currentDate = dayjs().format('YYYY-MM-DD');

  const validateEmail = (email) => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    return emailRegex.test(email);
  };

  const validateURL = (url) => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
  };

  const postData = async (e) => {
    e.preventDefault();

    if (
      yourName.length >= 6 &&
      yourName.length <= 18 &&
      address !== "" &&
      birthday !== "" &&
      mail !== "" &&
      validateEmail(mail) &&
      (linkedinURL === "" || validateURL(linkedinURL))
    ) {
      try {
        await axios.put(API_URL + id, {
          yourName,
          address,
          birthday,
          mail,
          linkedinURL,
        });
        navigate("/read");
        console.log("Form data submitted successfully!");
      } catch (error) {
        console.log(error);
      }
    } else {
      if (yourName.length < 6 || yourName.length > 18) {
        setYourNameError(true);
      }
      if (address === "") {
        setAddressError(true);
      }
      if (birthday === "") {
        setBirthdayError(true);
      }
      if (mail === "" || !validateEmail(mail)) {
        setMailError(true);
      }
      if (linkedinURL !== "" && !validateURL(linkedinURL)) {
        setLinkedinURLError(true);
      }
    }
  };

  useEffect(() => {
    setId(localStorage.getItem('id'));
    setYourName(localStorage.getItem('yourName'));
    setAddress(localStorage.getItem('address'));
    setBirthday(localStorage.getItem('birthday'));
    setMail(localStorage.getItem('mail'));
    setLinkedinURL(localStorage.getItem('linkedinURL')); // Initialize linkedinURL from localStorage
  }, []);

  return (
    <div>
      <section className="register-block">
        <div className="container">
          <div className="row ">
            <div className="col register-sec">
              <h2 className="text-center">Re-Registration Dashboard</h2>
              <form className="register-form">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    onChange={event => setYourName(event.target.value)}
                    type="text"
                    placeholder="Enter your name"
                    className="form-control"
                    name="yourName"
                    value={yourName} // Set the value to display the current state
                  />
                  {yourNameError && yourName === '' && (
                    <span className="text-danger">
                      *Name is required.
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input
                    onChange={event => setAddress(event.target.value)}
                    type="text"
                    placeholder="Enter your address"
                    className="form-control"
                    name="address"
                    value={address} // Set the value to display the current state
                  />
                  {addressError && address === '' && (
                    <span className="text-danger">
                      *Address is required.
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label>Date of Birth</label>
                  <input
                    max={currentDate}
                    onChange={event => setBirthday(dayjs(event.target.value).format('DD-MM-YYYY'))}
                    type="date"
                    placeholder="Enter Date"
                    className="form-control"
                    name="birthday"
                    value={birthday} // Set the value to display the current state
                  />
                  {birthdayError && birthday === '' && (
                    <span className="text-danger">
                      *Date of Birth is required.
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    onChange={event => setMail(event.target.value)}
                    type="email"
                    placeholder="Enter your mail ID"
                    className="form-control"
                    name="mail"
                    value={mail} // Set the value to display the current state
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  />
                  {mailError && mail === '' && (
                    <span className="text-danger">
                      *Email is required.
                    </span>
                  )}
                  {!validateEmail(mail) && mail !== '' && (
                    <span className="text-danger">
                      *Please enter a valid email address.
                    </span>
                  )}
                </div>
                
                <div className="form-group">
                  <label>LinkedIn URL</label>
                  <input
                    onChange={(event) => setLinkedinURL(event.target.value)}
                    type="url"
                    placeholder="Enter your LinkedIn URL"
                    className="form-control"
                    value={linkedinURL}
                    id=""
                  />
                  {linkedinURLError && linkedinURL !== "" && (
                    <span className="text-danger">
                      *Please enter a valid LinkedIn URL.
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <Button className="btn btn-login float-right" inverted color='blue' onClick={postData}>
                    Update
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Update;


































// import React from 'react'
// import '../App.css'
// import axios from 'axios'
// import './login.css'
// import { API_URL } from '../Api/URL'
// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { Button } from 'semantic-ui-react'
// import dayjs from 'dayjs';

// function Update() {
//   const [yourName, setYourName] = useState('');
//   const [address, setAddress] = useState('');
//   const [birthday, setBirthday] = useState('');
//   const [mail, setMail] = useState('');
//   const [id, setId] = useState('');
//   const [yourNameError, setYourNameError] = useState(false);
//   const [addressError, setAddressError] = useState(false);
//   const [birthdayError, setBirthdayError] = useState(false);
//   const [mailError, setMailError] = useState(false);
//   const navigate = useNavigate();
//   const currentDate = dayjs().format('YYYY-MM-DD');

//   const validateEmail = (email) => {
//     const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
//     return emailRegex.test(email);
//   };


//   const postData = async (e) => {
//     e.preventDefault();

//     if (
//       yourName.length >= 6 &&
//       yourName.length <= 18 &&
//       address !== "" &&
//       birthday !== "" &&
//       mail !== "" &&
//       validateEmail(mail)
//     ) {
//       try {
//         await axios.put(API_URL + id, {
//           yourName,
//           address,
//           birthday,
//           mail,
//         });
//         navigate("/read");
//         console.log("Form data submitted successfully!");
//       } catch (error) {
//         console.log(error);
//       }
//     } else {
//       if (yourName.length < 6 || yourName.length > 18) {
//         setYourNameError(true);
//       }
//       if (address === "") {
//         setAddressError(true);
//       }
//       if (birthday === "") {
//         setBirthdayError(true);
//       }
//       if (mail === "" || !validateEmail(mail)) {
//         setMailError(true);
//       }
//     }
//   };



//   useEffect(() => {
//     setId(localStorage.getItem('id'))
//     setYourName(localStorage.getItem('yourName'))
//     setAddress(localStorage.getItem('address'))
//     setBirthday(localStorage.getItem('birthday'))
//     setMail(localStorage.getItem('mail'))
//   }, [])
//   return (
//     <div>
//       <section className="register-block">
//         <div className="container">
//           <div className="row ">
//             <div className="col register-sec">
//               <h2 className="text-center">Re-Registration Dashboard</h2>
//               <form className="register-form" action="" >
//                 <div className="form-group">
//                   <label>Name</label>
//                   <input
//                     onChange={event => setYourName
//                       (event.target.value)} type="text"
//                     placeholder='Enter your name'
//                     className="form-control" name={yourName} id="" />
//                   {yourNameError && yourName === '' && <span className="text-danger" >
//                     *Name is required.
//                   </span>}
//                 </div>

//                 <div className="form-group">
//                   <label >Address</label>
//                   <input onChange={event => setAddress
//                     (event.target.value)} type="text"
//                     placeholder='Enter your address'
//                     className="form-control" name={address} id="" />
//                   {addressError && address === '' && <span className="text-danger" >
//                     *Address is required.
//                   </span>}
//                 </div>


//                 <div className="form-group">
//                   <label>Date of Birth</label>
//                   <input
//                     max={currentDate}
//                     onChange={event => setBirthday(dayjs(event.target.value).format('DD-MM-YYYY'))}
//                     type="date"
//                     placeholder="Enter Date"
//                     className="form-control"
//                     name={setBirthday}
//                     id=""
//                   />
//                   {birthdayError && birthday === '' && <span className="text-danger" >
//                     *Date of Birth is required.
//                   </span>}
//                 </div>

//                 <div className="form-group">
//                   <label>Email</label>
//                   <input
//                     onChange={event => setMail(event.target.value)}
//                     type="email"
//                     placeholder="Enter your mail ID"
//                     className="form-control"
//                     name={mail}
//                     id=""
//                     required
//                     pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
//                   />
//                   {mailError && mail === '' && (
//                     <span className="text-danger">
//                       *Email is required.
//                     </span>
//                   )}

//                   {!validateEmail(mail) && mail !== '' && (
//                     <span className="text-danger">
//                       *Please enter a valid email address.
//                     </span>
//                   )}


//                 </div>


//                 <div className="form-group">
//                   <Button className="btn btn-login float-right" inverted color='blue' onClick={postData}> Update </Button>

//                 </div>
//               </form>
//             </div>
//           </div>

//         </div>
//       </section>

//     </div>
//   )
// }

// export default Update

