var Game = function(){};

Game.prototype = {
  init: function()
  {
    this.const_Acceleration = 600;
    this.const_ShootDelay = 400;
    this.const_TimeToNextShot = 0;
    this.CUR_WEAPON = null;// = new Weapon.Pistol(this.game);
  },

  preload: function()
  {
    //

    this.loadScripts();
    this.loadFonts();
    this.loadImages();
    this.loadAudio();
  },

  loadScripts: function()
  {
    game.load.script('Bullet', 'js/obj/Bullet.js');
    game.load.script('Weapon', 'js/obj/Weapon.js');
  },

  loadFonts: function()
  {
    //
  },

  loadImages: function()
  {
    game.load.image('cursor', 'img/cursor.png');
    game.load.spritesheet('player', 'img/player.png', 40, 40, 2);
    game.load.image('zombie', 'img/zombie.png');
    game.load.image('spawner', 'img/spawner.png');
    game.load.image('img_BulletPistol', 'img/bulletPistol.png');
    game.add.sprite(-800, -600, 'bg_menu');
    game.add.sprite(-800, 0, 'bg_menu');
    game.add.sprite(0, -600, 'bg_menu');
    game.add.sprite(0, 0, 'bg_menu');
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
  }, 

  create: function()
  {
    game.world.setBounds(-800, -600, 1600, 1200);

    this.spr_Player = game.add.sprite(0, 0, 'player');
    this.spr_Player.anchor.setTo(0.5, 0.5);
    //this.spr_Player.animations.add('hurt', [2,1,2,1,2,1], 20, false);
    game.physics.enable(this.spr_Player, Phaser.Physics.ARCADE);
    this.spr_Player.body.collideWorldBounds = true;
    this.spr_Player.body.maxVelocity.setTo(400, 400);
    this.spr_Player.body.drag.setTo(600, 600);

    this.grp_Bullets = game.add.group();
    this.grp_Bullets.enableBody = true;
    this.grp_Bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.grp_Bullets.createMultiple(30, 'bullet', 0, false);
    this.grp_Bullets.setAll('anchor.x', 0.5);
    this.grp_Bullets.setAll('anchor.y', 0.5);
    this.grp_Bullets.setAll('outOfBoundsKill', true);
    this.grp_Bullets.setAll('checkWorldBounds', true);

    game.camera.follow(this.spr_Player);
    game.camera.deadzone = new Phaser.Rectangle(150, 150, 500, 300); //change?
    game.camera.focusOnXY(0, 0);

    this.spr_Cursor = game.add.sprite(0, 0, 'cursor');
    this.spr_Cursor.anchor.setTo(0.5, 0.5);
    this.CURSORS = game.input.keyboard.createCursorKeys();

    this.CUR_WEAPON = new Weapon.Pistol(this.game);
  },

  update: function()
  {
    //MOVEMENT
    this.spr_Player.rotation = game.physics.arcade.angleToPointer(this.spr_Player);
    this.spr_Player.body.acceleration.x = 0;
    this.spr_Player.body.acceleration.y = 0;

    if(this.CURSORS.left.isDown)
    {
      this.spr_Player.body.acceleration.x = -this.const_Acceleration;
    }else if(this.CURSORS.right.isDown)
    {
      this.spr_Player.body.acceleration.x = this.const_Acceleration;
    }

    if(this.CURSORS.up.isDown)
    {
      this.spr_Player.body.acceleration.y = -this.const_Acceleration;
    }else if(this.CURSORS.down.isDown)
    {
      this.spr_Player.body.acceleration.y = this.const_Acceleration;
    }

    this.spr_Cursor.x = game.input.mousePointer.worldX;
    this.spr_Cursor.y = game.input.mousePointer.worldY;

    //FIRE
    if(game.input.activePointer.isDown)
    {
      this.fire();
    }

    //COLLISION
  }, 

  fire: function()
  {
    //TODO: Spawn bullet at end of gun barrel
    //TODO: Match player speed when firing?
    //http://www.html5gamedevs.com/topic/5708-fire-bullet-to-predefined-angle/
    //http://phaser.io/tutorials/coding-tips-007
    // if (game.time.now > this.const_TimeToNextShot && this.grp_Bullets.countDead() > 0)
    // {
    //   this.const_TimeToNextShot = game.time.now + this.const_ShootDelay;
    //   var curBullet = this.grp_Bullets.getFirstExists(false);
    //   curBullet.reset(this.spr_Player.x, this.spr_Player.y);
    //   this.grp_Bullets.setAll('velocity.x', this.spr_Player.body.velocity.x);
    //   this.grp_Bullets.setAll('velocity.y', this.spr_Player.body.velocity.y);
    //   //curBullet.rotation = game.physics.arcade.moveToPointer(curBullet, 1000, game.input.activePointer, 500);
    //   game.physics.arcade.velocityFromAngle(this.spr_Player.angle, 300, this.spr_Player.body.velocity);
    // }

    this.CUR_WEAPON.fire(this.spr_Player);
  }
};