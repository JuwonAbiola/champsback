const signup = () => {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const pass = document.getElementById("pass").value;

  if (name, phone, email, pass === '') {
    document.getElementById("alert").style.display = "block";
    document.getElementById("loginErr").innerHTML = "Please fill all fields";
    return
  }
  document.getElementById("overlay").style.display = "block";
  const url = 'https://cors-anywhere.herokuapp.com/https://champstutorial.herokuapp.com/api/v1/auth/signup';

  const data = {
    "fullname": name,
    "phone": phone,
    "email": email,
    "password": pass,
  };
  fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(res => {
      if (res.responseCode === 00) {
        console.log(res);
        // const token = res.data.token;
        // localStorage.setItem('token', token);
        document.getElementById("overlay").style.display = "none";
        location.href = "profile.html";
      } else {
        console.log(res);

        document.getElementById("overlay").style.display = "none";
        document.getElementById("alert").style.display = "block";
        document.getElementById("loginErr").innerHTML = res.responseMessage;
      }
    })
    .catch(error => {
      console.log(error);
      document.getElementById("overlay").style.display = "none";
      document.getElementById("alert").style.display = "block";
      document.getElementById("loginErr").innerHTML = "Please check your internet connection";
    });
}

const login = () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("pass").value;
  if (email, pass === '') {
    document.getElementById("alert").style.display = "block";
    document.getElementById("loginErr").innerHTML = "Please enter your login details";
    return
  }
  document.getElementById("overlay").style.display = "block";
  const url = 'https://cors-anywhere.herokuapp.com/https://champstutorial.herokuapp.com/api/v1/auth/login';

  const data = {
    "email": email,
    "password": pass,
  };

  fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(res => {
      if (res.token) {
        const { token, data } = res;
        localStorage.setItem('token', token);
        localStorage.setItem('name', data.fullname);
        const ntoken = JSON.parse(atob(token.split('.')[1]));
        ntoken.is_admin === 'true' ?
          location.href = "admin.html" :
          ntoken.is_admin === null ?
          location.href = "profile.html" :
          "Please Signup";
      } else {
        console.log(res)
        document.getElementById("overlay").style.display = "none";
        document.getElementById("alert").style.display = "block";
        document.getElementById("loginErr").innerHTML = res.responseMessage;
      }
    })
    .catch(error => {
      console.log(error.message)
      document.getElementById("overlay").style.display = "none";
      document.getElementById("alert").style.display = "block";
      document.getElementById("loginErr").innerHTML = "Please check your internet connection";
    });
}
