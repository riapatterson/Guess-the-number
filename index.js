const readline = require('readline/promises')       // importing the readline/promises module from Node.js.
                                                    // allows you to ask the user for input asynchronously using await, which makes writing interactive CLI programs much easier and cleaner.

class Game {                                        // A blueprint for the game logic — like a template for how the game should work.
    constructor(turns, user) {
        this.rl = readline.createInterface({        // Sets up a way to interact with the terminal. Allows the game to ask the user questions and get responses via the terminal.
            input: process.stdin,
            output: process.stdout,
        })
        this.turns = turns
        this.user = user
        this.score = 0
        this.totalTurns = turns
    }

// Declaring a function async allows you to use await inside it, 
// which pauses the function execution until a promise resolves — 
// making asynchronous code look and behave more like synchronous code.
// Using await this.rl.question(...) means your program waits for the user to input something and hit enter before moving on. 

    async get_user_input() {                                                             // async function allows you to use await inside it to wait on user input.
        let user_guess = await this.rl.question('Enter a number between 1 and 10: ')     // this.rl.question() is asynchronous, so you use await to pause until the user types something and hits enter.
                                                                                         // Whatever the user types is saved into input (as a string).
        let guess = parseInt(user_guess)                                                 // turns input ('string') into a number
                                                                                         
        if ( guess < 1 || guess > 10 || isNaN(guess)) {                                 // checks validity of input
            console.log("Invalid input, please try again");
            return this.get_user_input()
        } return guess
    } 

    async again() {
        let input = await this.rl.question("Play again? [y/n]: ")
        if (input.toLowerCase() == 'y') {
            console.log(`Lets Play Again!`);
            return true
        } else if (input.toLowerCase() == 'n') {
            console.log(`See you next time!`);
            return false
        } else {
            console.log("Invalid input, please enter y for yes or n for no");
            return this.again()
        }
    }

    async end_game() {          // rl is your readline interface instance, and calling .close() on it tells Node.js that you’re done with user input — it will clean up the input/output streams and exit the interactive session.
        this.rl.close()         // function is async for consistency, doesn't use await
    }

    async play() {

        let user_guess;
        let randomNum;

        console.log(`Starting ${this.turns} rounds of 'Guess the Number'!`);

        while(this.turns) {

            console.log(`Round ${1 + (this.totalTurns - this.turns)}/${this.totalTurns} - Current Score: ${this.score}/${this.totalTurns}`);

            user_guess = await this.get_user_input();

            console.log(`You guessed ${user_guess}`);

            randomNum = Math.floor((Math.random() * 10) +1)     // generates random number between 1 and 10
            console.log(`Random number generator: ${randomNum}`);

            //Same number
            if (user_guess === randomNum) {
                console.log(`You guessed right!!!`);
                this.turns -= 1
                this.score += 1

            } else {
                console.log(`You guessed wrong :(`);
                this.turns -=1
            }
        }

        console.log(`\n=======\nFinal Score: ${this.score}/${this.totalTurns}`);

        if(await this.again()) {
            this.turns = this.totalTurns            // restarting the number of rounds back to full
            this.score = 0                          // resetting score to 0
            await this.play()                       // ??
        }

        this.end_game();
    }
}

class Player {
    constructor(name) {
        this.name = name
        }
}

// Enter your name here:       vvv
const playerName = new Player('Ria')
const game = new Game(5, playerName)
game.play()
