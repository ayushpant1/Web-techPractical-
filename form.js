"use strict";

document.addEventListener("DOMContentLoaded", function() {
  // Get the submit button to detect click event
  var submitButton = document.getElementById("submit_button");
  var formInputs = document.querySelectorAll("input");
  var email = document.getElementById("email");
  var age = document.getElementById("age");
  var dob = document.getElementById("date");
  var address=document.getElementById("address");
  var phoneNumber = document.getElementById("phoneNumber");
var countrySelect=document.getElementById("country");
  var isFormValid = false;
  var errorMessage = "";
 
  var request=new XMLHttpRequest();
  request.open("Get","./countries.json",false);
  request.send(null);
  var countries= JSON.parse(request.responseText);
  countries.forEach(country => {
    var cl=document.createElement("option");
    cl.textContent=country.name;
    cl.value=country.code;
    countrySelect.appendChild(cl);
  });
  submitButton.addEventListener("click", function() {
    for (var item of formInputs) {
      // Simply check the valid states of inputs
      if (item.checkValidity()) {
        isFormValid = true;
      } else {
        isFormValid = false;
        errorMessage += `- ${item.id} is invalid \n\n`;
      }
    }

    // Check if email is correct.
    if (!email.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      isFormValid = false;
      errorMessage += "- Email is incorrect \n\n";
    }

    // Check if telephone number is valid.
    if (!phoneNumber.value.match(/^[0-9]+$/)) {
      //TODO: Can take it even further by pattern matching the digits.
      isFormValid = false;
      errorMessage += "- Phone Number is not a number \n\n";
    }

    if (phoneNumber.value.length !== 10) {
      isFormValid = false;
      errorMessage += "- PhoneNumber should be exactly 10 digits long \n\n";
    }

    // Check if age is valid.
    if (!age.value.match(/^[0-9]+$/)) {
      isFormValid = false;
      errorMessage += "- Age is not a number \n\n";
    }

    if (age.value < 1 || age.value > 100) {
      isFormValid = false;
      errorMessage += "- Age should be between 1 and 100 \n\n";
    }
    

    if (!isFormValid) {
      alert(
        "Errors were found in form. Please correct them before submitting. \n\n" +
          errorMessage
      );
    } else {
      // Send a request to server
      alert("Form Submission Successful!");
    }
    errorMessage = "";
  });
});
