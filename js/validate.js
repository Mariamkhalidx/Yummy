//form validation
document.getElementById('form').addEventListener('input', function() {
    validateForm();
  });
  
  function validateSite(element) {
      console.log(element.nextElementSibling);
      console.log(element.value, element.id);
  
      var regex = {
          nameInput: /^[a-zA-Z]{1,}$/,
          emailInput: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g,
          phoneInput: /^01[0-2,5]{1}[0-9]{8}$/g,
          ageInput: /^\S[0-9]{0,3}$/g,
          passwordInput: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g,
          repasswordInput: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g
      };
  
      if (regex[element.id].test(element.value)) {
          if (element.id === 'repasswordInput') {
              if (element.value !== document.getElementById('passwordInput').value) {
                  element.nextElementSibling.classList.replace('d-none', 'd-block');
                  return false;
              }
          }
  
          element.nextElementSibling.classList.replace('d-block', 'd-none');
          return true;
      } else {
          element.nextElementSibling.classList.replace('d-none', 'd-block');
          return false;
      }
  }
  
  
  function validateForm() {
    const formElements = document.querySelectorAll('#form input');
    let isValid = true;
  
    formElements.forEach(element => {
        if (!validateSite(element)) {
            isValid = false;
        }
    });
  
    document.getElementById('submitBtn').disabled = !isValid;
  }
  