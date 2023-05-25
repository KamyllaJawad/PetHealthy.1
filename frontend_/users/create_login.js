function getValuesInputsCreate() {
  return {
    name: document.querySelector("#name").value,
    email: document.querySelector("#email").value,
    login: document.querySelector("#loginUser").value,
    password: document.querySelector("#passwordUser").value,
    cpf: document.querySelector("#cpf").value,
    birthdate: document.querySelector("#birthdate").value,
  };
}

function getValuesInputsLogin(){
    return {
        login: document.querySelector("#userLogin").value,
        password: document.querySelector("#userPassword").value
      };
}

function create_user() {
  let values = getValuesInputsCreate();
  let data = values;
  console.log(data);

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:3352/users",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}

function login_user() {
  let values = getValuesInputsLogin();
  let data = values

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:3352/users/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}
