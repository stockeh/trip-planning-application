# Inspection - Team *T10*
 
Inspection | Details
----- | -----
Subject | *Filter.js, lines 1-194*
Meeting | *Tuesday, April 24, 2018 - 3:30 - Colorado State University, Stadium*
Checklist | *Java Inspection Checklist by Christopher Fox, http://www.cs.toronto.edu/~sme/CSC444F/handouts/java_checklist.pdf*

### Roles
Name | Role | Preparation Time
---- | ---- | ----
Jason Stock | Moderator, Ender user, Maintainer, Tester | 1.5 hr
Brian Martin | Ender user, Maintainer, Tester | .5 hr
Evan Steiner | Ender user, Maintainer, Tester | .5 hr
Alex Segura | Ender user, Maintainer, Tester |

### Log
file:line | defect | h/m/l | who found | github# 
--- | --- |:---:|:---:| ---
 Filter.js:5|Unnecessary comments| L |Jason Stock| #452
 Filter.js:15|Unnecessary initialization of array| M |Jason Stock| #452
 Filter.js:160|Inconsistent button type| L |Jason Stock| #452
 Filter.js:171|Does not check for interoperability filter update| H |Jason Stock| #454
 Filter.js|Comment defects| M |Jason Stock| N/A
 Filter.js:60,76|Missing semicolon| L |Jason Stock| #452
 Filter.js:87|Unnecessary call to buildFilter| M |Evan Steiner| #453
 Filter.js|Never checks if filter exists in config| M |Evan Steiner| N/A
 Filter.js:17|currentSearch variable doesn't actually do anything| S |Evan Steiner| #453
 Filter.js:88|EventListener could also listen to filter buttons| S |Evan Steiner| N/A
 Filter.js:71,151|onFocus, onBlur and on are unnecessary| M |Evan Steiner| #453
 Filter.js:54|buildFilter function should standardize code spacing| L |Brian Martin| N/A
 Filter.js:42|var used instead of let| M |Brian Martin| #452
 Filter.js:71|on attribute not supposed to be there?| M |Brian Martin| #453
 Filter.js:150|className is empty| L |Brian Martin| #453
 Filter.js|standardize tab spacing| L |Brian Martin| N/A
 Filter.js:23,80,87|extra line| L |Brian Martin| N/A
 Filter.js:45|semi-colon not needed| L |Brian Martin| N/A
 
