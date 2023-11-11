function displayMessage(type, message){
    const resultMessage = document.getElementsByClassName('result')[0];
    if (resultMessage){
        resultMessage.textContent = message;
        resultMessage.classList.remove('error', 'success');
        resultMessage.classList.add(type);
    }
    else{
        console.log("class not found")
    }
}

function formValidate(event) {
    event.preventDefault()
    //get form inputs
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const phone = document.getElementById("phone").value
    
    // A simple email validation using regex
    const emailRegex = /^\S+@\S+\.\S+$/;
    const validEmail = emailRegex.test(email);

    if(!name || !email || !phone){
        displayMessage("error", "Please fill out all details")
    }
    else if (!validEmail){
        displayMessage("error", "Invalid Email")
    }
    else {

      var formResponse = {
        name : name,
        email : email,
        phone : phone
    } 
    handleSubmit(formResponse)
    
    }
    
}
async function handleSubmit(userInfo) {
    try {
        // replace 54.202.117.246 with the Public API from your ECS
        const response = await fetch('http://35.165.30.68:3000/profile', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        });

        if (response.ok) {
            displayMessage("success" , "Form submission successful")
           
        } else {
            throw new Error(`Form submission failed with status: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        displayMessage("error" ,`An error occurred during form submission: ${error.message}`);
    }
}


// on clicking the submit button in the frontend
document.getElementById("submit-btn").addEventListener("click",formValidate) 

