# drag-and-drop-chess-online


Backend is assignment 2 which is by .NET6


Background
Logo
The Game Academy is a premiere establishment providing world-class game resources. They take pride in their partnership with local board gamers. The academy's web portal uses a service-oriented architecture with a UI front-end, and a service back-end. The previous assignments asked you to help constructing the service back-end, and this assignment is the start of your journey helping to construct the front-end.

This assignment looks at the separation of data from the UI, and how such data can be consumed and used in the end-user application. A later assignment will explore potential vulnerabilities that could arise when such an architecture is poorly implemented.

In the previous assignments, you implemented a small number of data sources that supply key information content from/to the academy. These data sources enable separation of information content from the presentation.

The Game Academy
You are now ready to build the real application using the endpoints you developed in your previous two assignments. Please refer to those assignment specifications for the description of the endpoints. There are likely to be minor contractual differences, and these can be observed through the API documentation available at https://cws.auckland.ac.nz/gas/swagger/index.htmlLinks to an external site. which also allows you to experiment with the endpoints. Note that not all endpoints are used.

The application should consist of the following logical sections:

Chessboard
🏠 Home
This section is the landing place containing an introduction to the academy. Think of something attractive (cheeky ones are okay) to say about the academy. Display the version of the server at the bottom of the section.
🛒 Academy Shop
This section contains the products available in the shop. The display list could grow large, so you will need to have a search bar to dynamically shrink the list. There is an endpoint to support this.
✍ User Registration
This section allows a user to register by choosing a username and password, and providing an address.
👩 User Login
This section allows a registered user to login. Access to this section is only granted if a user is not logged in.
♚ Game of Chess
This section allows a registered user to play a game of chessLinks to an external site. with another registered user. The UI supports orderly moves using drag-and-drop of pieces, but it does not need to enforce any game rules. The rules are expected to be adhered to and verified by the two players. There are some important things to facilitate in the UI: correct initial setup of the board, capturing the opponents piece (which involves replacing the opponent's piece with our own), castling (which involves swapping two pieces), and pawn promotion (which involves replacing a pawn with a spare queen).
The artwork for the chessboard are available at https://cws.auckland.ac.nz/gas/images/ and are named Bb.svg, Bw.svg, Kb.svg, Kw.svg, Nb.svg, Nw.svg, Pb.svg, Pw.svg , Qb.svg, Qw.svg, Rb.svg, Rw.svg, and Bin.svg. For example, see https://cws.auckland.ac.nz/gas/images/Rb.svgLinks to an external site.. You must use the provided artwork in your implementation.
📖 Guest Book
This is where guest comments can be entered into. It also shows recent commments from other guests.
User Authentication
Buying products from the shop will require a user to register and authenticate. The purchase endpoint of the service is related to the shop, and is only accessible to authenticated registered users. This endpoint allows registered users to puchase products from the shop. Registered users are required to authenticate before using this endpoint. For each of the shop items, add a 'buy now' facility in the shop. This can be crudely implemented by linking this 'buy now' to the corresponding purchase endpoint. The browser will then take care of authentication by prompting the user for credentials. Credentials of a registered user need to be supplied at this point. You could also use the pre-registered user jbon007 whose password is jbon007passwd.

Do you see why the simple approach of letting the browser take care of authentication is not ideal?

A better approach to authentication is to have a (logical) login section and direct the user to it when they want to purchase something (and if the user is not already logged in). The login section would collect the user's credentials (username and password) and use the credentials when making a purchase request to the server backend.

Learning Outcomes
Be able to design and develop a simple web application.
Be able to understand platform variations and dependencies.
An understanding of HTML5, CSS, and JavaScript.
Be able to use Web APIs and consume data.
Test Plan
You need to think about how you would test and validate your application. To help you get started, here are a few points that might help you.

Showing the correct logo
Having a favicon for the site
Having the logical sections (home, shop, etc.) and being able to see only one section at a time
Being able to view the current set of comments
Being able to submit comments
Being able to search the list of products
Being able to shrink the list of products dynamically
Being able to view the site well on a mobile screen
Login status (logged in or not) shown
Logout option available and functional (when logged in)
Purchase action re-directed to login if the user is not currently logged in
Successful purchase message displayed well when the user is logged in
Discussing your test plan on the discussion forum with your peers will be of use, and is strongly encouraged.
