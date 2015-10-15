/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


window.findNRooksSolution = function(n) {
  var solution = new Board({ n: n}); 
  // first row/array
  // place a queen at a random position in the first row each time
  // console.log(solution)
  solution.get(0)[Math.floor(Math.random() * n)] = 1;

  //HELPER FUNCTION - if there is queen in the column
 var hasOneInColumn = function(board, colIndex) {
      var count = 0;
      var matrix = board.rows();

      for( var i = 0; i < matrix.length; i++ ){
        if( matrix[i][colIndex] === 1 ){
          count += 1;
        }
      }
      if( count >= 1){
        return true;
      }
      return false;
  };

  //MAKING THE BOARD
  var recursive = function(rowIndex, colIndex){
    //checking if rowIndex or colIndex is equal to the size of the board
    //base case
      if(rowIndex === n || colIndex === n){
        return;
      }
      //queen in the row
      if(solution.get(rowIndex).indexOf(1) !== -1){
        recursive(rowIndex+1, colIndex);
      } else if(hasOneInColumn(solution, colIndex)){
        recursive(rowIndex, colIndex+1);
      } else {
        solution.get(rowIndex)[colIndex] = 1;
      }
        recursive((rowIndex+1),(colIndex+1));
  }
  recursive(1, 0);


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var solutionCount = 0;
  var board = new Board({n:n});

//recursive function
  //start from the first row and then down, the number of rows equal number of rooks, solution++
  var numSolutions = function(row){
    if(row === n){
      solutionCount++;
      return;
    }

    //loop over column
    for( var i = 0; i < n; i++){
      //put rook
      board.togglePiece(row, i);
      if(!board.hasAnyRooksConflicts()){
        numSolutions(row+1);
      }
      //return to original state
      board.togglePiece(row, i);
    }
  }
  //start from the first row
  numSolutions(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = 0; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  var solutionCount = 0;
  var board = new Board({n:n});

  if(n === 1 || n === 0){
    return 1;
  } else if(n === 2 || n === 3){
    return 0;
  }
//recursive function
  //start from the first row and then down, the number of rows equal number of rooks, solution++
  var numSolutions = function(row){
    if(row === n){
      solutionCount++;
      return;
    }

    //loop over column
    for( var i = 0; i < n; i++){
      //put queen
      board.togglePiece(row, i);
      if( !board.hasAnyQueensConflicts() ){
        numSolutions(row+1);
      }
      //return to original state
      board.togglePiece(row, i);
    }
  }
  //start from the first row
  numSolutions(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
