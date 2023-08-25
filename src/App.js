import React, { useState,useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import './App.css'
import {
  numbers,
  upperCaseLetters,
  lowerCaseLetters,
  specialCharacters,
} from './characters'
import 'react-toastify/dist/ReactToastify.css'
import { COPY_SUCCESS } from './message'

function App() {
  const [password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(20)
  const [includeUppercase, setIncludeUppercase] = useState(false)
  const [includeLowercase, setIncludeLowercase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const [recentpasswords, setrecentPasswords] = useState([]);
  const [getpassword,setgetpasswords]=useState([])


   useEffect(() => {
    const storedPasswords = JSON.parse(localStorage.getItem('passwords')) || [];
    setrecentPasswords(storedPasswords);
    setgetpasswords(storedPasswords);
    console.log(storedPasswords)
  }, []);

   const clearstorage=()=>{
    localStorage.clear();
    setTimeout(()=>{
      window.location.reload(true)
    },3000)
   }
  const handleGeneratePassword = (e) => {
    if (
      !includeUppercase &&
      !includeLowercase &&
      !includeNumbers &&
      !includeSymbols
    ) {
      notify('You must Select atleast one option', true)
    }
    let characterList = ''

    if (includeLowercase) {
      characterList = characterList + lowerCaseLetters
    }

    if (includeUppercase) {
      characterList = characterList + upperCaseLetters
    }

    if (includeNumbers) {
      characterList = characterList + numbers
    }

    if (includeSymbols) {
      characterList = characterList + specialCharacters
    }

    setPassword(createPassword(characterList))

  }
  const createPassword = (characterList) => {
    let password = ''
    const characterListLength = characterList.length

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
    }
    return password
  }

  const copyToClipboard = () => {
    const newTextArea = document.createElement('textarea')
    newTextArea.innerText = password
    document.body.appendChild(newTextArea)
    newTextArea.select()
    document.execCommand('copy')
    newTextArea.remove()


  }

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      toast(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  const handleCopyPassword = (e) => {
    if (password === '') {
      notify('Nothing To Copy', true)
    } else {
      copyToClipboard()
      notify(COPY_SUCCESS)
 const newPassword = password;
      const updatedPasswords = [...recentpasswords, newPassword];
    localStorage.setItem('passwords', JSON.stringify(updatedPasswords));
    setrecentPasswords(updatedPasswords);
    }
    setTimeout(()=>{
      window.location.reload(true)
    },3000)
  }

  return (
    <div className='App'>
      <div className='container '>

      <div className="row justify-content-center">
<div className="col-lg-6 col-md-6 col-10 mt-5 p-5">
 <div className='generator'>
          <h2 className='generator__header'>Password Generator</h2>
          <div className='generator__password'>
            <h3>{password}</h3>
            <button onClick={handleCopyPassword} className='copy__btn'>
              <i className='far fa-clipboard'></i>
            </button>
          </div>

          <div className='form-group'>
            <label htmlFor='password-strength'>Password length</label>
            <input
              defaultValue={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
              type='number'
              id='password-strength'
              name='password-strength'
              max='20'
              min='10'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='uppercase-letters'>Include Uppercase Letters</label>
            <input
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              type='checkbox'
              id='uppercase-letters'
              name='uppercase-letters'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='lowercase-letters'>Include Lowercase Letters</label>
            <input
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              type='checkbox'
              id='lowercase-letters'
              name='lowercase-letters'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='include-numbers'>Include Numbers</label>
            <input
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              type='checkbox'
              id='include-numbers'
              name='include-numbers'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='include-symbols'>Include Symbols</label>
            <input
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              type='checkbox'
              id='include-symbols'
              name='include-symbols'
            />
          </div>

          <button onClick={handleGeneratePassword} className='generator__btn'>
            Generate Password
          </button>
          <ToastContainer
            position='top-center'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
</div>
<div className="col-lg-6 col-md-6 col-10 mt-5">
 <div className='generator mt-5'>
          <h2 className='generator__header'>Recent Passwords</h2>
        {getpassword.length===0 ?        <div className="row justify-content-center">     <label htmlFor='uppercase-letters' className="addlio text-center p-5">Please Add Passwords</label></div>:getpassword.slice(0,5).reverse().map((pass,id)=>(  <div className='generator__password'>
        <h3 key={id}>{pass}</h3>
            
          </div>))}  

          <button onClick={clearstorage} className='generator__btn mt-5'>
            Clear Storage
          </button>  
          </div>
</div>
      </div>
       
      </div>
    </div>
  )
}

export default App
