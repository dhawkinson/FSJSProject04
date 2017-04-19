# <h2>FSJSProject04</h2>

<h3>Interactive Tic-Tac-Toe<h3>

<p>In this project, you'll build a functional, two-person tic-tac-toe game. You'll use the provided mockups, HTML, CSS and image files to create a game that requires players to add their names, take turns adding an X or O to the game board, and announce when the game ends. You'll need to keep track of the state of the game -- who's turn it is, where the X's and O's are on the board, and whether the game is a draw or, if not, who won and lost.</p>

<p>You'll use your knowledge of JavaScript data structures like arrays and objects as well as DOM-manipulation using jQuery or plain JavaScript to complete this project.</p>

<p>And, in order to make sure you're practicing good programming practices, use the module pattern to create your Tic-Tac-Toe game. In other words, you should wrap all of your code in a single global variable, or execute it all in a single self-invoking function. See the link in the project resources for a Treehouse workshop on the module pattern.</p>

<p><strong>NOTE: To get an "Exceeds Expectations" grade for this project, you'll need to "exceed" on every requirement that has an "Exceeds Expectations" option.</strong></p>

<p>Download the project files. We've several files to help with this project</p>
<ul>
<li>The mockups folder shows what the page should look like when it first loads, as a game is being played, and when the game is over.</li>
<li>The html_snippets folder contains three files:</li><ul><li>start.txt includes the HTML for the opening screen. What players see when the page first loads.</li><li>board.txt includes the HTML of the Tic-Tac-Toe gameboard.</li><li>win.txt includes the HTML to display when the game is over. You'll need to modify this HTML for when player 0 or X wins or when there's a tie</li></ul>
<li>The css folder contains the CSS for the game</li>
<li>The img folder contains two SVG images -- o.svg and x.svg. These images are used to display the players, and are used in the boxes of the board to indicate who claimed that square</li>
<li>The index.html file is the page where the game will be displayed</li>
<li>The js folder is empty -- that's where you'll add your JavaScript file or files.</li></ul>

<p>Use the supplied mockup files and HTML snippets to guide you in building a Tic-Tac-Toe game. You can use jQuery or plain JavaScript to complete this project. 

<p>Don't use an already programmed Tic-Tac-Toe plugin or library.</p>

<p>When the page loads, the startup screen should appear. Use the tictactoe-01-start.png mockup, and the start.txt HTML snippet to guide you.</p>

<p>Add programming, so that when the player clicks the start button the start screen disappears, the board appears, and the game begins. Use the tictactoe-02-inprogress.png mockup, and the board.txt HTML snippet to guide you.</p>

<p>Add the game play following these rules.</p>
<ul>
<li>Play alternates between X and O.</li>

<li>The current player is indicated at the top of the page -- the box with the symbol O or X is highlighted for the current player. You can do this by simply adding the class .active to the proper list item in the HTML. For example, if it's player one's turn, the HTML should look like this: <li class="players active" id="player1"></li>

<li>When the current player mouses over an empty square on the board, it's symbol the X or O should appear on the square. You can do this using the x.svg or o.svg graphics (hint use JavaScript to set the background-image property for that box.)</li>

<li>Players can only click on empty squares. When the player clicks on an empty square, attach the class box-filled-1 (for O) or box-filled-2 (for X) to the square. The CSS we're providing will automatically add the proper image to the square marking it as occupied.
The game ends when one player has three of their symbols in a row either horizontally, vertically or diagonally. If all of the squares are filled and no players have three in a row the game is a tie.</li>

<li>Add programming so that when the game ends, the board disappears and the game end screen appears. Use the tictactoe-03-winner1.png and tictactoe-04-winner2.png mockups, and the win.txt HTML snippet for guidance. Depending on the game results the final screen should:
Show the word "Winner" or "It's a Tie!"</li>

<p>Add the appropriate class to the div for the winning screen: div class="screen screen-win" id="finish" screen-win-one for player 1, screen-win-two for player two, or screen-win-tie if the game ends with no winner. For example, if player 1 wins, the HTML should look like this: <div class="screen screen-win screen-win-one" id="finish"></li></ul>

<p>Add programming so that when a player pushes the "New Game" button, the board appears again, empty and a new game begins.
Use the module pattern to wrap all of your JavaScript code into a single global variable or an immediately invoked function.</p>

<p>NOTE: A good practice is to check your project for cross browser compatibility. Making sure that it looks and functions correctly in multiple (at least three) browsers is an important part of being a top-notch developer. If you want, leave a comment to the project reviewer about which browser(s) the project was checked to ensure they are seeing things as you have designed them.</p>
<p>Some browser options:</p>
<p>Google Chrome</p>
<p>Mozilla Firefox</p>
<p>Internet Explorer/Edge</p>
<p>Safari</p>

<p><strong>Extra Credit</strong></p>

<p><strong>To get an "exceeds" rating, you can expand on the project in the following ways:</strong></p>

<p><strong>2 steps</Strong></p>
<ul>
        <li>Let a player add their name before the game starts</li>
        <ul>
                    <li>Name appears while the game is playing</li>
                    <li>The name is displayed for the winning player</li>
        </ul>
        <li><strong>Add programming to </strong>support playing against the computer. Only one player plays, the other is controlled by your programming.</li>
</ul>