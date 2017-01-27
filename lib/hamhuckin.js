function startScreen() {
  var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Vertices = Matter.Vertices,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Events = Matter.Events;

  var engine = Engine.create();

  var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: 1050,
      background: '#8edce6',
      wireframeBackground: '#888',
    }
  });

  var mouseConstraint = Matter.MouseConstraint.create(engine, {
            constraint: {
              stiffness: .7
            }
        });

  World.add(engine.world, mouseConstraint);

  var startButton =  Bodies.rectangle(650, 500, 200, 50, {
                        chamfer: { radius: [25, 25, 25, 25] },
                        isStatic: true
                    });

  World.add(engine.world, startButton);

  Events.on(mouseConstraint, 'mouseup', function() {
    gameStart();
  });

  Engine.run(engine);
  Render.run(render);

}


function gameStart() {
  var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Vertices = Matter.Vertices,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Events = Matter.Events;

  var engine = Engine.create();

  var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: 1050,
      background: '#8edce6',
      wireframeBackground: '#888',
    }
  });

  var mouseConstraint = Matter.MouseConstraint.create(engine, {
            body: hammo,
            constraint: {
              stiffness: .7
            }
        });

  World.add(engine.world, mouseConstraint);


  var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

  // var basketVertices = Vertices.fromPath('35 7 19 17 14 38 14 58 25 79 45 85 65 84 65 66 46 67 34 59 30 44 33 29 45 23 66 23 66 7 53 7');
  //
  // var basket = Bodies.fromVertices(520, 230, basketVertices, { isStatic: true });

  var landingPad =  Bodies.rectangle(650, 500, 200, 50, {
                        chamfer: { radius: [25, 25, 25, 25] },
                        isStatic: true
                    });

  var whacker = Bodies.rectangle(200, 380, 190, 40);

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

    // turn on for constraint debugging
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

    // turn on for constraint debugging
    render: {
      lineWidth: 0.01,
      strokeStyle: '#dfa417'
    }
  });

  var hammo = Bodies.rectangle(220, 275, 30, 90, { angle: 40 });

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

  //releases hammo after reaching a specified point
  Events.on(engine, 'afterUpdate', function() {
    var hammoX = hammo.position.x;
    var hammoY = hammo.position.y;

    if (hammoX > 390 || hammoX < 200 || hammoY > 700 || hammoY < 200) {
        hammo = Bodies.rectangle(220, 270, 30, 90, { angle: 40 });
        World.add(engine.world, hammo);
        // elastic.bodyB = hammo;
    }

    if (Composite.allConstraints(engine.world).length === 3 && whacker.position.y < 400) {
      World.add(engine.world, whackerPullback);
    }
  });

  World.add(engine.world, [
    ground,
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


  const pullbackPosition = [whackerPullbackAnchor.x, whackerPullbackAnchor.y];
  document.onkeydown = function (keys) {
    if (keys.keyCode === 32) {
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
}
