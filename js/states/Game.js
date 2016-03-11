var Game = function(){};

Game.prototype = {
  init: function()
  {
    this.const_Acceleration = 600;
    this.const_ShootDelay = 400;
    this.const_TimeToNextShot = 0;
    this.CUR_WEAPON = null;// = new Weapon.Pistol(this.game);
    this.CURSORS = null;
    this.WASD = null;
    this.DEBUG = null;
    this.arr_Weapons = [];
    this.wpnIndex = 0;
    this.MOUSE_DOWN = false;
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
    game.load.image('zombie', 'img/zombieNormal.png');
    game.load.image('spawner', 'img/spawner.png');
    game.load.image('img_BulletPistol', 'img/bulletPistol.png');
    game.load.image('img_BulletRocket', 'img/bulletRocket.png');
    game.load.image('img_BulletGrenade', 'img/bulletGrenade.png');
    game.load.image('img_BulletLandmine', 'img/bulletLandmine.png');
    game.load.image('img_BulletFireball', 'img/bulletFireball.png');
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
    this.spr_Player.barrelLength = (this.spr_Player.width/2) + 3;

    // this.grp_Bullets = game.add.group();
    // this.grp_Bullets.enableBody = true;
    // this.grp_Bullets.physicsBodyType = Phaser.Physics.ARCADE;
    // this.grp_Bullets.createMultiple(30, 'bullet', 0, false);
    // this.grp_Bullets.setAll('anchor.x', 0.5);
    // this.grp_Bullets.setAll('anchor.y', 0.5);
    // this.grp_Bullets.setAll('outOfBoundsKill', true);
    // this.grp_Bullets.setAll('checkWorldBounds', true);

    this.txt_CurrentWeapon = game.add.text(10, 10, "Current weapon: ", {
        font: "10px Arial"
    });
    //this.txt_CurrentWeapon.anchor.setTo(0.5, 0.5);
    this.txt_CurrentWeapon.fixedToCamera = true;

    game.camera.follow(this.spr_Player);
    game.camera.deadzone = new Phaser.Rectangle(150, 150, 500, 300); //change?
    game.camera.focusOnXY(0, 0);

    this.spr_Cursor = game.add.sprite(0, 0, 'cursor');
    this.spr_Cursor.anchor.setTo(0.5, 0.5);

    //prevent keys from propagating up to the browser
    game.input.keyboard.addKeyCapture([
      Phaser.Keyboard.SPACEBAR, 
      Phaser.Keyboard.TILDE, 
      Phaser.Keyboard.BACKWARD_SLASH, 
      Phaser.Keyboard.OPEN_BRACKET, 
      Phaser.Keyboard.CLOSED_BRACKET
    ]);
    this.CURSORS = game.input.keyboard.createCursorKeys();
    this.WASD = {
      up: game.input.keyboard.addKey(Phaser.Keyboard.W), 
      down: game.input.keyboard.addKey(Phaser.Keyboard.S), 
      left: game.input.keyboard.addKey(Phaser.Keyboard.A), 
      right: game.input.keyboard.addKey(Phaser.Keyboard.D)
    }

    this.arr_Weapons = [
      new WeaponPistol(this.game, this.spr_Player), 
      new WeaponRevolver(this.game, this.spr_Player), 
      new WeaponSMG(this.game, this.spr_Player), 
      new WeaponShotgun(this.game, this.spr_Player), 
      new WeaponAR(this.game, this.spr_Player), 
      new WeaponHMG(this.game, this.spr_Player), 
      new WeaponRPG(this.game, this.spr_Player), 
      new WeaponFlamethrower(this.game, this.spr_Player), 
      new WeaponGL(this.game, this.spr_Player), 
      new WeaponSniper(this.game, this.spr_Player), 
      new WeaponLandmine(this.game, this.spr_Player), 
      new WeaponGrenade(this.game, this.spr_Player), 
      new WeaponLaser(this.game, this.spr_Player)
    ];
    this.CUR_WEAPON = new WeaponPistol(this.game, this.spr_Player);

    this.DEBUG = {
      enabled: false, 
      debugKey: game.input.keyboard.addKey(Phaser.Keyboard.BACKWARD_SLASH), 
      prevWpnKey: game.input.keyboard.addKey(Phaser.Keyboard.OPEN_BRACKET), 
      prevWpnKeyDown: false, 
      nextWpnKey: game.input.keyboard.addKey(Phaser.Keyboard.CLOSED_BRACKET), 
      nextWpnKeyDown: false
    }
  }, 

  update: function()
  {
    //MOVEMENT
    this.spr_Player.rotation = game.physics.arcade.angleToPointer(this.spr_Player);
    this.spr_Player.body.acceleration.x = 0;
    this.spr_Player.body.acceleration.y = 0;

    if(this.CURSORS.left.isDown || this.WASD.left.isDown)
    {
      this.spr_Player.body.acceleration.x = -this.const_Acceleration;
    }else if(this.CURSORS.right.isDown || this.WASD.right.isDown)
    {
      this.spr_Player.body.acceleration.x = this.const_Acceleration;
    }

    if(this.CURSORS.up.isDown || this.WASD.up.isDown)
    {
      this.spr_Player.body.acceleration.y = -this.const_Acceleration;
    }else if(this.CURSORS.down.isDown || this.WASD.down.isDown)
    {
      this.spr_Player.body.acceleration.y = this.const_Acceleration;
    }

    this.spr_Cursor.x = game.input.mousePointer.worldX;
    this.spr_Cursor.y = game.input.mousePointer.worldY;

    //FIRE
    if(game.input.activePointer.isDown)
    {
      this.MOUSE_DOWN = true;
    }

    if(game.input.activePointer.isUp)
    {
      this.MOUSE_DOWN = false;
    }

    if(this.MOUSE_DOWN)
    {
      if(this.CUR_WEAPON && !this.CUR_WEAPON.shootTimer.running)//isShooting)
      {
        this.CUR_WEAPON.startShooting();
      }
    }/*else{
      if(this.CUR_WEAPON && this.CUR_WEAPON.isShooting)
      {
        this.CUR_WEAPON.stopShooting();
      }
    }*/

    //COLLISION

    //TOGGLE DEBUG
    if(this.DEBUG.debugKey.isDown && !this.DEBUG.enabled)
    {
      this.DEBUG.enabled = true;
      console.log("Debug mode ON");
    }

    //SWITCH WEAPONS - DEBUG ONLY
    if(this.DEBUG.enabled)
    {
      if(this.DEBUG.nextWpnKey.isDown && !this.DEBUG.nextWpnKeyDown)
      {
        if(this.wpnIndex < this.arr_Weapons.length-1)
        {
          this.wpnIndex++;
        }else{
          this.wpnIndex = 0;
        }
        
        this.CUR_WEAPON = this.arr_Weapons[this.wpnIndex];
        this.DEBUG.nextWpnKeyDown = true;
        console.log("switched weapon to "+this.CUR_WEAPON.name+" weapon");
      }

      if(this.DEBUG.nextWpnKey.isUp && this.DEBUG.nextWpnKeyDown)
      {
        this.DEBUG.nextWpnKeyDown = false;
      }

      if(this.DEBUG.prevWpnKey.isDown && !this.DEBUG.prevWpnKeyDown)
      {
        if(this.wpnIndex > 0)
        {
          this.wpnIndex--;
        }else{
          this.wpnIndex = this.arr_Weapons.length-1;
        }
        
        this.CUR_WEAPON = this.arr_Weapons[this.wpnIndex];
        this.DEBUG.prevWpnKeyDown = true;
        console.log("switched weapon to "+this.CUR_WEAPON.name+" weapon");
      }

      if(this.DEBUG.prevWpnKey.isUp && this.DEBUG.prevWpnKeyDown)
      {
        this.DEBUG.prevWpnKeyDown = false;
      }
    }

    this.txt_CurrentWeapon.setText("Current weapon: "+this.CUR_WEAPON.name);
  }
};