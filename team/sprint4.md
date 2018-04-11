# Sprint 4 - *t10* - *Andromeda*

## Goal

### Versatile UI and even shorter trips!
### Sprint Leader: *Brian Martin*

## Definition of Done

* Web application deployed on the production server (kiwis.cs.colostate.edu).
* Sprint Review and Retrospectives completed (sprint.md).
* Product Increment release `v4.0` created on GitHub with appropriate version number and name, a description based on the Release Notes template, and the arhived files.
* Version in pom.xml should be `<version>4.0</version>`.
* Javadoc and unit tests for public methods.
* Tests for database and REST APIs.
* Coverage at least 50% overall and for each class.

## Policies

* ZenHub Board is updated correctly.
    - New issues reviewed and updated before up in backlog
    - Issues in progress have assignees.
    - Epics are resolved before moving to issues in icebox
* Code adheres to Google style guides for Java and JavaScript.
* Tests and Javadoc are written before/with code.  
* All pull requests include tests for the added or modified code.
* Master is never broken.  If broken, it is fixed immediately.
* Always check for new changes in master to resolve merge conflicts locally before committing them.
* All changes are built and tested before they are committed.
* Continuous integration successfully builds and tests pull requests for master branch always.
* All commits with more than 1 line of change include a task/issue number.
* All Java dependencies in pom.xml.

## Plan

Epics planned for this release.

 *Code Coverage*
   - Improve our code coverage - minimum %50
   
 *Clean Code*
   - Improve the quality of our code by lowering our technical debt ratio so our code is more maintainable.
   - Adopt Google coding standards for both Java and JavaScript code.
   
 *Distance Units*
   - Support distances in nautical miles
   - Allow users to specify other distance measures
   - Described in TFFI v2
   
 *Distance unit configuration*
   - Client should obtain supported distance units from the server via the config TFFI.
   
 *Shorter Trips #2*
   - Implement 2-opt
   - Efficienty is important
   
 *Filtered Searches*
   - Allow place searches to be filtered by an attribute, such as type (heliport, balloonport, smallairport, ...)
   - Obtain search attributes via server config query
   
 *Zoom and Pan the map*
   - Replace SVG maps with Google maps that can be zoomed and panned.
   
 *Plan Trips outside of Colorado*
   - New database provider supports destinations worldwide and additional info about each destination (table joins).
   - New SVG background available.
   
 *Improve the user experience*
   - Quality of life improvements
   
## Metrics

Statistic | Planned | Completed
--- | ---: | ---:
Tasks | *24* | *50* 
Story Points | *46*| *69* 

## Daily Scrums

Date | Tasks done  | Tasks in progress | Impediments 
:--- | :--- | :--- | :--- 
*03/24/2018* | *Not Started Yet* | *#260 #269 #256 #274* | *database/filter implementation*
*03/27/2018* | *Added 'add all' button for searching database, Added 'remove all' button for database searching, Added individual 'remove' button to destinations in itinerary, handled distance unit config on client, added supported distance units to config rest API* | *#260 #256* | *filter implementation*
*03/29/2018* | *Updated itinerary table for various screen sizes and style, reactive button layout, added custom units to the front end with text boxes, updated warning message to show only when using and optimized plan* | *#260 #258* | *filter implementation*
*04/3/2018* | *Include ID column in query searches, Placing coordinates on the map, Display world map in application, scaling lines on map* | *#260 #258 #281* | *filter implementation, Google Map implementation*
*04/10/2018* | *2-opt, added slider position for 2-opt, wraped SVG polylines, finished filtered searches, updated UI colors, added Google Map dependencies* | *#345 #353* | *Google Map implementation with server*
*04/11/2018* | *Save filter state, updated grammar, added tooltips to icons, added trash icon to remove all button, added country and region to trip itinerary* | *none* | *Google Map implementation for next sprint*

## Review

#### Completed epics in Sprint Backlog 
* Shorter trips #2
* Filtered Searches
* Plan trips outside of Colorado
* Distance Unit Configuration
* Improve the user experience

#### Incomplete epics in Sprint Backlog 
* System Testing
* Branding
* Zoom and Pan the map

#### What went well
* Developed a great UI for the user
* Added features that make it easier for the user to use the application
* We were able to have continious integration

#### Problems encountered and resolutions
* Issues and uncertainties on implementing the Google Map, asking questions definitely helped but we didn't have enough time to complete the task
* SVG wrapping, did not think of a great solution to the problem
* Interpreted the optimization value of .6 as something that was not expected

## Retrospective

Topic | Teamwork | Process | Tools
:--- | :--- | :--- | :---
What we will change this time | Even more questions at the early stages of our tasks and pair programming | More continous integration | Take code climate more seriously
What we did well | Pair programming and communication | We did a good job at planning and creating tasks for what we needed to do | Used github effectively, took care of code climate issues
What we need to work on | Need to find out more information on big issues earlier | Testing javascript | Jacoco and Emma
What we will change next time | Walk through our code with each other for better understanding for complex tasks | Allow more time for testing, possibly earlier commits | Get more familiar with KML and Jest. Make the UI better
