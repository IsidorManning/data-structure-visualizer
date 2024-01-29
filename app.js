import Window from "./window.js";

const appWindow = new Window();

function main() {
  // This function gets executed as soon as the 'index.html' gets
  // loaded successfully. What it does it that it generates the
  // 'form' element in which we have the input element, 'input-form',
  // where the user will firstly input their data.

  // Create the form: The 'form-container' is already included from 
  // the start in the 'index.html'.
  const formContainer = document.getElementById("form-container");
  const form = document.createElement("form");
  form.id = "input-form";
  form.onsubmit = appWindow.handleUserInput.bind(appWindow);
  formContainer.appendChild(form);

  // Create the form:
  const input = document.createElement("input");
  input.style.opacity = "0";
  input.className = "input font";
  input.id = "input";
  input.type = "text";
  input.placeholder = "Your Data";
  form.appendChild(input);

  setTimeout(() => { input.style.opacity = "1"; }, 300);
}

main();
