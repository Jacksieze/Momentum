const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");
const todolist = document.querySelector(".todo-wrapper");
const logOut = document.querySelector(".log-out");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event) {
  event.preventDefault();
  const username = loginInput.value;
  loginForm.classList.add(HIDDEN_CLASSNAME);
  localStorage.setItem(USERNAME_KEY, username);
  paintGreetings(username);
}

function paintGreetings(username) {
  greeting.innerText = "Welcome!";
  greeting.classList.remove(HIDDEN_CLASSNAME);
  greeting.style.transition = "all 1s";
  setTimeout(() => {
    greeting.innerText = `${getGreeting()}, ${username}!`;
    todolist.classList.remove(HIDDEN_CLASSNAME);
    logOut.classList.remove(HIDDEN_CLASSNAME);
  }, 1000);
}
function getGreeting() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  if (currentHour < 12) {
    return "Good Morning";
  } else if (currentHour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  paintGreetings(savedUsername);
}

logOut.addEventListener("click", () => {
  if (confirm("정말로 로그아웃 하시겠습니까?") === true) {
    localStorage.removeItem(USERNAME_KEY);
    window.location.reload();
  } else {
    return false;
  }
});
