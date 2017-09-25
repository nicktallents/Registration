To run the application:
1) make sure you have Node.js installed on your machine.
2) In the terminal, navigate to the folder where the project is saved.
3) Execute the command: node server.js
4) navigate to http://localhost:8081

Some other notes:
I chose to use Angular1 with Bootstrap because it is the framework I am most comfortable with and I figured 
that it would be the best way to churn out a working front-end. I wanted to use Node because I knew it would
be lightweight, easy to set up, and partly just because wanted to try it out. It worked out well because all
together, the I had to spend roughly the same amount of time on the front-end as the back-end. Normally I would
have bundled and minified the Angular scripts, but for the purpose of quick changes without having to recompile,
I thought it best to hold off on that.

I didn't choose to build out a database since it was faster to just build out a json file that you could easily
pull an array out of and parse with lodash. Where the application really suffers is in the session management
(or lack thereof)...with more time I would have implemented a session cookie system through Node. Passwords are
also being sent as plain text from the front-end to the back, so I would have also ideally would have made it
run through https. The last thing that was noticably missing was the "forget password" functionality. I decided
that it wasn't worth setting up an SMTP server or exposing credentials for any of my current email accounts to
leverage Google's SMTP servers for that extra little bit of functionality.
