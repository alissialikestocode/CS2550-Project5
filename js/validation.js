/*   
 
Project:  Project 5
Name: Alissia Austell Huntzinger
Submitted: 4/18/25
 
I declare that the following source code was written by me, or provided
by the instructor for this project. I understand that copying source
code from any other source, providing source code to another student, 
or leaving my code on a public web site constitutes cheating.
I acknowledge that  If I am found in violation of this policy this may result
in a zero grade, a permanent record on file and possibly immediate failure of the class.
 
Reflection (1-2 paragraphs):  I really enjoyed writing this program, but had trouble with blah blah blah.  
 
*/

// Establish global variables for validating
let phoneRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;        // regex sourced from https://uibakery.io/regex-library/phone-number
let emailRegex = /[\w]*@[\w]*.{1}(com|gov|edu|io|net){1}/;
let zipCodeRegex = /(?<zip1>\d{5})([-]?(?<zip2>\d{4}))?(?<ERROR>.+)?/;
const stateAbbreviations = [
    'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA',
    'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
    'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
    'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
    'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
];
// let form = null;
let successMsg = null;

function initValidation(formId, successId) {

    form = document.getElementById(formId);
    successMsg = document.getElementById(successId);

    let inputs = document.querySelectorAll("input");
    for (let input of inputs) {

        input.addEventListener("change", inputChanged);
    }
    form.addEventListener("submit", submitForm);

}

function inputChanged(ev) {             // When the input is changed add "was-validated" class to element whose event listener triggered the event
    let el = ev.currentTarget;
    validateForm();
    
    // Use .was-validated to show error indications only for single field rather than whole form at once
    el.classList.add("was-validated");
}

function submitForm(ev) {
    console.log("in submit");
    let form = ev.currentTarget;
    let successMsg = document.getElementById("success");

    ev.preventDefault();                    // Use these to stop the form from submitting
    ev.stopPropagation();

    validateForm();

    if (!form.checkValidity()) {            //form.checkValidity returns F if any input is invalid, this runs if any input is invalid
        let inputs = document.querySelectorAll("input");
        for (let input of inputs) {
            input.classList.add("was-validated");
        }
    }
    else {
        form.style.display = "none";
        // successMsg.style.display = "block";
    }
}

function validateForm() { 
    checkRequired("first-name", "First Name is Required");
    checkRequired("last-name", "Last Name is Required");
    checkRequired("address", "Address is Required");
    checkRequired("city", "City is Required");

    if (checkRequired("state", "State is Required")) {
        validateState("state", "Not a valid State, enter two digit code e.g., UT");
    }

    if (checkRequired("email", "Email Address is required")) {
        checkFormat("email", "email format is bad", emailRegex);
    }

    if (checkRequired("zip", "Zip Code is Required")) {
        checkFormat("zip", `malformed zip-code, please use either "#####", or "#####-#### format.`, zipCodeRegex);
    }

    if (checkRequired("phone", "Phone is required")) {
        checkFormat("phone", "phone format is bad", phoneRegex);
    }

    checkRequired("newspaper", "you must select at least one!");
}

function validateState(id, msg) {
    let el = document.getElementById(id);
    let valid = false;

    let elInput = el.value;                 // Returns a string
    elInput = elInput.toUpperCase();        // Conver string to uppercase

    if (stateAbbreviations.includes(elInput)) {  // Looks for elInput in array, ret.s T if in array
        valid = true;
    }

    setElementValidity(id, valid, msg);     // shows red or green borders, error msgs (inserts them in erroMsg div)
}

function checkFormat(id, msg, regex) { 
    let valid = false;
    let elemVal = document.getElementById(id).value;
    
    const result = regex.test(elemVal);
    if (result) { 
        valid = true;
    }

    setElementValidity(id, valid, msg);
    return valid
}

function checkRequired(id, message) { 
    let el = document.getElementById(id);
    let valid = false;
    let type = el.type;
    switch (type) {
        case 'text':
        case 'password':
            if (el.value.trim() != "") {
                valid = true;
            }
            break;
        
        case 'checkbox':
            let allCheckboxes = document.querySelectorAll("input[name=find-page]");
            
            for (let box of allCheckboxes) {
                if (box.checked) {
                    valid = true;
                }
            }
            break;
    }
    setElementValidity(id, valid, message);

    return valid;
}

function setElementValidity(id, valid, message) { 
    let el = document.getElementById(id);

    if (valid) {                        // It has a value
        el.setCustomValidity("");       // Sets to no error msg and field is valid
        // errorDiv.innerHTML = "";
        // errorDiv.style.display = "none";
    }
    else {
        el.setCustomValidity(message);  // Sets error msg and field gets invalid state
        let errorDiv = el.parentElement.querySelector(".errorMsg");
        errorDiv.innerHTML = message; 
    }
}
