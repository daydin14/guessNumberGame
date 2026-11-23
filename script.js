"use strict";

const setupForm = document.querySelector("#setup-form");
const minimumInput = document.querySelector("#minimum");
const maximumInput = document.querySelector("#maximum");
const setupMessage = document.querySelector("#setup-message");
const gamePanel = document.querySelector("#game-panel");
const rangeMinimum = document.querySelector("#range-min");
const rangeMaximum = document.querySelector("#range-max");
const feedback = document.querySelector("#feedback");
const guessForm = document.querySelector("#guess-form");
const guessInput = document.querySelector("#guess");
const guessHistory = document.querySelector("#guess-history");
const restartButton = document.querySelector("#restart");

let secretNumber;
let minimum;
let maximum;
let guesses = [];

/**
 * Handles the submission of the setup form.
 * @param {Event} event - The form submission event.
 */
setupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const selectedMinimum = Number(minimumInput.value);
  const selectedMaximum = Number(maximumInput.value);

  if (
    !Number.isSafeInteger(selectedMinimum) ||
    !Number.isSafeInteger(selectedMaximum) ||
    selectedMinimum > selectedMaximum ||
    selectedMaximum - selectedMinimum > Number.MAX_SAFE_INTEGER
  ) {
    setupMessage.textContent =
      "Choose whole-number bounds in order, with a range that JavaScript can safely handle.";
    return;
  }

  minimum = selectedMinimum;
  maximum = selectedMaximum;
  secretNumber =
    Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  guesses = [];
  guessHistory.replaceChildren();
  guessInput.value = "";
  guessInput.min = String(minimum);
  guessInput.max = String(maximum);
  rangeMinimum.textContent = String(minimum);
  rangeMaximum.textContent = String(maximum);
  setupMessage.textContent = "";
  feedback.textContent = "Enter your guess below to get started.";
  guessInput.disabled = false;
  guessForm.querySelector("button").disabled = false;
  setupForm.hidden = true;
  gamePanel.hidden = false;
  guessInput.focus();
});

/**
 * Handles the submission of the guess form.
 * @param {Event} event - The form submission event.
 */
guessForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const guess = Number(guessInput.value);
  if (!Number.isSafeInteger(guess) || guess < minimum || guess > maximum) {
    feedback.textContent = `Enter a whole number between ${minimum} and ${maximum}.`;
    return;
  }

  guesses.push(guess);
  const guessItem = document.createElement("li");
  guessItem.textContent = String(guess);
  guessHistory.append(guessItem);
  guessInput.value = "";

  if (guess === secretNumber) {
    feedback.textContent = `You got it! The number was ${secretNumber}. You found it in ${guesses.length} ${
      guesses.length === 1 ? "guess" : "guesses"
    }.`;
    guessInput.disabled = true;
    guessForm.querySelector("button").disabled = true;
  } else if (guess > secretNumber) {
    feedback.textContent = "Too high. Try a lower number.";
  } else {
    feedback.textContent = "Too low. Try a higher number.";
  }
});

/**
 * Handles the click event on the restart button to reset the game.
 */
restartButton.addEventListener("click", () => {
  gamePanel.hidden = true;
  setupForm.hidden = false;
  setupMessage.textContent = "";
  minimumInput.focus();
});
