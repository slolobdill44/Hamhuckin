# Ham Huckin'

[Live App][live]

[live]: https://slolobdill44.github.io/hamhuckin/

Ham Huckin' is a simple Javascript projectile game built using [Matter.js][matter].

[matter]: http://brm.io/matter-js/

![gameplay]
[gameplay]: ./assets/sample.png

### Technologies

This game utilizes vanilla JS for game logic and Matter.js for rendering and physics logic.

## Playing

The game is played by holding down the space bar, which will pull the whacker back using a hidden spring system:

```
var whacker = Bodies.rectangle(200, 380, 190, 40);


// anchors left side of whacker to the screen

var whackerAnchor = { x: 125, y: 385 };
var whackerPivot = Constraint.create({
  pointA: whackerAnchor,
  bodyB: whacker,
  pointB: { x: -75, y: 5 },
  stiffness: 1
});


// when the spacebar is held down, the whackerPullbackAnchor is moved down and to the left, causing tension

var whackerPullbackAnchor = { x: 220, y: 410 };
var whackerPullback = Constraint.create({
  pointA: whackerPullbackAnchor,
  bodyB: whacker,
  pointB: { x: 70, y: 5 },
  stiffness: .2,
  render: {
    lineWidth: 0.01,
    strokeStyle: '#dfa417'
  }
});

document.onkeydown = function (keys) {
  if (keys.keyCode === 32 && whackerPullbackAnchor.x > 120) {
    whackerPullbackAnchor.x -= 8;
    whackerPullbackAnchor.y += 8;
  }
};


// Once the whackerPullbackAnchor is released, the tension in the whackerSpring launches the projectile

document.onkeyup = function (keys) {
  if (keys.keyCode === 32) {
    World.remove(engine.world, whackerPullback);
    whackerPullbackAnchor.x = pullbackPosition[0];
    whackerPullbackAnchor.y = pullbackPosition[1];
  }
};

var whackerSpringAnchor = { x: 325, y: 375 };
var whackerSpring = Constraint.create({
  pointA: whackerSpringAnchor,
  bodyB: whacker,
  pointB: { x: 75, y: 5 },
  stiffness: .2,
  render: {
    lineWidth: 0.01,
    strokeStyle: '#dfa417'
  }

});
```

 Upon releasing the space bar, the hidden spring is removed, causing the whacker to throw or hit the current target object. Points are given out for every object that remains on the platform after 5 objects have been spawned.

## Planned Features

 * Randomly generated levels. This will be a challenge since the user should theoretically be able to complete every level.

 * A high score leaderboard. The user will receive a score for their streak of successful tosses and be able to display their score on the leaderboard.
