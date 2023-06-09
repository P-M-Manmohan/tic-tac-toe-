const App = {
  //All selected html elemnts
  $: {
    menu: document.querySelector('[data-id="menu"]'),
    menuItems: document.querySelector('[data-id="menu-items"]'),
    resetBtn: document.querySelector('[data-id="reset-btn"]'),
    newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
    squares: document.querySelectorAll('[data-id="square"]'),
  },

  state: {
    moves: [],
  },

  init() {
    App.registerEventListeners();
  },

  registerEventListeners() {
    console.log(App.$.squares);

    //DONE
    App.$.menu.addEventListener("click", (event) => {
      App.$.menuItems.classList.toggle("hidden");
    });
    //TODO
    App.$.resetBtn.addEventListener("click", (event) => {
      console.log("Reset the game");
    });
    //TODO

    App.$.newRoundBtn.addEventListener("click", (event) => {
      console.log("new round");
    });
    //TODO
    App.$.squares.forEach((square) => {
      square.addEventListener("click", (event) => {
        //check if played if played return early

        const hasMove = (squareId) => {
          const existingMove = App.state.moves.find(
            (move) => move.squareId === squareId
          );
          return existingMove !== undefined;
        };

        if (hasMove(+square.id)) {
          return;
        }

        //create icon and add icon depending on the current player
        const lastMove = App.state.moves.at(-1);
        const getOppositePlayer = (playerId) => (playerId === 1 ? 2 : 1);
        const currentPlayer =
          App.state.moves.length === 0
            ? 1
            : getOppositePlayer(lastMove.playerId);

        const icon = document.createElement("i");

        if (currentPlayer === 1) {
          icon.classList.add("fa-solid", "fa-x", "yellow");
        } else {
          icon.classList.add("fa-solid", "fa-o", "turquoise");
        }

        App.state.moves.push({
          square: +square.id,
          playerId: currentPlayer,
        });
        //toggle player
        App.state.currentPlayer = currentPlayer === 1 ? 2 : 1;

        console.log(App.state);

        square.replaceChildren(icon);

        //check if there is a win or tie

        const winningpatterns = [
          [1, 2, 3],
          [1, 5, 9],
          [1, 4, 7],
          [2, 5, 8],
          [3, 5, 7],
          [3, 6, 9],
          [4, 5, 6],
          [7, 8, 9],
        ];
      });
    });
  },
};

window.addEventListener("load", App.init);
