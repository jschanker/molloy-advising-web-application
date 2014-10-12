molloy-advising-web-application
===============================

Welcome student to the advisement project!  I'm so glad that you're taking the time to read this and contribute.  Much needs to be done to make this application more maintainable and more effective for the user.

Files
=====

advisement-web-app.html : The structure of the web application and some JavaScript to generate the report HTML.  All of the .js files are imported.  We want to separate the logic and data in different files.  Eventually, the data should be drawn from the database.

advisement-styles.css : The style of the web app.

input-processor.js : This is where the course history data string copied from Lions Den gets processed as course objects and where the logic for the advice is.

las-requirements.js : Has the current LAS requirements and returns codes in the form Course Area + 2 spaces + Code Number.

gened-requirements.js : In progress.  We need the rest of the codes to be entered for each area.

courses.js : In progress.  Want prerequisites for courses and when they're offered.

