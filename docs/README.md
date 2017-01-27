# Ham Huckin'

Ham Huckin' is a simple Javascript projectile game. The basic premise is that the user is a chef, and must toss various porcine foods onto a hungry customer's plate. By giving the frying pan an angle and a power level, the food item must be launched and/or bounced through a couple obstacles and then land on the customer's plate.

## MVP Features

The major features of this game are:

1. Projectile system with adjustable velocity and gravity
2. Object collision detection with irregular shaped objects
3. Various levels with different challenges

Other features of this game are:

  * A splash screen with a links to an instructional popup, as well as my Github profile.
  * A production Readme.

## Technologies

This game will mainly utilize:

  * Vanilla JS for game logic
  * Processing.js for rendering
  * Webpack for bundling and serving scripts

## Wireframe

The game will consist of a single-page app with a large gameplay area, and an instructional column on the left. If the instructional column gets too busy, I will either paginate it, or incorporate it into a modal accessed through an `instructions` button in-game. The nav bar will consist of a quick game tagline/explanation, and a link to my Github.

![wireframe]
[wireframe]: ./hamhuckinwireframe.png

## Timeline

**Day 1**

This day will be dedicated to foundational functionality while I experiment with the technologies.

 - Using `node.js`, render the basic wireframe outline on a webpage.
 - Learn enough `processing.js` to get objects to appear on the screen. Set up all modules and get them to work in harmony using `webpack`.

**Day 2**

This day will be dedicated to basic gameplay functionality.

 - Using `processing.js` and regular JS, set up basic collision detection between circular objects.
 - Build an object 'shooter' and have it be aimable.
 - Build gravity so that projectiles fire in an arc and leave the screen.
 - Create a moving target for the player to hit.

**Day 3**

  This day will be dedicated to finalizing gameplay.

  - Implement collision detection with irregular-shaped `processing.js` objects that cause a bounce
  - When projectiles hit a target, points are given and displayed correctly.

**Day 4**

  This day will be dedicated to game controls, styling and non-game related design (making it pretty).

  - Create a game title screen that explains controls
  - Implement simple keyboard controls to fire projectiles.
  - Finalize object shapes and build out a few levels.
  - Style game as a whole and add links and logo to website.
  - Get hosted.

## Bonus Features

 * Randomly generated levels. This will be a challenge since the user should theoretically be able to complete every level.

 * A high score leaderboard. The user will receive a score for their streak of successful tosses and be able to display their score on the leaderboard.
