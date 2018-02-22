# Sprint 2 - *t10* - *Andromeda*

## Goal

### A mobile, responsive map and itinerary!
### Sprint Leader: *Evan Steiner*

## Definition of Done

* Web application ready for demo and potential customer release.
* Sprint Review and Retrospectives completed (sprint.md).
* Product Increment release `v2.0` created on GitHub with appropriate version number and name, a description based on the Release Notes template, and the archived files.
* Version in pom.xml should be `<version>2.0.0</version>`.
* Javadoc and unit tests for public methods.
* Deployed web application on a public server.
* ~~Coverage at least 50% overall and for each class.~~

## Policies

* ZenHub Board is updated correctly.
  * New issues reviewed and updated before up in *backlog*
  * *Issues in progress* have assignees.
  * Epics are resolved before moving to issues in *icebox*
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

* *## Let the user load a file with destinations*
  * Load a file containing a list of destinations in TFFI format.
  * Show all of the information provided in the file, such as trip name, distances, map, and itinerary.

* *## Show an itinerary of the round trip.*
  * The itinerary should describe each destination in the order, with the leg distance and cumulative trip distance to reach that location.
  * The starting point should list zero for the leg and cumulative distance.
  * The itinerary should be for a round trip, returning to the first destination (starting point) in the list.

* *## Plan the trip in the destination order the user provided*
  * Output of all possible destinations that can be moved to users trip.
  * The user picked the order, follow it.

* *## Give the user the option to choose what information to display in the itinerary.*
  * Destinations in the TFFI format may contain various attributes.
  * Let the user select which of the available attributes to display.
  * Set a reasonable default - the minimum is the "name" attribute.

* *## Show a map of the round trip.*
  * Create a map in SVG format with the round trip overlaid on a background SVG.
  * Background image will be supplied.

* *## Plan trips in the state of Colorado.*
  * local for now, global later.

*These include a list of Epics as seen in our ZenHub backlog.  These do not include the Epics in our icebox*

## Metrics

Statistic | Planned | Completed
--- | ---: | ---:
Tasks |  *17*   | *value*
Story Points |  *28*  | *value*

## Daily Scrums

Date | Tasks done  | Tasks in progress | Impediments
:--- | :--- | :--- | :---
02/03/2018 | *Not Started* | *#102, #51, #107* | none
02/13/2018 | *Issues #102, #51, #107*| *Issues #87, #94, #88*| setting up unix systems
02/17/2018 | *Issues #87, #94, #88* | *Issues #96*| resolving unneeded code and testing
02/20/2018 | *Issues #96, #73, #75, #104, #78, #81* | *Issues #120, #121, #126, #86, #132, #76, #135, #129, #128, #74, #134* | SVG latitude and longitude flipping
02/21/2018 | *Issues #120, #121, #126, #86, #132, #76, #135, #129, #128, #74, #134* | none | Maven Dependencies


## Review

#### Completed epics in Sprint Backlog
* *Let the user save their trip*:  *let the user save the trip to any file name with default trip.json*
* *Show an itinerary of the round trip*:  *displayed location, distance for each leg of trip and cumulative distance for each trip*
* *Plan trips in the state of Colorado*:  *let users plan trips inside the state but not outside it*
* *Show a map of the round trip*:  *visually appealing map!*
* *Let the user load a file with destinations*:  *loading in TFFI file format...exciting!*

#### Incomplete epics in Sprint Backlog
* *Give the user the option to display what information to display in itinerary*: *Did not have enough time and were focusing on more important epics*
* *Let the user choose a new starting location*: *Did not have time to allow user to choose other orders for trip aside from file order*
* *Plan the trip in the destination order the user provided*: *Did not have time to allow user to choose any order :(*
* *Give the user the option to view a shorter trip*:*Didn't have enough time and this was not a priority*

#### What went well
* *Fast update of itinerary*
* *Correct distances*
* *accurate beautiful map*

#### Problems encountered and resolutions
* *Issues with build, had to run mvn clean to resolve*
* *SVG problems with coordinate axis, took a second look to catch the error*
* *Files wouldn't load without distances attribute, resolved by adding distances attribute to file*
* *Passing decimaldegrees to different classes that needed them and avoiding double calculations, resolved by creating arraylist of them*

## Retrospective

Topic | Teamwork | Process | Tools
:--- | :--- | :--- | :---
What we will change this time |More Communication| More Testing | Have a full storyboard
What we did well |no major merge conflicts and quick fixes if there were, quick checking of pull requests | seemless integration, master was not broken, a good number of tests| lots of issues and epics in storyboard
What we need to work on |Bouncing ideas back and forth| more tests for everything, documentation using Javadoc before implementation | add more and better issues to storyboard/have a mid sprint meeting to add more issues, Zenhub
What we will change next time |More communication of ideas| write more of our tests before coding | Not wait until the last minutes to add issues to github
