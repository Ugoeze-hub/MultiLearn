const OTPinputs = document.querySelectorAll("input");
const button = document.querySelector("button");

window.onload = () => OTPinputs[0].focus();

OTPinputs.forEach((input) => {
  input.addEventListener("input", () => {
    const currentInput = input;
   const nextInput = currentInput.nextElementSibling;

    // Ensure only one character is allowed in the input field
    if (currentInput.value.length > 1) {
      currentInput.value = currentInput.value[0]; // Keep only the first character
    }

    // Enable and focus on the next input field if current input is valid
    if (
      nextInput !== null &&
      nextInput.hasAttribute("disabled") &&
      currentInput.value !== ""
    ) {
      nextInput.removeAttribute("disabled");
      nextInput.focus();
    }

    const allFilled = Array.from(OTPinputs).every((input) => input.value !== "");
    if (allFilled) {
      button.classList.add("active");
      // Optional auto-submit:
      document.getElementById('codeform').submit();
    } else {
      button.classList.remove("active");
    }
  });

  input.addEventListener("keyup", (e) => {
    console.log(e);
    if (e.key == "Backspace") {
      if (input.previousElementSibling != null) {
        e.target.value = "";
        e.target.setAttribute("disabled", true);
        input.previousElementSibling.focus();
      }
    }
  });
});
