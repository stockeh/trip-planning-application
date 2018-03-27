package com.tripco.t10.planner;

public class Parser {

    /**
     *this method is used to convert a location array into a single double (decimalDegrees)
     *this method will be called by the parseLatLong method
     *@param location array is a double array of latitude or longitude
     *                 in order of degrees minutes seconds. Should have all
     *                 three even if some are 0
     *@return decimalDegrees which is the coordinate converted to decimal degrees
     */

    public double convertDecimalDegrees(double[] location){
        double decimalDegrees = 0;
        double divisor = 1.0;
        for(double d : location){
            decimalDegrees += (d/divisor);
            divisor *= 60;
        }
        return decimalDegrees;
    }

    /**
     *checks to see if one of the four valid direction characters is present at the
     *end of the passed string and returns that value if so
     *@return direction present in string or 0 if it doesn't have one.
     *@param coordinate should be inputted so that character is at end of string
     */
    public char hasDirection(String coordinate){
        if(coordinate.length() > 0) {
            char c = coordinate.charAt(coordinate.length() - 1);
            if (c == 'N' || c == 'S' || c == 'W' || c == 'E') {
                return c;
            }
        }
        return '0';
    }

    /**
     *checks to see if degree is validLatitude/within colorado
     *@return true if passed direction and degree is a valid Latitude coordinate and false otherwise
     *@param direction which is any char
     *@param degree which is any double
     */
    public boolean validLatitude(char direction, double degree){
        if(direction == '0' || direction == 'N' || direction == 'S'){
            if(degree <= 90 && degree >= -90) return true;
        }
        return false;
    }

    /**
     *checks to see if degree is validLongitude/within colorado
     *@return true if passed direction and degree is a valid longitude coordinate and false otherwise
     *@param direction which is any char
     *@param degree which is any double
     */
    public boolean validLongitude(char direction, double degree){
        if(direction == '0' || direction == 'W' || direction == 'E'){
            if(degree <= 180 && degree >= -180) return true;
        }
        return false;
    }

    /**
     *flips the degrees of a decimalDegree based on direction
     * @param direction is any char
     * @param degree is any double
     * @return passed double inverted if direction is w or S
     */
    public double flipDegrees(char direction, double degree){
        if(direction == 'S' || direction == 'W')return -degree;
        else return degree;
    }

    /**
     * getDMS will return a 2 length array where the first value is the
     * degree, minute or second value depending on your passed regex
     * passed regex should probably be ° | ' | " but it doesn't have to
     * this method will be called by the getLocationArray method
     * @param coordinate will be split to array based on regex
     * @param regex coordinate is split into array at this regex if present
     * @return coord array of length 2
     */
    public String[] getDMS(String coordinate, String regex){
        String[] coord = {"0",coordinate};
        if(coordinate.length() > 0) {
            if (coordinate.contains(regex)) coord = coordinate.split(regex,2);
            else if(coordinate.contains(" ")) coord = coordinate.split(" ", 2);
            else if(!coordinate.contains(" ") && !coordinate.contains("°")
                    && !coordinate.contains("'") && !coordinate.contains("\"")){
                coord[0] = coordinate;
                coord[1] = "0";
            }
        }
        if(coord[1].length()==0)coord[1] = "0";
        return coord;
    }

    /**
     * getLocationArray will return an array of the parsed latitude or longitude string
     * this should only be called by parseLatLong
     * @param coordinate string with spaces only between numbers without degree/minute/second sign
     * @return array containing degrees minutes and seconds which are allocated to 0 if they weren't
     * in the passed location, null if there is parsing error indicating an invalid coordinate format
     */
    public double[] getLocationArray(String coordinate) {
        double[] location = {0, 0, 0};
        try {
            String[] degreeMS = getDMS(coordinate, "°");
            String[] minuteSecond = getDMS(degreeMS[1], "'");
            location[0] = Double.parseDouble(degreeMS[0]);
            location[1] = Double.parseDouble(minuteSecond[0]);
            location[2] = Double.parseDouble(minuteSecond[1].replaceAll("\"", ""));
            return location;
        } catch (NumberFormatException e) {
            System.out.println("ERROR: " + e + " INVALID COORDINATE FORMAT");
            return null;
        }
    }

    /**
     * prepares a coordinate string for usage by getLocationArray, this mostly involves replacing various
     * different minute/second formats with a single one and removing spaces that where possible
     * @param coordinate is the string to be prepared
     * @return prepared coordinate string
     */
    public String prepareString(String coordinate){
        coordinate = coordinate.trim();  //trim spaces from front and back of string
        coordinate = coordinate.replaceAll("['`‘’′]","'");
        coordinate = coordinate.replaceAll("[\"”“″]","\"");
        coordinate = coordinate.replaceAll("\\s+", " ");
        coordinate = coordinate.replaceAll("\\s*(°|\"|'|[NSEW])\\s*","$1");
        return coordinate;
    }

    /**
     *parses a latitude/longitude string and returns the conversion to decimalDegrees
     *@param coordinate a string of a latitude or longitude coordinate
     *@param isLatitude a boolean that is true for latitude and false for longitude
     *parses coordinate string
     *@return coordinate string converted to decimal degree and -1000 if string is invalid
     */
    public double parseLatLong(String coordinate, boolean isLatitude){
        coordinate = prepareString(coordinate);
        char direction = hasDirection(coordinate);
        if (direction != '0') coordinate = coordinate.substring(0, coordinate.length() - 1);
        double[] location = getLocationArray(coordinate);
        if(location == null) return -1000;
        double decimalDegrees = flipDegrees(direction,convertDecimalDegrees(location));
        if(isLatitude && validLatitude(direction,decimalDegrees))return decimalDegrees;
        else if(!isLatitude && validLongitude(direction,decimalDegrees))return decimalDegrees;
        else return -1000;
    }
}
