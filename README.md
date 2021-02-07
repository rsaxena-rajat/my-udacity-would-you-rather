# "Would You Rather" Project (for Udacity React Nanodegree)

"Would You Rather" is a web app that lets a user play the “Would You Rather?” game. The game goes like this: A user is asked a question in the form: “Would you rather [option A] or [option B] ?”. Answering "neither" or "both" is against the rules. It is built in React.

## Functional details

The person using this application has a way of impersonating/logging in as an existing user. Once the user logs in, the home page is shown.

Information about the logged in user appears on the page. If someone tries to navigate anywhere by entering the address in the address bar, the user is asked to sign in and then the requested page is shown. The application allows the user to log out and log back in.

Once the user logs in, the user is able to toggle between his/her answered and unanswered polls on the home page, which is located at the root. The polls in both categories are arranged from the most recently created (top) to the least recently created (bottom). The unanswered questions are shown by default, and the name of the logged in user is visible on the page.

Each polling question links to the details of that poll. The details of each poll are available at questions/:question_id.

When a poll is clicked on the home page, the following is shown:

Text “Would You Rather”;
Avatar of the user who posted the polling question; and
Two options.
For answered polls, each of the two options contains the following:

Text of the option;
Number of people who voted for that option; and
Percentage of people who voted for that option.
The option selected by the logged-in user should be clearly marked.

The application shows a 404 page if the user is trying to access a poll that does not exist. It also displays a navigation bar so that the user can easily navigate anywhere in the application.

Upon voting in a poll, all of the information of an answered poll is displayed. The user’s response is recorded and clearly visible on the poll details page. Users can only vote once per poll; they are not allowed to change their answer after they’ve voted ! When the user comes back to the home page, the polling question should appear in the “Answered” column.

The form for posting new polling questions is available at the /add route. The application shows the text “Would You Rather” and has a form for creating two options. Upon submitting the form, a new poll is created, the user is taken to the home page, and the new polling question appears in the correct category on the home page.

The application has a leaderboard that’s available at the /leaderboard route. Each entry on the leaderboard contains the following:

User’s name;
User’s picture;
Number of questions the user asked; and
Number of questions the user answered
Users are ordered in descending order based on the sum of the number of questions they’ve asked and the number of questions they’ve answered. The more questions one asks and answers, the higher up one moves.

The user are able to navigate to the leaderboard, to a specific question, and to the form that allows the user to create a new poll both from within the app and by typing in the address into the address bar. To make sure we’re showing the data that is relevant to the user, the application requires the user to be signed in order to access those pages.

## Installation

The application requires NodeJS (v12 and above) and npm (Node Package Manager) to be installed.

> NodeJS Installation: https://nodejs.org/en/download/

The dependencies can be installed using:

```sh
$ cd my-udacity-would-you-rather
$ npm install
```

The application can be launched by running the following in the cloned folder:

```sh
$ npm start
```

This would launch the application at http://localhost:3000 in the browser.

**Enjoy the application !!**

