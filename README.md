# Serious-Snake
Classical Snake with a twist, Serious Snake doesn't up the difficulty merely by increasing the speed of the game. Instead, after a set amount of food has been eaten by the snake, it adds an input delay. *How does that work*, you ask? Well, each input you press executes only a set amount of frames later in the game. Its like you will your arm to extend, but it only performs the movement a split second later. It feels weird, and unnatural. That's the point.

Now, playing Snake just with a couple delayed inputs here and there wouldn't be *that* fun. But the addition of an input buffer means that you can queue upto five inputs! What that means is that, if your fingers are quick enough, you can program your snake to perform complex movements way before they actually need to happen. Exciting, right? But what if you program the wrong moves in advance? What if you see, too late, that the snake will accidentally bite itself if the sequence of inputs is performed? ~~Just make a deal with the Devil~~ Pressing the Spacebar can bail you right out! But like all the good things in life, it comes with a price. While it instantly clears the input buffer, it also instantly increases your frame delay by one.

# Technologies
This project was created with the help of:
- Python 3.8.7
    - Flask 2.0.2
- JavaScript (ES2020)
    - P5.js 1.4.0

# Setup
You'll need the a working Python installation as well as Flask to run this project.
Flask can easily be obtained using the command
```
pip install flask
```
After cloning this repo to your local drive, navigate to the newly created folder and
```
python snake.py
```
This will run Flask's development server. To access the game, open the browser of your choice and in the URL field enter
```
http://localhost:5000/
```

# Usage
The controls are simple.
Use the arrow keys to move the snake.
Use the Space Bar to bail out.

# Todo List
While bugs and enhancements will be fully available on the Issues tab, the list of intended features (and the current progress) is provided below:

- Initial P5 sketch (FIN)
- Base game logic (FIN)
- Serve the game using Flask (FIN)
- A scoring system <=====
- HUD
- Menus (Main/Controls/High Scores)
- High Score Database (preferably MongoDB)
- [any new features]
- Balancing
- Production Server (preferably Gunicorn, but mod-wsgi works as well)
- Hosting (Repl/Heroku)
- Done, onto the next project
# Additional Notes
Once all intended functionality has been added, I will either be hosting the game live on either my Repl or a Heroku instance. The link will, ofcourse, be added to this page.

Feel free to suggest any features or offer improvements to the current ones.
