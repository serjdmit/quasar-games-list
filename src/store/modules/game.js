export default {
  actions: {
    async fetchGames(ctx) {
      const res = await fetch("statics/games.json");
      const games = await res.json();
      this.games = games;

      let favorites = JSON.parse(
        "[" + localStorage.getItem("favoriteGames") + "]"
      )[0];

      if (!favorites) {
        favorites = [];
      }
      this.favorites = favorites;

      this.games = games.map(game => {
        if (favorites.indexOf(game.id) > -1) {
          game.like = true;
        } else {
          game.like = false;
        }
        return game;
      });

      ctx.commit("UPDATE_GAMES", games);
      ctx.commit("UPDATE_FAVORITES", favorites);
    }
  },
  mutations: {
    UPDATE_GAMES(state, games) {
      state.games = games;
    },
    UPDATE_FAVORITES(state, favorites) {
      state.favorites = favorites;
    }
  },
  state: {
    games: [],
    favorites: []
  },
  getters: {
    allGames(state) {
      return state.games;
    },
    favoriteGamesList(state) {
      setTimeout(() => {
        window.localStorage.favoriteGames = JSON.stringify(state.favorites);
      }, 0);
      return state.favorites;
    },
    favoriteGames: state => {
      return state.games.filter(game => game.like);
    },
    favoritesCount: state => {
      return state.games.filter(game => game.like).length;
    }
  }
};
