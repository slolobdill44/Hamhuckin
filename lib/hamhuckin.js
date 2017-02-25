function gameStart() {
  var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Bounds = Matter.Bounds,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Vertices = Matter.Vertices,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Events = Matter.Events,
    Common = Matter.Common;

  var engine = Engine.create();
  var world = engine.world;

  var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: 1050,
      wireframeBackground: '#087F8C',
      wireFrames: false
    }
  });

  var runner = Runner.create();
    Runner.run(runner, engine);

  var mouseConstraint = Matter.MouseConstraint.create(engine, {
            body: hammo,
            constraint: {
              stiffness: .7
            }
        });

  var startButton = document.getElementById('title-screen');

  startButton.addEventListener('click', function () {
    this.style.display = "none";
  });

  World.add(engine.world, mouseConstraint);


  var ground = Bodies.rectangle(400, 610, 810, 60, {
                              isStatic: true,
                            });

  // var basketVertices = Vertices.fromPath('35 7 19 17 14 38 14 58 25 79 45 85 65 84 65 66 46 67 34 59 30 44 33 29 45 23 66 23 66 7 53 7');
  //
  // var basket = Bodies.fromVertices(520, 230, basketVertices, { isStatic: true });

  var landingPad =  Bodies.rectangle(750, 500, 315, 50, {
                        render: {
                          strokeStyle: "#EE964B",
                          fillStyle: "#EE964B"
                        },
                        chamfer: { radius: [25, 25, 25, 25] },
                        isStatic: true,
                    });

  var whacker = Bodies.rectangle(200, 380, 190, 40, {render: { fillStyle: '#1EE964B'}});

  whacker.render.sprite = "../assets/ham.png";

  var whackerAnchor = { x: 125, y: 385 };
  var whackerPivot = Constraint.create({
    pointA: whackerAnchor,
    bodyB: whacker,
    pointB: { x: -75, y: 5 },
    stiffness: 1
  });
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

  // var horseShoe = Vertices.fromPath('100 0 75 50 100 100 25 100 0 50 25 0');
  //
  // var hammo = Bodies.fromVertices(220, 275, horseShoe);

  var hammo = Bodies.rectangle(220, 275, 30, 90, {
                              angle: 40,
                              render: {
                                strokeStyle: '#EE964B',
                                fillStyle: '#EE964B',
                                // sprite: {
                                //   texture: "../assets/ham.png"
                                // }
                              }
                             });

  //attaches hammo to an anchor
  // var anchor = { x: 270, y: 275 };
  // var elastic = Constraint.create({
  //         pointA: anchor,
  //         bodyB: hammo,
  //         pointB: { x: 15, y: 15 },
  //         stiffness: 0.05,
  //         render: {
  //             lineWidth: 5,
  //             strokeStyle: '#dfa417'
  //         }
  //     });


  World.add(world, [
    whacker,
    whackerPivot,
    whackerSpringAnchor,
    whackerSpring,
    whackerPullback,
    whackerPullbackAnchor,
    hammo,
    landingPad
  ]);

  Engine.run(engine);
  Render.run(render);

  Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 1050, y: 600 }
  });


  //pulls back whacker on space bar press
  const pullbackPosition = [whackerPullbackAnchor.x, whackerPullbackAnchor.y];
  document.onkeydown = function (keys) {
    if (keys.keyCode === 32 && whackerPullbackAnchor.x > 120) {
      whackerPullbackAnchor.x -= 8;
      whackerPullbackAnchor.y += 8;
    }
  };
  document.onkeyup = function (keys) {
    if (keys.keyCode === 32) {
      World.remove(engine.world, whackerPullback);
      whackerPullbackAnchor.x = pullbackPosition[0];
      whackerPullbackAnchor.y = pullbackPosition[1];
    }
  };

  var shotCount = 5;
  var shotCountText = document.getElementsByClassName('shots-number');

  var scoreText = document.getElementsByClassName('score-number');
  var finalScore = document.getElementsByClassName('final-score-number');

  var gameOverScreen = document.getElementById('ending-screen');

  gameOverScreen.addEventListener('click', function () {
    this.style.display = "none";
    shotCount = 6;
    scoreText[0].innerText = 0;
    finalScore[0].innerText = 0;
    World.clear(engine.world, false);


    World.add(world, [
      whacker,
      whackerPivot,
      whackerSpringAnchor,
      whackerSpring,
      whackerPullback,
      whackerPullbackAnchor,
      hammo,
      landingPad
    ]);

    World.remove(world, hammo);
  });

  var scoreBounds = Matter.Bounds.create([{ x: 500, y: 0}, { x: 1070, y: 470 }]);

  //releases hammo after reaching a specified point
  Events.on(engine, "afterUpdate", function() {
    var hammoX = hammo.position.x;
    var hammoY = hammo.position.y;

    if ((hammoX > 400 || hammoY > 700) && shotCount > 1) {
        hammo = Bodies.rectangle(220, 20, 30, 90, { angle: 40 });
        World.add(world, hammo);

        shotCount -= 1;
        shotCountText[0].innerText = shotCount;
    } else if ((hammoX > 400 || hammoY > 700) && shotCount === 1) {

      shotCount -= 1;
      shotCountText[0].innerText = shotCount;
    }

    if (Composite.allConstraints(engine.world).length === 3 && whacker.position.y < 400) {
      World.add(world, whackerPullback);
    }

    var objects = Composite.allBodies(engine.world);

    var scoreQuery = Matter.Query.region(objects, scoreBounds, false);

    scoreText[0].innerText = scoreQuery.length;
    finalScore[0].innerText = scoreQuery.length;

    if (shotCount === 0 && (hammoX > 250 && ((hammo.speed < 0.29) || hammoY > 640))) {
      gameOverScreen.style.display = 'inherit';
    }
  });
}
