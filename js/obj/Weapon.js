var Weapon = function (game, key) {

    console.log('Weapon constructor');
    Phaser.Group.call(this, game, game.world, key, false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 600;
    this.fireRate = 100;

    this.addBullets();

    return this;
};

Weapon.prototype = Object.create(Phaser.Group.prototype);
Weapon.prototype.constructor = Weapon;

Weapon.prototype.addBullets = function()
{
    console.log("Weapon.prototype.addBullets()");
    for (var i = 0; i < 64; i++)
    {
        this.add(new Bullet(game, 'img_BulletPistol'), true);
    }
};

Weapon.prototype.fire = function (source) {

    if (this.game.time.time < this.nextFire) { return; }

    //var x = source.x + 10;
    //var y = source.y + 10;

    var p = new Phaser.Point(source.x, source.y);
    p.rotate(p.x, p.y, source.rotation, false, source.barrelLength);

    this.getFirstExists(false).fire(p.x, p.y, source.angle, this.bulletSpeed, 0, 0);

    this.nextFire = this.game.time.time + this.fireRate;
};

////////////////////////////////////////////////////////////
//    PISTOL
////////////////////////////////////////////////////////////

var WeaponPistol = function(game)
{
    Weapon.call(this, game, game.world, 'Pistol', false, true, Phaser.Physics.ARCADE);
};

WeaponPistol.prototype = Object.create(Weapon.prototype);
WeaponPistol.prototype.constructor = WeaponPistol;
/*
WeaponPistol.prototype.addBullets = function()
{
    //
};

WeaponPistol.prototype.fire = function(source)
{
    //
};
*/

////////////////////////////////////////////////////////////
//    REVOLVER
////////////////////////////////////////////////////////////

var WeaponRevolver = function(game)
{
    Weapon.call(this, game, game.world, 'Revolver', false, true, Phaser.Physics.ARCADE);
};

WeaponRevolver.prototype = Object.create(Weapon.prototype);
WeaponRevolver.prototype.constructor = WeaponRevolver;
/*
WeaponRevolver.prototype.addBullets = function()
{
    //
};

WeaponRevolver.prototype.fire = function(source)
{
    //
};
*/

////////////////////////////////////////////////////////////
//    SMG
////////////////////////////////////////////////////////////

var WeaponSMG = function(game)
{
    Weapon.call(this, game, game.world, 'SMG', false, true, Phaser.Physics.ARCADE);
};

WeaponSMG.prototype = Object.create(Weapon.prototype);
WeaponSMG.prototype.constructor = WeaponSMG;
/*
WeaponSMG.prototype.addBullets = function()
{
    //
};

WeaponSMG.prototype.fire = function(source)
{
    //
};
*/

////////////////////////////////////////////////////////////
//    SHOTGUN
////////////////////////////////////////////////////////////

var WeaponShotgun = function(game)
{
    Weapon.call(this, game, game.world, 'Shotgun', false, true, Phaser.Physics.ARCADE);
};

WeaponShotgun.prototype = Object.create(Weapon.prototype);
WeaponShotgun.prototype.constructor = WeaponShotgun;
/*
WeaponShotgun.prototype.addBullets = function()
{
    //
};

WeaponShotgun.prototype.fire = function(source)
{
    //
};
*/

////////////////////////////////////////////////////////////
//    ASSAULT RIFLE
////////////////////////////////////////////////////////////

var WeaponAR = function(game)
{
    Weapon.call(this, game, game.world, 'Assault Rifle', false, true, Phaser.Physics.ARCADE);
};

WeaponAR.prototype = Object.create(Weapon.prototype);
WeaponAR.prototype.constructor = WeaponAR;
/*
WeaponAR.prototype.addBullets = function()
{
    //
};

WeaponAR.prototype.fire = function(source)
{
    //
};
*/

////////////////////////////////////////////////////////////
//    HMG
////////////////////////////////////////////////////////////

var WeaponHMG = function(game)
{
    Weapon.call(this, game, game.world, 'Heavy Machine Gun', false, true, Phaser.Physics.ARCADE);
};

WeaponHMG.prototype = Object.create(Weapon.prototype);
WeaponHMG.prototype.constructor = WeaponHMG;
/*
WeaponHMG.prototype.addBullets = function()
{
    //
};

WeaponHMG.prototype.fire = function(source)
{
    //
};
*/

////////////////////////////////////////////////////////////
//    RPG
////////////////////////////////////////////////////////////

var WeaponRPG = function(game)
{
    Weapon.call(this, game, game.world, 'Rocket Launcher', false, true, Phaser.Physics.ARCADE);
};

WeaponRPG.prototype = Object.create(Weapon.prototype);
WeaponRPG.prototype.constructor = WeaponRPG;
/*
WeaponRPG.prototype.addBullets = function()
{
    //
};

WeaponRPG.prototype.fire = function(source)
{
    //
};
*/

////////////////////////////////////////////////////////////
//    FLAMETHROWER
////////////////////////////////////////////////////////////

var WeaponFlamethrower = function(game)
{
    Weapon.call(this, game, game.world, 'Flamethrower', false, true, Phaser.Physics.ARCADE);
};

WeaponFlamethrower.prototype = Object.create(Weapon.prototype);
WeaponFlamethrower.prototype.constructor = WeaponFlamethrower;
/*
WeaponFlamethrower.prototype.addBullets = function()
{
    //
};

WeaponFlamethrower.prototype.fire = function(source)
{
    //
};
*/

////////////////////////////////////////////////////////////
//    GRENADE LAUNCHER
////////////////////////////////////////////////////////////

var WeaponGL = function(game)
{
    Weapon.call(this, game, game.world, 'Grenade Launcher', false, true, Phaser.Physics.ARCADE);
};

WeaponGL.prototype = Object.create(Weapon.prototype);
WeaponGL.prototype.constructor = WeaponGL;
/*
WeaponGL.prototype.addBullets = function()
{
    //
};

WeaponGL.prototype.fire = function(source)
{
    //
};
*/

////////////////////////////////////////////////////////////
//    SNIPER RIFLE
////////////////////////////////////////////////////////////

var WeaponSniper = function(game)
{
    Weapon.call(this, game, game.world, 'Sniper Rifle', false, true, Phaser.Physics.ARCADE);
};

WeaponSniper.prototype = Object.create(Weapon.prototype);
WeaponSniper.prototype.constructor = WeaponSniper;
/*
WeaponSniper.prototype.addBullets = function()
{
    //
};

WeaponSniper.prototype.fire = function(source)
{
    //
};
*/

////////////////////////////////////////////////////////////
//    LANDMINE
////////////////////////////////////////////////////////////

var WeaponLandmine = function(game)
{
    Weapon.call(this, game, game.world, 'Landmine', false, true, Phaser.Physics.ARCADE);
};

WeaponLandmine.prototype = Object.create(Weapon.prototype);
WeaponLandmine.prototype.constructor = WeaponLandmine;
/*
WeaponLandmine.prototype.addBullets = function()
{
    //
};

WeaponLandmine.prototype.fire = function(source)
{
    //
};
*/

////////////////////////////////////////////////////////////
//    GRENADE
////////////////////////////////////////////////////////////

var WeaponGrenade = function(game)
{
    Weapon.call(this, game, game.world, 'Grenade', false, true, Phaser.Physics.ARCADE);
};

WeaponGrenade.prototype = Object.create(Weapon.prototype);
WeaponGrenade.prototype.constructor = WeaponGrenade;
/*
WeaponGrenade.prototype.addBullets = function()
{
    //
};

WeaponGrenade.prototype.fire = function(source)
{
    //
};
*/

////////////////////////////////////////////////////////////
//    LASER RIFLE
////////////////////////////////////////////////////////////

var WeaponLaser = function(game)
{
    Weapon.call(this, game, game.world, 'Laser', false, true, Phaser.Physics.ARCADE);
};

WeaponLaser.prototype = Object.create(Weapon.prototype);
WeaponLaser.prototype.constructor = WeaponLaser;
/*
WeaponLaser.prototype.addBullets = function()
{
    //
};

WeaponLaser.prototype.fire = function(source)
{
    //
};
*/

