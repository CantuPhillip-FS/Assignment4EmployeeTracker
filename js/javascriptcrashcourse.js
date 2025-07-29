"use strict";

/*
class Player {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }
}

let player1 = new Player(0, 0);

console.log("player1 x:", player1.x);
console.log("player1 y:", player1.y);
player1.move(3, 4);
console.log("player1 has moved!");
console.log("player1 x:", player1.x);
console.log("player1 y:", player1.y);
console.log("");
let player2 = new Player(0, 0);

console.log("player2 x:", player2.x);
console.log("player2 y:", player2.y);
player2.move(2, 1);
console.log("player2 has moved!");
console.log("player2 x:", player2.x);
console.log("player2 y:", player2.y);
console.log("");

*/

class Actor {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  distanceTo(otherActor) {
    let dx = otherActor.x - this.x;
    let dy = otherActor.y - this.y;
    return Math.hypot(dx, dy);
  }
}

class Player extends Actor {
  constructor(startX, startY) {
    super(startX, startY);
    this.hp = 100;
  }
}

class Enemy extends Actor {
  attack(player) {
    if (this.distanceTo(player) < 4) {
      player.hp -= 10;
      return true;
    } else {
      return false;
    }
  }
}
console.log();
let player = new Player(1, 2);
let enemy = new Enemy(3, 4);
console.log("Player HP: ", player.hp);
console.log("Enemy distance to player: ", enemy.distanceTo(player));
console.log("Enemey attacks player: ", enemy.attack(player));
console.log("Player HP: ", player.hp);
player.move(5, 5);
console.log("Player moves!");
console.log("Enemy distance to player: ", enemy.distanceTo(player));
console.log("Enemey attacks player: ", enemy.attack(player));
console.log("Player HP: ", player.hp);
console.log(player instanceof Player); // true
console.log(player instanceof Actor); // true
console.log(player instanceof Enemy); // false

class Follower extends Actor {
  constructor(startX, startY, player) {
    super(startX, startY);
    this.player = player;
  }

  follow(player) {
    this.x = player.x;
    this.y = player.y;
  }
}

let player1 = new Player(5, 5);
let follower1 = new Follower(7, 7);
console.log("player1 x,y:", player1.x, player1.y);
console.log("follower1 x,y:", follower1.x, follower1.y);
follower1.follow(player1);
console.log("follower1 has followed player1!");
console.log("player1 x,y:", player1.x, player1.y);
console.log("follower1 x,y:", follower1.x, follower1.y);
player1.move(2, 3);
console.log("player1 moved.");
console.log("player1 x,y:", player1.x, player1.y);
follower1.follow(player1);
console.log("follower1 followed player1.");
console.log("follower1 x,y:", follower1.x, follower1.y);
