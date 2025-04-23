import React, { useContext, useState,useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ added
import './loginPage.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";

import PremierContext from "../context/premierContext";
import LoginSVG from "../assets/LoginSVG.svg"

// const LoginForm = ({ onSubmit }) => {
//     const navigate = useNavigate(); // ✅ added
//     const { setUsername } = useContext(PremierContext);
//     const [usernameInput, setUsernameInput] = useState('');
//     const [password, setPassword] = useState('');
//     const [errors, setErrors] = useState({ username: '', password: '' });

//     const validateForm = () => {
//         let valid = true;
//         const newErrors = { username: '', password: '' };

//         if (!usernameInput) {
//             newErrors.username = 'Username or Email is required';
//             valid = false;
//         }
//         if (!password) {
//             newErrors.password = 'Password is required';
//             valid = false;
//         }

//         setErrors(newErrors);
//         return valid;
//     };

//     const handleLogin = (e) => {
//         e.preventDefault();
//         if (validateForm()) {
//             setUsername(usernameInput); // Set the username in context
//             onSubmit();                 // Update login status (formSubmitted)
//             navigate("/");             // ✅ redirect to homepage
//         }
//     };

//     return (
//         <div className="login-page">
//             <div className="container">
//                 <div className="screen">
//                     <div className="screen__content">
//                         <form className="login" onSubmit={handleLogin}>
//                             <div className="login__field">
//                                 <i className="login__icon">
//                                     <FontAwesomeIcon icon={faUser} />
//                                 </i>
//                                 <input
//                                     type="text"
//                                     className="login__input"
//                                     placeholder="User name"
//                                     value={usernameInput}
//                                     onChange={(e) => setUsernameInput(e.target.value)}
                                    
//                                 />
//                                 {errors.username && <span className="error">{errors.username}</span>}
//                             </div>
//                             <div className="login__field">
//                                 <i className="login__icon">
//                                     <FontAwesomeIcon icon={faLock} />
//                                 </i>
//                                 <input
//                                     type="password"
//                                     className="login__input"
//                                     placeholder="Password"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                 />
//                                 {errors.password && <span className="error">{errors.password}</span>}
//                             </div>
//                             <button className="button login__submit">
//                                 <span className="button__text">Log In Now</span>
//                                 <i className="button__icon">
//                                     <FontAwesomeIcon icon={faChevronRight} />
//                                 </i>
//                             </button>
//                         </form>
//                         <div className="social-login">
//                             <h3>Log in via</h3>
//                             <div className="social-icons">
//                                 <a href="#" className="social-login__icon">
//                                     <FontAwesomeIcon icon={faInstagram} />
//                                 </a>
//                                 <a href="#" className="social-login__icon">
//                                     <FontAwesomeIcon icon={faFacebook} />
//                                 </a>
//                                 <a href="#" className="social-login__icon">
//                                     <FontAwesomeIcon icon={faTwitter} />
//                                 </a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LoginForm;








// const LoginForm = () => {
//   const [isHovered, setIsHovered] = useState(false);
  
//     const handleLogin = (e) => {
//         e.preventDefault();
//         if (validateForm()) {
//             setUsername(usernameInput); // Set the username in context
//             onSubmit();                 // Update login status (formSubmitted)
//             navigate("/");             // ✅ redirect to homepage
//         }
//     };
//     return (
//       <>
//         <div className="login-container">
//           <div className="svg-section">
//             <img src={LoginSVG} alt="Login Illustration" className="animated-svg" />
//           </div>
//           <div className="form-section">
//             <h2 className="fade-in" style={{color:"white"}}>Welcome Back!</h2>
//             <input type="text" placeholder="Username" className="slide-in" />
//             <input type="password" placeholder="Password" className="slide-in delay" />
//             <button
//   onMouseEnter={() => setIsHovered(true)}
//   onMouseLeave={() => setIsHovered(false)}
//   style={{
//     background: isHovered
//       ? 'linear-gradient(135deg, #00838f, #00acc1)'
//       : 'linear-gradient(135deg, #00acc1, #00838f)',
//     transform: isHovered ? 'scale(1.05)' : 'scale(1)',
//     color: '#fff',
//     padding: '12px 20px',
//     border: 'none',
//     borderRadius: '8px',
//     cursor: 'pointer',
//     marginTop: '10px',
//     fontWeight: 'bold',
//     fontSize: '16px',
//     transition: 'all 0.3s ease',
//     boxShadow: isHovered
//       ? '0 8px 16px rgba(0, 0, 0, 0.3)'
//       : '0 4px 8px rgba(0, 0, 0, 0.2)',
//   }}
// >
//   Login
// </button>
//             <p className="fade-in delay3">Don't have an account? Sign up</p>
//           </div>
//         </div>
//       </>
//     );
//   };

// export default LoginForm;






const LoginForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  const { setUsername } = useContext(PremierContext);

  const [usernameInput, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });
  const [isHovered, setIsHovered] = useState(false);

  const validateForm = () => {
    let valid = true;
    const newErrors = { username: '', password: '' };

    if (!usernameInput) {
      newErrors.username = 'Username is required';
      valid = false;
    }
    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setUsername(usernameInput);
      onSubmit();
      navigate('/');
    }
  };

  return (
    <div className="login-container">
      <div className="svg-section">
        <img src={LoginSVG} alt="Login Illustration" className="animated-svg" />
      </div>
      <div className="form-section">
        <h2 className="fade-in" style={{ color: "white" }}>Welcome Back!</h2>
        <input
          type="text"
          placeholder="Username"
          className="slide-in"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
        />
        {errors.username && <span className="error">{errors.username}</span>}

        <input
          type="password"
          placeholder="Password"
          className="slide-in delay"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <span className="error">{errors.password}</span>}

        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleLogin}
          style={{
            background: isHovered
              ? 'linear-gradient(135deg, #00838f, #00acc1)'
              : 'linear-gradient(135deg, #00acc1, #00838f)',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            color: '#fff',
            padding: '12px 20px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginTop: '10px',
            fontWeight: 'bold',
            fontSize: '16px',
            transition: 'all 0.3s ease',
            boxShadow: isHovered
              ? '0 8px 16px rgba(0, 0, 0, 0.3)'
              : '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          Login
        </button>
        <p className="fade-in delay3">Don't have an account? Sign up</p>
      </div>
    </div>
  );
};

export default LoginForm;
