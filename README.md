Major courses in progress
=========================
Currently math major requirements mostly work if Math is specified as first major; related requirements not yet included.
What's said about the number of semesters you'll need to complete to get the course doesn't quite yet work either; I plan to fix this later.

Some Immediate Needs
=====
(*) The user interface needs to be made more intuitive, and it could use a better design.  I'm thinking that we change to a 1-column layout in which the user is guided through a series of collapsing/expanding sections and the recommendations are given at the end of the process.  This will make it more mobile-friendly as well.

(*) Courses that the student chooses to take need to be processed.

(*) Needed credits warning should account for situations in which e.g., the number of credits required for general education is greater than the overall number of credits required

(*) Add some major/minor requirements.

New Name: DIGICAP web app
=========================
NOTE: To more accurately reflect the application's purpose, I'm renaming it DIGICAP (Discussion Information Guide In Charting Academic Progress).  The objective is to generate potentially important topics of discussion for the advisor to have with the student.  It is *NOT* intended as a replacement for the advising process.


molloy-advising-web-application
===============================

Welcome student to the advisement project!  I'm so glad that you're taking the time to read this and contribute.  Much needs to be done to make this application more maintainable and more effective for the user.

Current Features
=====
Based on planned graduation and course history, the application will tell you if you're on pace to graduate in terms of number of total and LAS credits required.  It'll also tell you your remaining general education requirements.


Files
=====

advisement-web-app.html : The structure of the web application and some JavaScript to generate the report HTML.  All of the .js files are imported.  We want to separate the logic and data in different files.  Eventually, the data should be drawn from the database.

advisement-styles.css : The style of the web app.

input-processor.js : This is where the course history data string copied from Lions Den gets processed as course objects and where the logic for the advice is.  It contains a lot of hacked together code that will eventually need to be cleaned up and refactored.

las-requirements.js : Has the current LAS requirements and returns codes in the form Course Area + 2 spaces + Code Number.

gened-requirements.js : Contains general education requirements

courses.js : In progress.  Want prerequisites for courses and when they're offered.

