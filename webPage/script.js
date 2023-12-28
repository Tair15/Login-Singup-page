document.addEventListener('DOMContentLoaded', function () {
    var formElements = document.querySelectorAll('.form input, .form textarea');
  
    var tabs = document.querySelectorAll('.tab a');
  
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function (e) {
        e.preventDefault();
  
        var parent = tab.parentElement;
        parent.classList.add('active');
  
        var siblings = getSiblings(parent);
        siblings.forEach(function (sibling) {
          sibling.classList.remove('active');
        });
  
        var target = tab.getAttribute('href');
        var tabContents = document.querySelectorAll('.tab-content > div');
  
        tabContents.forEach(function (content) {
          if (content !== document.querySelector(target)) {
            content.style.display = 'none';
          } else {
            content.style.display = 'block';
          }
        });
      });
    });
  });
  
  function getSiblings(element) {
    var siblings = [];
    var sibling = element.parentNode.firstChild;
  
    while (sibling) {
      if (sibling.nodeType === 1 && sibling !== element) {
        siblings.push(sibling);
      }
      sibling = sibling.nextSibling;
    }
  
    return siblings;
  }
  
  function submitForm() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
  
    var userData = {
      userName: firstName + " " + lastName,
      email: email,
      password: password,
    };
  
    fetch('http://localhost:8080/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  
    return false;
  }
  
  function loginFormSubmit() {
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;
  
    var loginData = {
      email: email,
      password: password,
    };
  
    fetch('http://localhost:8080/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  
    return false;
  }
  