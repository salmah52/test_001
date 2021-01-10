'use strict'

const form =document.getElementById('form')
const username =document.getElementById('username')
const email =document.getElementById('email')
const password =document.getElementById('password')
const confirmPassword =document.getElementById('confirm-password')

function showError(input, message) {
    const formControl = input.parentElement
    formControl.className = 'form-control error'
    const small = formControl.querySelector('small')
    small.innerText = message
}

function showSuccess(input) {
    const formControl = input.parentElement
    formControl.className = 'form-control success'

}

function validateEmail(input) {
    // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    re.test(String(input).toLowerCase()) ? showSuccess(input) : showError(input, `${getFieldName(input)} is not valid`)
   
    
}

// Check required fields
function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
      if (input.value.trim() === '') {
        showError(input, `${getFieldName(input)} is required`);
      } else {
        showSuccess(input);
      }
    });
  }

function checkLength(input, min, max) {
    const inputLen = input.value.length
    inputLen < min || inputLen > max ? showError(input,`${getFieldName(input)} must be at least 8 and not more than 25 characters`) : showSuccess(input)
}

function checkPasswordMatch(input1,input2) {
    !(input1 === input2) ? showError(input2,`password do not match`) : showSuccess(input2)
}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    checkRequired([username,email,password,confirmPassword])
    checkLength(username, 3, 15)
    checkLength(password, 8, 25)
    validateEmail(email)
    checkPasswordMatch(password,confirmPassword)

    
})

