// invoking the module pattern
(function () {
    'use strict';

    //  global variables ********************************************

    let turnControl    = -1;                  //    the counter for determining whoseTurn
    let whoseTurn      = 0;                   //    the determination of which player is up
    let nameOfPlayer   = ['Tie Game','',''];  //    the array of player names
    let winner         = '';                  //    the name of the winner or 'Tie Game'
    let isWin          = false;               //    has the game been won -- by either player
    let tieGame        = false;               //    is the game a time game
    let AI             = false;               //    is the computer playing
    let computersTurn  = false;               //    is it the computer's turn
    let test           = false;               //    have the name's been properly entered (beginning screen)
    let errMark        = '';                  //    if names don't validate, where to set focus
    let beginGame      = true;                //    beginning of game indicator
    let endOfGame      = false;               //    end-of-game indicator
    //  define the various states of cell selection
    let selectedCellId = '';                  //    the currently selected cell id
    let cellsPlayedAll = [];                  //    a list of all cells that have been played -- either player
    let cellsPlayedOne = [];                  //    a list of all cells played by player one
    let cellsPlayedTwo = [];                  //    a list of all cells played by player two
    let cellsPlayedNow = [];                  //    a copy of cellsPlayedOne or cellsPlayedTwo (based on whoseTurn)

    // define the board area
    const allCellIds          = ['1a','1b','1c','2a','2b','2c','3a','3b','3c'];
    const winningCombinations = [
        ['1a','1b','1c'],
        ['2a','2b','2c'],
        ['3a','3b','3c'],
        ['1a','2a','3a'],
        ['1b','2b','3b'],
        ['1c','2c','3c'],
        ['1a','2b','3c'],
        ['3a','2b','1c']
    ];

    // create start screen div
    let startDiv = document.createElement("div");
    startDiv.id = 'start';
    startDiv.className = 'screen screen-start';

    let startHead = document.createElement("header");
    startHead.innerHTML = "<h1>Tic Tac Toe</h1><br>";
    startDiv.append(startHead);
    let formHtml  = "<form id='playerForm'>";
    formHtml     += "<label id='player1label' for='player1name'>Player 1 Name</label><br>";
    formHtml     += "<p class='playerName'><input type='text' id='player1name' name='player1name'></p>";
    formHtml     += "<label id='player2label' for='player2name'>Player 2 Name</label><br>";
    formHtml     += "<p class='playerName'><input type='text' id='player2name' name='player2name'></p>";
    formHtml     += "<input type='checkbox' id='AI' name='checkbox'>";
    formHtml     += "<label id='AI' for='AI'> Play the Computer?</label><br><br>";
    formHtml     += "<button type='submit' id='startButton'>Start Game</button></form>";
    let startForm = document.createElement("form");
    startForm.innerHTML = formHtml;
    startDiv.append(startForm);

    //  create error displays
    let err = document.createElement("div");
    err.id = 'err';
    err.innerHTML = "<p style='color: red; animation: blinker 1s linear infinite;'><small>Required: 2 Names or Player 1 & Checkbox checked!</small></p>";
    startDiv.append(err);

    // add the newly created elements and content into the DOM
    let boardDiv = document.getElementById("board");
    document.body.insertBefore(startDiv, boardDiv);
    
    //  begin finish screen build - save for end of game
    let finishScreen = document.createElement('div');
    finishScreen.setAttribute('id', 'finish');
    let finishHead = document.createElement('header');
    finishHead.innerHTML='<h1>Tic Tac Toe</h1><br>';
    finishScreen.append(finishHead);

    //*************************************************************
    //      Functions
    //*************************************************************
    //

    function setupGame() {
    //  setup the board, set Ids on game box cells, clear any textContent from previous game
        beginGame = false;
        $("#start").show();
        $("#err").hide();
        $("#board").hide();
        $("#finish").hide();
        //  identify cells by id & initiate cells as un-played
        let lis = document.getElementsByClassName('box');
        for ( let i = 0; i < 9; i++ ) {
            lis[i].id = allCellIds[i];
            lis[i].className = 'box unfilled';
            lis[i].textContent = '';
        }
        turnControl  = -1;            //  initiate turnControl
        $("#player1name").focus();    //  set focus on first players name
    }

    function validNames() {
    //  Verify: that name rules are followed
    //  The Rules:
    //      neither nameOfPlayer[1] nor nameOfPlayer[2] may be an empty string
    //      if nameOfPlayer[1] is not input - an error is flagged
    //      if nameOfPlayer[2] is not input - one of the following will happen
    //          'Play the Computer' Checkbox MUST be checked, in which case nameOfPlayer2 is set to
    //          'HAL9000'
    //          OR else an error will be flagged.
    //              The result being that nameOfPlayer[2] = either another human's name or is forced to
    //              'HAL9000' (in honor of 2001 - A Space Odyssey)
    //

        test = true;                                 //  default setting - Names verified
        errMark = '';                                      //  indicator - first field not verified
        AI = document.getElementById("AI").checked;        //  check for computer is playing

        nameOfPlayer[1] = document.getElementById('player1name').value;
        // empty name 1 is always an error
        if ( nameOfPlayer[1] === '' ) {
            test = false;
            errMark='#player1name';
        }
        //  if playing the computer, name player2 after the computer in 2001 - A Space Oddessy
        if ( AI ) {
            document.getElementById('player2name').value = 'HAL9000';
        }
        nameOfPlayer[2] = document.getElementById('player2name').value;
        // (empty name 2 && unchecked) is always an error
        if ( nameOfPlayer[2] === '' ) {
            test = false;
            if ( errMark === '' ) {errMark='#player2name';}
        }
        return test;
    }

    function playerTurnControl() {
    // player turn control
    //      There are two decisions to make
    //          Is current player = player1 or player2
    //          If current player = player2 && AI
    //              computersTurn = true
    //          else
    //              computersTurn = false
    //
        turnControl += 1;
        whoseTurn = ( turnControl % 2 ) + 1;                 // determines which player is "up", always = 1 or 2
        computersTurn = false;
        $(".players").removeClass('active');                 // reset 'active' player indicator
        switch ( whoseTurn ) {
            case 1:
                $( "#player1" ).addClass( 'active' );        // player1 = active
                break;
            case 2:
                $( '#player2' ).addClass( 'active' );        // player2 = active
                if (AI) {computersTurn = true;}
                break;
            default:
                alert('RUN FOR THE HILLS - MATH MODULUS JUST BROKE - ARMAGEDDON IS UPON US');
        }
        if ( computersTurn ) {
            // delay computer play so that it is human-visible
            setTimeout(function() {
                computerPlay();
            },500);
        }
    }

    function computerPlay() {
        //  computer plays a turn
        //      Will not get here unless player2 is the computer AND it is player2's turn
        //
        // locate unfilled cells
        let listOfUnfilled = document.getElementsByClassName('unfilled');   // get list of remaining unfilled cells
        let picked = Math.floor(Math.random() * listOfUnfilled.length);     // pick random cell from the list
        selectedCellId = listOfUnfilled[picked].id;                         // get the id from the unfilled list
        $( '.boxes > li' ).each(function(index) {                           // adjust 'picked' to value in full list
            if ( selectedCellId === this.id ) {
                picked = index+1;
            }
        });

        // remove class 'unfilled', add class 'filled-2'
        let selectedCell = $('.boxes > li:nth-child('+picked+')');
        selectedCell.removeClass('unfilled').addClass('filled-2');

        // update cells played
        updateCell();
        playerTurnControl();
    }

    function updateCell() {
    // fill a cell and test for win
        // update cells played
        cellsPlayedAll.push(selectedCellId);
        switch ( whoseTurn ) {
            case 1:
                cellsPlayedOne.push(selectedCellId);
                cellsPlayedNow = cellsPlayedOne;
                break;
            case 2:
                cellsPlayedTwo.push(selectedCellId);
                cellsPlayedNow = cellsPlayedTwo;
                break;
            default:
                alert('whoseTurn = '+whoseTurn);
        }
        tieGame = false;
        //  test for a win
        if ( cellsPlayedNow.length > 2 ) {
            testForWin();
        }
    }

    function testForWin() {
        //  test for the current player having won after 3 plays have been made
        //  how the test runs
        //      the inside loop (t) cycles the player's cells
        //      the middle loop (c) cycles through winningCombinations columns
        //      the outside loop (r) cycles through winningCombinations rows
        //      when a match occurs between t/c, matches gets incremented
        //      to avoid a false win indication, matches is set to 0 with each new row
        //
        for ( let r = 0; r < 8; r ++ ) {                                        //  rows in winningCombinations
            let matches = 0;                                                    //  reset matches, each row
            for ( let c = 0; c < 3; c ++ ) {                                    //  columns in winningCombinations
                for ( let t = 0; t < cellsPlayedNow.length; t ++ ) {            //  cells played by player
                    if ( cellsPlayedNow[t] === winningCombinations[r][c] ) {
                        matches ++;
                    }
                }
            }

            if ( matches === 3 ) {
                isWin = true;
                break;
            }
        }
        // test for end of game
        if ( isWin ) {
            endGame(whoseTurn);
        } else if ( cellsPlayedAll.length === 9 ) {
            tieGame = true;
            whoseTurn = 0;
            endGame(whoseTurn);
        }
    }

    function endGame(whoseTurn) {
        // complete finish screen build
        let winnerDiv = document.createElement('div');
        winnerDiv.setAttribute('id', 'winner');

        //  build finish screen specifics based on the results of the game
        switch ( whoseTurn ) {
            case 1:
                finishScreen.setAttribute('class', 'screen screen-win one');
                winner = 'Winner Is -- '+nameOfPlayer[whoseTurn];
                break;
            case 2:
                finishScreen.setAttribute('class', 'screen screen-win two');
                winner = 'Winner Is -- '+nameOfPlayer[whoseTurn];
                break;
            default:
                finishScreen.setAttribute('class', 'screen screen-win tie');
                winner = 'No Winner -- '+nameOfPlayer[0];
        }
        winnerDiv.innerHTML='<h2>'+winner+'</h2>';
        finishScreen.append(winnerDiv);
        let finishButton = document.createElement('button');
        finishButton.setAttribute('id', 'newGame');
        finishButton.setAttribute('type', 'button');
        finishButton.textContent = 'New Game';
        finishScreen.append( finishButton );
        $( "body" ).append(finishScreen);
        $("#board").hide();
        $("#finish").show();

        endOfGame = true;
    }

    //      End of Functions
    //*************************************************************

    //*************************************************************
    //      Event Listeners
    //*************************************************************
    //  start button click - used for start game    ***************

    $("#startButton").click(function() {
        if ( validNames() ) {                            //  this is the 'validated' block
            $("#err").hide ();                           //  initialize the board
            $("#start").hide();                          //  hide the start screen
            $("#board").show();                          //  show the game board
            $(".box").removeClass('filled-1 filled-2');  //  remove the settings of any prior games

            //add some pizazz - show the player names (not to mention extra credit)
            let board = document.getElementById( "board" );
            let ul = document.getElementsByClassName( "boxes" )[0];
            let div = document.createElement("div");
            div.className = 'playerNames';
            let inner        = "<p class='player1name'>"+nameOfPlayer[1]+"</p>";
            inner           += "<p class='player2name'>"+nameOfPlayer[2]+"</p><br>";
            div.innerHTML = inner;
            board.insertBefore( div, ul );

            //update the player turn control
            playerTurnControl();
        } else {                                         //  names NOT validated
            $("#err").show();                            //  display error message
            $(errMark).focus();                          //  set focus on first error field
        }
    });

    // Hover Event - show/remove current player game piece    ***********
    $(".box.unfilled").hover(function() {
        switch ( whoseTurn ) {
            case 1:
                $( this ).css('background-image', 'url(img/o.svg)');
                break;
            case 2:
                $( this ).css('background-image', 'url(img/x.svg)');
                break;
            default:
                alert('OK! YOU DID IT AGAIN. YOU BROKE MATH MODULUS '+whoseTurn);
        }

    }, function() {
        $(this).css('background-image', '');
    });

    // Click Event - fill the box   *******************************
    $(".box.unfilled").click(function() {
        $(this).removeClass('unfilled').addClass("filled-"+whoseTurn);
        selectedCellId = $(this)[0].id;
        // update played cell
        updateCell();
        if ( !endOfGame ) { 
            playerTurnControl(); 
        }
    });

    // Click Event - New Game Button (end of game)   *******************
    $("#newGame").click(function() {
        $("#finish").hide();
        //restart game - reinitialize globals
        turnControl    = -1;                  
        whoseTurn      = 0;                   
        nameOfPlayer   = ['Tie Game','',''];  
        winner         = '';                  
        isWin          = false;               
        tieGame        = false;               
        AI             = false;               
        computersTurn  = false;               
        test           = true;
        errMark        = '';                  
        endOfGame      = false;
        beginGame      = true;
        //  reintialize the various states of cell selection
        selectedCellId = '';                  
        cellsPlayedAll = [];                  
        cellsPlayedOne = [];                  
        cellsPlayedTwo = [];                  
        cellsPlayedNow = [];
        document.getElementById("playerForm").reset();
        $( ".playerNames" ).remove();
        $( "#winner" ).remove();
        
        setupGame();
    });

    //      End of Event Listeners
    //*************************************************************

    //  initialize the game
    if ( beginGame ) {setupGame();}

//closing module pattern
}());

