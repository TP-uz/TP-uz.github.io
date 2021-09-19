let form_signin = document.getElementById("sign_form")


form_signin.onsubmit = (e) => {
    e.preventDefault();
    setText("#siEmail", "")
    setText("#siPassword", "")
    let email = form_signin.email.value
    let password = form_signin.password.value

    if (email.length <4) {
        setText("#siEmail", "Invalid Email");
    }
    if (password.length <6) {
        setText("#siPassword", "Invalid Password")
    }
    if (email && password){
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log(user);
            if(user.sendEmailVerification){
                open("./chatweb/chat.html","_self")
                
            }else{
                sweetAlert("error","Must verify your email")
            }
            // ...
        })
        .catch((error) => {

            var errorMessage = error.message;
            sweetAlert("error", errorMessage)
        });
    }

}

let form_signup = document.querySelector("#signup_")
form_signup.onsubmit = (e) => {
    e.preventDefault();
    setText("#suEmail", "")
    setText("#suPassword", "")
    setText("#sucfPassword", "")


    let email = form_signup.email.value
    let password = form_signup.password.value
    let cfpassword = form_signup.cfpassword.value



    if (!email) {
        setText("#suEmail", "email is required")
    }
    if (!password) {
        setText("#suPassword", "password length must be at least 6 characters")

    } else if (password.length < 6) {
        setText("#suPassword", "password length must be at least 6 characters")
    }
    if (!cfpassword) {
        setText("#sucfPassword", "Password is required")
    } else if (cfpassword != password) {
        setText("#sucfPassword", "Password does not match")
    } else {
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          firebase.auth().currentUser.sendEmailVerification();
          sweetAlert("success", "Successfully, please check your email");
          // ...
        })
        .catch((error) => {
          var errorMessage = error.message;
          sweetAlert("error", errorMessage);
        });
    }


}

let showHidePasswordForSignIn = () => {
    let a = document.getElementById("pw")
    if (a.type == "password") {
        a.type = "text"
    } else {
        a.type = "password"
    }
}

let showHidePasswordForSignUp = () => {
    let a = document.getElementById("pwu")
    let b = document.getElementById("cfpwu")
    if (a.type == "password") {
        a.type = "text"
    } else {
        a.type = "password"
    }
    if (b.type == "password") {
        b.type = "text"
    } else {
        b.type = "password"
    }
}

let setText = (query, content) => {
    document.querySelector(query).innerHTML = content;
}

let sweetAlert = (icon, content) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
  
    Toast.fire({
      icon: icon,
      title: content,
    });
  };
  