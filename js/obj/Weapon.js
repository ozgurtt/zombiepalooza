var Weapon = function (game, key) {

    console.log('Weapon constructor');
    Phaser.Group.call(this, game, game.world, key, false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 600;
    this.fireRate = 100;

    // for (var i = 0; i < 2; i++)
    // {
    //     this.add(new Bullet(game, 'bullet5'), true);
    // }
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
        this.add(new Bullet(game, 'bullet5'), true);
    }
};

Weapon.prototype.fire = function (x, y, angle, speed, gx, gy) {

    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x + 10;
    var y = source.y + 10;

    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);

    this.nextFire = this.game.time.time + this.fireRate;
};

////////////////////////////////////////////////////////////
//    PISTOL
////////////////////////////////////////////////////////////

Weapon.Pistol = function(game)
{
    console.log('Weapon.Pistol constructor');
    Phaser.Group.call(this, game, game.world, 'Pistol', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 600;
    this.fireRate = 400;

    this.addBullets();

    return this;
};

Weapon.Pistol.prototype = Object.create(Weapon.prototype);
Weapon.Pistol.prototype.constructor = Weapon.Pistol;

Weapon.Pistol.prototype.addBullets = function()
{
    console.log("Weapon.Pistol.prototype.addBullets()");
    for (var i = 0; i < 64; i++)
    {
        //this.add(new Bullet(game, 'img_BulletPistol'), true);
        this.add(new BulletPistol(game), true);
    }
};

Weapon.Pistol.prototype.fire = function(source)
{
    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x + 10;
    var y = source.y + 10;

    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);

    this.nextFire = this.game.time.time + this.fireRate;


    /*
    You can call parent method like this:

    Phaser.Group.prototype.update.call(this);
    or

    Phaser.Group.prototype.update.apply(this);
    You can also pass arguments as a second parameter. call() need them to be listed one by one and apply() allows them to be in a single array.
    */
};