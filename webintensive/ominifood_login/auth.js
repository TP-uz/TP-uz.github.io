let form_signin = document.getElementById("sign_form")


form_signin.onsubmit = (e)=>{
    e.preventDefault();

    let email = form_signin.email.value
    let password = form_signin.password.value

    console.log(email);
    console.log(password);
}