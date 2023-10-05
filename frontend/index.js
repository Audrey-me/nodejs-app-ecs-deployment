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
    // call the handleSubmit which we use to interact wit the API Gateway
    handleSubmit(formResponse)
    
    }
    
}
async function handleSubmit(userInfo) {
    try {
        // get your backend url eg "http://35.170.51.172:3000/profile" 
        // 35.170.51.172 refers to the public ip address of either EC2 or ECS task
       
        const response = await fetch('http://3.235.185.201:3000/profile', {
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

