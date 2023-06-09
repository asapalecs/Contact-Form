function displayGreeting() {
    var nameInput = document.getElementById('nameInput');
    var name = nameInput.value;
    var greeting = document.getElementById('greeting');
    greeting.textContent = name + '!';
  }

  window.addEventListener('DOMContentLoaded', function() {
    var submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', displayGreeting);
  });
