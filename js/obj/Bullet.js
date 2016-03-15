var Bullet = function(game, key)
{
    Phaser.Sprite.call(this, game, 0, 0, key);

    this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

    this.anchor.set(0.5);

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.exists = false;

    this.tracking = false;
    this.scaleSpeed = 0;

    this.bulletSpeed = 600;
    this.damage = 1;
};

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.fire = function(x, y, angle, speed, gx, gy)
{
    //console.log("Bullet.prototype.fire() - x: "+x+", y: "+y+", angle: "+angle+", speed: "+speed+", gx: "+gx+", gy: "+gy);
    gx = gx || 0;
    gy = gy || 0;

    this.reset(x, y);
    this.scale.set(1);

    this.game.physics.arcade.velocityFromAngle(angle, this.bulletSpeed, this.body.velocity);

    this.angle = angle;
};

Bullet.prototype.update = function()
{
    //console.log("Bullet.prototype.update");
    if (this.tracking)
    {
        this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
    }

    if (this.scaleSpeed > 0)
    {
        this.scale.x += this.scaleSpeed;
        this.scale.y += this.scaleSpeed;
    }
};

////////////////////////////////////////////////////////////
//    PISTOL/SHOTGUN/SMG
////////////////////////////////////////////////////////////

var BulletPistol = function(game)
{
    Bullet.call(this, game, 'img_BulletPistol');
};

BulletPistol.prototype = Object.create(Bullet.prototype);
BulletPistol.prototype.constructor = BulletPistol;

// BulletPistol.prototype.fire = function(x, y, angle, speed, gx, gy)
// {
//     Bullet.prototype.fire.call(this, x, y, angle, speed, gx, gy);
// };

// BulletPistol.prototype.update = function()
// {
//     Bullet.prototype.update.call(this);
// };

////////////////////////////////////////////////////////////
//    REVOLVER
////////////////////////////////////////////////////////////

var BulletRevolver = function(game)
{
    Bullet.call(this, game, 'img_BulletPistol');

    this.damage = 2;
    this.bulletSpeed = 200;
};

BulletRevolver.prototype = Object.create(Bullet.prototype);
BulletRevolver.prototype.constructor = BulletRevolver;

// BulletRevolver.prototype.fire = function(x, y, angle, speed, gx, gy)
// {
//     Bullet.prototype.fire.call(this, x, y, angle, speed, gx, gy);
// };

// BulletRevolver.prototype.update = function()
// {
//     Bullet.prototype.update.call(this);
// };

////////////////////////////////////////////////////////////
//    ROCKET
////////////////////////////////////////////////////////////

var BulletRocket = function(game)
{
    Bullet.call(this, game, 'img_BulletRocket');

    this.damage = 15;
};

BulletRocket.prototype = Object.create(Bullet.prototype);
BulletRocket.prototype.constructor = BulletRocket;

BulletRocket.prototype.fire = function(x, y, angle, speed, gx, gy)
{
    Bullet.prototype.fire.call(this, x, y, angle, speed, gx, gy);
};

BulletRocket.prototype.update = function()
{
    Bullet.prototype.update.call(this);
};

////////////////////////////////////////////////////////////
//    GRENADE
////////////////////////////////////////////////////////////

var BulletGrenade = function(game)
{
    Bullet.call(this, game, 'img_BulletGrenade');

    this.damage = 15;
};

BulletGrenade.prototype = Object.create(Bullet.prototype);
BulletGrenade.prototype.constructor = BulletGrenade;

BulletGrenade.prototype.fire = function(x, y, angle, speed, gx, gy)
{
    Bullet.prototype.fire.call(this, x, y, angle, speed, gx, gy);
};

BulletGrenade.prototype.update = function()
{
    Bullet.prototype.update.call(this);
};

////////////////////////////////////////////////////////////
//    LANDMINE
////////////////////////////////////////////////////////////

var BulletLandmine = function(game)
{
    Bullet.call(this, game, 'img_BulletLandmine');
    console.log("BulletLandmine()");
    this.damage = 8;
    this.bulletSpeed = 0;
};

BulletLandmine.prototype = Object.create(Bullet.prototype);
BulletLandmine.prototype.constructor = BulletLandmine;

BulletLandmine.prototype.fire = function(x, y, angle, speed, gx, gy)
{
    console.log("BulletLandmine fire()");
    //Bullet.prototype.fire.call(this, x, y, angle, speed, gx, gy);
    //don't move

    this.reset(x, y);
    this.scale.set(1);

    //this.angle = angle;
};

BulletLandmine.prototype.update = function()
{
    //console.log("BulletLandmine update()");
    Bullet.prototype.update.call(this);
    //don't move
};

////////////////////////////////////////////////////////////
//    FIREBALL
////////////////////////////////////////////////////////////

var BulletFireball = function(game)
{
    Bullet.call(this, game, 'img_BulletFireball');
};

BulletFireball.prototype = Object.create(Bullet.prototype);
BulletFireball.prototype.constructor = BulletFireball;

BulletFireball.prototype.fire = function(x, y, angle, speed, gx, gy)
{
    Bullet.prototype.fire.call(this, x, y, angle, speed, gx, gy);
};

BulletFireball.prototype.update = function()
{
    Bullet.prototype.update.call(this);
};