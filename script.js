const game = {
  title: "Guess the Number!",
  biggestNum: 10,
  smallestNum: 1,
  secretNum: null,
  prevGuesses: [],
  guess: "",
  minRange: false,
  maxRange: false,
  play: function () {
    this.bonus();
    this.secretNum =
      Math.floor(Math.random() * (this.biggestNum - this.smallestNum + 1)) +
      this.smallestNum;
    this.getGuess();
  },
  getGuess: function () {
    while (this.guess !== "quit") {
      this.guess = prompt(
        `Enter a guess between ${this.smallestNum} and ${this.biggestNum} or 'quit' to exit: \n Secret num = ${this.secretNum}`
      );
      if (this.guess !== "quit") {
        this.guess = parseInt(this.guess);
        if (isNaN(this.guess) === false) {
          if (this.guess >= this.smallestNum && this.guess <= this.biggestNum){
            this.render();
          } else {
            alert(
              `Please enter a number with your desired range ${this.smallestNum} - ${this.biggestNum}`
            )
          }
        }
      }
    }
  },
  render: function () {
    this.prevGuesses.push(this.guess);
    if (this.guess === this.secretNum) {
      alert(`Congrats! You guessed the number correctly! The secret number was ${this.secretNum}. You got it in ${this.prevGuesses.length}. tries`);
      this.guess = "quit";
    } else if (this.guess > this.secretNum) {
      alert(
        `You guessed too high! Try Again. Your previous guesses are ${this.prevGuesses}.`
      );
    } else if (this.guess < this.secretNum) {
      alert(
        `You guessed too low! Try Again. Your previous guesses are ${this.prevGuesses}.`
        );
    }
  },
  bonus: function () {
    while (this.minRange === false) {
      let min = prompt("Enter a minimum number: ");
      if (min === "quit") {
        this.guess = "quit";
        this.minRange = true;
      } else {
        min = parseInt(min);
        if (isNaN(min) === true) {
          alert("Enter a real minimum number: ");
        } else {
          this.smallestNum = min;
          this.minRange = true;
        }
      }
    }
    if (this.guess != "quit"){
      while (this.maxRange === false) {
        let max = prompt("Enter maximum number: ");
        if (max === "quit") {
          this.guess = "quit";
          this.maxRange = true;
        } else {
          max = parseInt(max);
          if (isNaN(max) === true) {
            alert("Enter a real maximum number: ");
          } else {
            this.biggestNum = max;
            this.maxRange = true;
          }
        }
      }
    }
  },
};
game.play();
