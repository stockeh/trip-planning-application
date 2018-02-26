# Sprint 3 - *t10* - *Andromeda*

## Goal

### Shorter trips and more places to go!
### Sprint Leader: *Alex Segura*

## Definition of Done

* Web application deployed on the production server (kiwis.cs.colostate.edu).
* Sprint Review and Restrospectives completed (sprint.md).
* Product Increment release `v3.0` created on GitHub with appropriate version number and name, a description based on the Release Notes template, and the arhived files.
* Version in pom.xml should be `<version>3.0</version>`.
* Javadoc and unit tests for public methods.
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

 *#144 Clean Code*
   - Improve the quality of our code by lowering our technical debt ratio so our code is more maintainable.
   - Adopt Google coding standards for both Java and JavaScript code.
   
 *#146 Code Coverage*
   - Improve our code coverage - minimum of 50%
   
 *#79 Give the user an option to view a shorter trip*
   - Implement the nearest neighbor algorithm to identify a shorter round trip.
   - Note that the nearest neighbor algorithm produces different distances depending on the starting location, * so you need to compute them all and choose the shortest.

 *#83 Give the user an option to view what information to display in the itinerary*
   - Destinations in the TFFI format may contain various attributes.
   - Let the user select which of the available attributes to display.
   - Set a reasonable default - the minimum is the "name" attribute.

 *#80 Let the user choose a new starting location*   
   - Visiting the destinations in the same order, just start from a different location.
   - Update the itinerary.
 
 *#145 Build a trip form existing information*
   - Let the user select places from a list.
   - Obtain the list from a database of places.
   - Only provide a subset of the list that matches some information supplied by the user.
   - Access the database from the server via REST API calls from the client.

## Metrics

Statistic | Planned | Completed
--- | ---: | ---:
Tasks |  *29*   | *2* 
Story Points |  *39*  | *1* 

## Daily Scrums

Date | Tasks done  | Tasks in progress | Impediments 
:--- | :--- | :--- | :--- 
*02/25/2018* | *Not Started Yet* | *#166 #151* | none
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
