var Splash = function(){};

Splash.prototype = {
  init: function()
  {
    this.logo = game.make.sprite(game.world.centerX, 200, 'logo');
    this.progress = game.make.text(game.world.centerX, 380, 'Loading...', {fill: 'white'});
    this.loadingBar = game.make.sprite(game.world.centerX-(360/2), 420, 'loadingbar');

    Helper.centerGameObjects([this.logo, this.progress]);
  },

  preload: function()
  {
    game.add.sprite(0, 0, 'bg_splash');
    game.add.existing(this.logo);
    game.add.existing(this.loadingBar);
    game.add.existing(this.progress);
    this.load.setPreloadSprite(this.loadingBar);

    this.loadScripts();
    this.loadFonts();
    this.loadImages();
    this.loadAudio();
  },

  loadScripts: function()
  {
    game.load.script('Menu', 'js/states/Menu.js');
    game.load.script('Options', 'js/states/Options.js');
    game.load.script('Game', 'js/states/Game.js');
  },

  loadFonts: function()
  {
    //
  },

  loadImages: function()
  {
    game.load.image('bg_menu', 'img/bg_menu.png');
    game.load.image('bg_options', 'img/bg_options.png');
    game.load.image('bg_game', 'img/bg_game.png');
  },

  loadAudio: function()
  {
    //
  },

  addStates: function()
  {
    //
  },

  addAudio: function()
  {
    //
  }
};