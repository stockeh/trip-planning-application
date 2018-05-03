# Sprint 4 - *t10* - *Andromeda*

## Goal

### Versatile UI and even shorter trips!
### Sprint Leader: *Evan Steiner*

## Definition of Done

* Web application deployed on the production server (kiwis.cs.colostate.edu).
* Sprint Review and Retrospectives completed (sprint.md).
* Product Increment release `v5.0` created on GitHub with appropriate version number and name, a description based on the Release Notes template, and the arhived files.
* Version in pom.xml should be `<version>5.0</version>`.
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

 *Shorter Trips #3*
   - Implement 3-opt
   - Efficiency is important

 *Filtered Searches*
   - Allow place searches to be filtered more than just type.
   - Obtain search attributes via server config query

 *Zoom and Pan the map*
   - Replace SVG maps with Google maps that can be zoomed and panned.

 *Improve the user experience*
   - Quality of life improvements

 *Branding*
   - Add Colorado State header and footer
   - Refer to CSU web guidelines

 *Staff Page*
   - Apart of Navbar, displaying an overview of the contributors for this application.

 *Filtering*
   - Add a staff "page"/section/... showing the contributors photos, bios, etc.
   - Link to your resumes if online.
   - Update your resumes to reflect what you've learned this semester.  

 *Interop*
   - Test your client interoperability with servers from other teams.
   - Allow the host/port to be configured on the client after it is loaded.
   - Your server interoperability will be tested by other teams testing their clients.
   - There will be assignment(s) to report your results.   

  *TFFI Updates*
   - Limits the number of destinations returned from search.   

## Metrics

Statistic | Planned | Completed
--- | ---: | ---:
Tasks | *32* | *78*
Story Points | *63*| *76*

## Daily Scrums

Date | Tasks done  | Tasks in progress | Impediments
:--- | :--- | :--- | :---
*04/15/2018* | *Not Started Yet* | *ll* | *kk*
*04/19/2018* | *Google Maps, UI Redesign, CSS, Branding, Menus* | *Two-opt, More UI Design* | *Difficulties with branding images, issues with z-index, difficulties implementing side menu*
*04/21/2018* | *Refactored Distance.java, Itinerary Layout Update* | *Filters, Itinerary Design, Interoperability, 3-opt, adding limit to query* | *difficulties in filter design, getting interop working*
*04/24/2018* | *Filters, More UI Design, Interoperability, limit in query, Bug Fixes, Staff page layout/bitmojis* | *3-opt, Clean up filter class, logic to display google map or SVG, Staff page information* | *difficulties with page display on different browsers and mobile*

## Review

#### Completed epics in Sprint Backlog
* *Improve UI*:  *nicer css layout etc*
* *TFFI Update* *added limit to tffi*
* *Staff Page* *cool staff page with bitmojis* 
* *Shorter Trips #3* *3-opt!*
* *Zoom and Pan Map* *Google Map implementation*
* *Filtering* *added filters*
* *Interopt* *interoperation between clients and servers*

#### Incomplete epics in Sprint Backlog
* *Save Options as default*: *not enough time*
* *Speed up server computation* *not enough time*
* *View trip in other tools* *not enough time*
* *System testing* *not enough time*

#### What went well
* *User Interface*
* *Splitting up tasks*
* *good prioritization of tasks*

#### Problems encountered and resolutions
* *Dropdown table issues with reactstrap, resolution was use select element*
* *Images not working correctly, solution was lots of googling*
* *difficulties with safari, solution was to not support it*

## Retrospective

Topic | Teamwork | Process | Tools
:--- | :--- | :--- | :---
What we will change this time | Walk through our code with each other for better understanding for complex tasks
| Allow for more time for testing possibly earlier commits | Get more familiar with KML and Jest. 
Make the UI better
What we did well | splitting up tasks | better planning | nice CSS
What we need to work on | more communication | More test driven development | Jest
What we will change next time | N/A | N/A | N/A
