import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import './assets/css/App.css';



function App() {
  const [pwdFocus, setPwdFocus] = useState(false);
  const [pwd, setPwd] = useState('');
  const refLower = useRef(null);
  const refUpper = useRef(null);
  const refSymbol = useRef(null);
  const refMin = useRef(null);

  function handlePwd(e) {
    setPwd(e.target.value);
  };

  useEffect(() => {
    if (pwdFocus) {
      (/(?=.*[a-z])/.test(pwd)) ? refLower.current.classList.add("valid") : refLower.current.classList.remove("valid");
      (/(?=.*[A-Z])/.test(pwd)) ? refUpper.current.classList.add("valid") : refUpper.current.classList.remove("valid");
      (/[$-/:-?{-~!"^_`#@[\]]/.test(pwd)) ? refSymbol.current.classList.add("valid") : refSymbol.current.classList.remove("valid");
      (/(^.{8,})/.test(pwd)) ? refMin.current.classList.add("valid") : refMin.current.classList.remove("valid");
    }
  }, [pwd, pwdFocus])

  function onPwdFocus(e) {
    setPwdFocus(true);
  };

  function onPwdBlur() {
    setPwdFocus(false);
  };

  return (
    <div className='container'>
      <div className='input-box'>
        <form id='input-form' >
          <input 
            type='password' 
            name='password' 
            placeholder='Password' 
            onChange={handlePwd} 
            value={pwd}
            autoComplete="new-password"
            onFocus={onPwdFocus}
            onBlur={onPwdBlur}
          />
        </form>
        <CSSTransition
          in={pwdFocus}
          timeout={300}
          classNames="dropdown"
          unmountOnExit
        >
          <div className='pwd-validation'>
            <ul className='validation-list'>
              <li id='lower' ref={refLower}>
                <RadioButtonCheckedIcon className='radio-icon' />At least one lower case character
              </li>
              <li id='upper' ref={refUpper}>
                <RadioButtonCheckedIcon className='radio-icon' />At least one upper case character
              </li>
              <li id='symbol' ref={refSymbol}>
                <RadioButtonCheckedIcon className='radio-icon' />At least one symbol character
              </li>
              <li id='min' ref={refMin}>
                <RadioButtonCheckedIcon className='radio-icon' />At least 8 minimun character
              </li>
            </ul>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}

export default App;
