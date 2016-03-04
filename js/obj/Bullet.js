var Bullet = function(game, key)
{
    console.log("Bullet.prototype");
    Phaser.Sprite.call(this, game, 0, 0, key);

    this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

    this.anchor.set(0.5);

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.exists = false;

    this.tracking = false;
    this.scaleSpeed = 0;
};

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.fire = function(x, y, angle, speed, gx, gy)
{
    gx = gx || 0;
    gy = gy || 0;

    this.reset(x, y);
    this.scale.set(1);

    this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);

    this.angle = angle;
};

Bullet.prototype.update = function()
{
    console.log("Bullet.prototype.update");
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
//    PISTOL
////////////////////////////////////////////////////////////

var BulletPistol = function(game)
{
    console.log("Bullet.Pistol.prototype");
    /*
    Phaser.Sprite.call(this, game, 0, 0, 'img_BulletPistol');

    this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

    this.anchor.set(0.5);

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.exists = false;

    this.tracking = false;
    this.scaleSpeed = 0;
    */

    Bullet.call(this, game, 'img_BulletPistol');
};

BulletPistol.prototype = Object.create(Bullet.prototype);
BulletPistol.prototype.constructor = BulletPistol;

BulletPistol.prototype.fire = function(x, y, angle, speed, gx, gy)
{
    //Bullet.prototype.fire(x, y, angle, speed, gx, gy);
    // gx = gx || 0;
    // gy = gy || 0;

    // this.reset(x, y);
    // this.scale.set(1);

    // this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);

    // this.angle = angle;
};

BulletPistol.prototype.update = function()
{
    console.log("Bullet.Pistol.prototype.update");
    //Bullet.prototype.update();
    // if (this.tracking)
    // {
    //     this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
    // }

    // if (this.scaleSpeed > 0)
    // {
    //     this.scale.x += this.scaleSpeed;
    //     this.scale.y += this.scaleSpeed;
    // }
};