/*********************************************************************
 *
 * Note to self - Game Plan (as envisioned in the beginning)
 *                more or less as executed
 *
 * 1. Set Globals
 *
 * 2. Build Screens
 *      2.1 Start
 *      2.2 Game Board
 *      2.3 Player 1 Win
 *      2.4 Player 2 Win
 *      2.5 Tie Game
 *
 * 3. Initialize Game
 *      3.1 Hide Screens
 *          Game Board
 *          Player 1 Win
 *          Player 2 Win
 *          Tie Game
 *      3.2 Show Screen - Start
 *      3.3 Identify Players
 *          2 Players or
 *          1 Player and Computer (HAL)
 *
 *          Rules:
 *              Must have 2 players (1 may be the computer)
 *              Player 1 must be named
 *              Player 2 must be named OR Play the Computer must be checked
 *              if computer played is checked Player 2 is named HAL9000
 *              Start Game Button click event will not do anything if the above rules are not met
 *
 * 4. Play the Game
 *      4.1 Determine whose turn
 *      4.2 Take a turn
 *          4.2.1 Click cell
 *          4.2.2 Mark cell
 *              4.2.2.1 Update Counters
 *              4.2.2.2 Test for winner if playerTurn >= 3
 *          4.2.3 Next Turn or End
 * 5. End the Game
 *      5.1 show the winner
 *      5.2 play mp3
 * 6. New Game/Quit
 *      6.1 kill mp3
 *      6.2 go to 3 or quit
 *
 *********************************************************************/
