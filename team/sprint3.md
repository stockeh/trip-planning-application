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
Tasks |  *22*   | *56* 
Story Points |  *39*  | *70* 

## Daily Scrums

Date | Tasks done  | Tasks in progress | Impediments 
:--- | :--- | :--- | :--- 
*02/25/2018* | *Not Started Yet* | *#166 #151 #164 #165* | *none*
*03/01/2018* | *#167, #166, #165, #164, #168, #153, #169, #152, #170*| *#151, #154, #150, #171* | *Intigration, Implimenting Slider, Installing npm libraries*
*03/08/2018* | *#171, #173, #152, #155, #176, #178, #151, #80, #156, #157, #179, #180, #181, #182, #150, #183, #190, #194, #193* | *#195, #184, #154, #149* | *ReactJS stuff*
*03/16/2018* | *#195, #184, #154, #149, #160, #186, #158, #161, #91, #83, #189, #162, #163, #93, #205, #159, #148, #214, #145* | *#212, #216* | *Database Connection, version 2 complications*
*03/19/2018* | *Added Nautical Miles, Reduced Code Smells and configured config rest API, updated TFFI* | *Updating Save File and Updating Radius for User Defined Units* | *HTTP GET vs HTTP POST, TFFI Format*
 *03/21/2018* | *Added User Defined Radius, Added User Defined Units, Nearest Neighbor Improvement Made, Updated Save File* | *none* | *Exact Nearest Neighbor Specs*

## Review

#### Completed epics in Sprint Backlog 
* *Updating TFFI*
* *Build a trip from existing information*
* *Give the user the option to chose what information to display in the Itinerary*
* *Plan the trip in the destination order the user provided*
* *Let the user chose a new starting location*
* *Give the user an option to view a shorter trip*


#### Progressional epics in Sprint Backlog 
* *Clean Code*
* *Code Coverage*

#### What went well
* *Client features are simple for the user*
* *Server was built to support a variety of features for the user*

#### Problems encountered and resolutions
* *uncertainty with nearest neighbor implementation and TFFI handling, discussions with other teams helped*
* *Database connection issue with firewall, getting access into campus network solved this issue*

## Retrospective

Topic | Teamwork | Process | Tools
:--- | :--- | :--- | :---
What we will change this time | More communication to begin project | More brainstorming in intial phase of sprint | Start early on the databese technical stuff
What we did well | Team maintained communication over break | Team kept up with all issues including backlog | Effectivey used Reactstrap
What we need to work on | Begin communicating wiith each other early on the new stuff, MariaDB/SQL | Make sure we estimate all issues we make | Familiarize ourselves with SQL so everyone can work on possible future database issues
What we will change next time | Team can begin large portions of sprint in pairs | Look over and reorganize issues/ourselves in dynamic fashioin  | Familiarize ourselves with styling, CSS
