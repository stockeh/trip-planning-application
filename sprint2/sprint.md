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
02/03/2018 | *Issues #95* | *Issues #72* | none
 | | |


## Review

#### Completed epics in Sprint Backlog
* *user story*:  *comments*
*

#### Incomplete epics in Sprint Backlog
* *user story*: *explanation...*
*

#### What went well
* *something*
*

#### Problems encountered and resolutions
* *something*
*

## Retrospective

Topic | Teamwork | Process | Tools
:--- | :--- | :--- | :---
What we will change this time |  |  |
What we did well |  |  |
What we need to work on |  |  |
What we will change next time |  |  |
