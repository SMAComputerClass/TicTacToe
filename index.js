// Put your JavaScript in this file.
'use strict';   // Enable "strict mode".  Note: This *must* be the first statement in the script.
                // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode


      var PLAYER_ONE_SYMBOL = "X";
      var PLAYER_TWO_SYMBOL = "O";

      // define constant vars to represent game status
      var GAME_CONTINUE = 0;
      var GAME_WINNER = 1;
      var GAME_TIE = 2;

      var currentTurn = PLAYER_ONE_SYMBOL;
      var numberOfMoves = 0; // if numberOfMoves reaches 9 and there is no winner, it's a tie!

      // retrieve the screen elements into global variables
      var board = document.getElementById("board");  // only 1 board, use ID
      var replayButton = document.getElementById("replayButton");
      var results = document.getElementById("resultsText");
      var foundWinner = false;  // simple boolen for use in loop

// --- Click event on a board, but the actual event is on a square
      board.addEventListener('click', function(e)
      {
        // don't allow user to click on an occupied square or an empty square after the game is already over
        if ((e.target.innerHTML != "") || (foundWinner == true))
        {
          return;  // return immediately
        }

        // update square to current turn's symbol - legal play
        e.target.innerHTML = currentTurn;
        numberOfMoves++;  // increase only if valid move

        var check = checkForWinner();  // function returns 1 of 3 game statuses - Continue, Tie, or Win

        // 3 possible status options:
        switch (check)
        {
          case GAME_CONTINUE:  // No winner, flip turn and continue game

            // flip the currentTurn variable to the next player using the ternery operator
            if (currentTurn == PLAYER_ONE_SYMBOL)
            {
              currentTurn = PLAYER_TWO_SYMBOL;
            }
            else
            {
              currentTurn = PLAYER_ONE_SYMBOL;
            }

            break;

          case GAME_TIE:
            results.innerHTML = "Game ended in a tie!";
            console.log ("Game ended in a tie!");
            replayButton.style.visibility = "visible";  // make the button visible
            break;

          default:    // GAME_WINNER
              results.innerHTML = currentTurn + " Won!";
              console.log (currentTurn + " Won!");
              replayButton.style.visibility = "visible";  // make the button visible

        } // end switch

      });  // end of the board eventlistener

// --- Click event on the replay button -------------------
      replayButton.addEventListener('click', function(e)
      {

        // reset turn to player 1
        currentTurn = PLAYER_ONE_SYMBOL;
        numberOfMoves = 0; // if numberOfMoves reaches 9 and there is no winner, it's a tie!
        foundWinner = false;  // reset var

        // blank out all squares
        var squares = document.querySelectorAll('.square');

        var i;

        for (i=0; i<squares.length; i++)
        {
          squares[i].innerHTML = ""; // set the square text to empty string
        }

        // reset results area
        results.innerHTML = "";
        replayButton.style.visibility = "hidden";

      });  // end replay button listener function

// ---- Begin - Check for Winner function, returns true if a winner is found

      function checkForWinner()
      {
        // initialize variables, retrieve array of squares
        var squares = document.querySelectorAll('.square');
        var winningCombos =  [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
        var i = 0;  // i will be used to iterate through the array of winningCombos

        // loop until either a winner is found or you reach the end of the winning combos array
        while ((foundWinner == false) && (i < winningCombos.length))
        {
          // take an extra step to store winning combo numbers
          // individually for easier reading
          var firstNum = winningCombos[i][0];  // first position (remember arrays start at 0)
          var secondNum = winningCombos[i][1]; // second position
          var thirdNum = winningCombos[i][2];  // third position

          // console.log ("Current winningCombo we're checking: " + winningCombos[i]);
          // console.log ("First symbol: " + squares[firstNum].innerHTML);
          // console.log ("Second symbol: " + squares[secondNum].innerHTML);
          // console.log ("Third symbol: " + squares[secondNum].innerHTML);

          // if all 3 places in the winning combo match the current turn, you found a winner
          if( (squares[firstNum].innerHTML == currentTurn) && (squares[secondNum].innerHTML == currentTurn) && (squares[thirdNum].innerHTML == currentTurn))
          {
            foundWinner = true;  // this will cause the loop to end at the next while statement
          }

          i++;  // move to the next winning combo, loop will end if we reach end of winning combos and no winner found

        }  //  end while loop

        if ((foundWinner == false) && (numberOfMoves == 9))
          return GAME_TIE;

        if (foundWinner == true)
          return GAME_WINNER;
        else
          return GAME_CONTINUE;

      }  // End Check for Winner function -----------------------------------------
