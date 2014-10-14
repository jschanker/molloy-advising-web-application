molloy-advising-web-application
===============================

Welcome student to the advisement project!  I'm so glad that you're taking the time to read this and contribute.  Much needs to be done to make this application more maintainable and more effective for the user.

Current Features
=====
Based on planned graduation and course history, the application will tell you if you're on pace to graduate in terms of number of total and LAS credits required.  It'll also tell you your remaining general education requirements.


Some Immediate Needs
=====
The user interface needs to be made more intuitive, and it could use a better design.
Courses that the student chooses to take needs to be processed.
Needed credits warning should account for situations in which e.g., the number of credits required for general education is greater than the overall number of credits required
Add some major/minor requirements.


Files
=====

advisement-web-app.html : The structure of the web application and some JavaScript to generate the report HTML.  All of the .js files are imported.  We want to separate the logic and data in different files.  Eventually, the data should be drawn from the database.

advisement-styles.css : The style of the web app.

input-processor.js : This is where the course history data string copied from Lions Den gets processed as course objects and where the logic for the advice is.  It contains a lot of hacked together code that will eventually need to be cleaned up and refactored.

las-requirements.js : Has the current LAS requirements and returns codes in the form Course Area + 2 spaces + Code Number.

gened-requirements.js : Contains general education requirements

courses.js : In progress.  Want prerequisites for courses and when they're offered.

