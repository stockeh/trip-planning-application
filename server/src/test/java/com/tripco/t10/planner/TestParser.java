package com.tripco.t10.planner;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;

@RunWith(JUnit4.class)
public class TestParser {
    Parser parser;

    @Before
    public void initialize() {
        parser = new Parser();
    }

    @Test
    public void testPrepareString() {
        assertEquals("88.2°20.34'38.1\"N",parser.prepareString("88.2°20.34'38.1\"N"));
        assertEquals("88.2°20.34'38.1\"N",parser.prepareString("88.2 °20.34   '  38.1\"N  "));
        assertEquals("88.2°20.34'38.1\"N",parser.prepareString("  88.2°   20.34 '38.1\" N  "));
        assertEquals("88.2 20.34 38.1\"S",parser.prepareString("88.2  20.34  38.1  \"  S  "));
    }

    @Test
    public void testGetDMS() {
        assertEquals("88.2",parser.getDMS("88.2°20.34'38.1\"N","°")[0]);
        assertEquals("20.34'38.1\"N",parser.getDMS("88.2°20.34'38.1\"N","°")[1]);
        assertEquals("20.34",parser.getDMS("20.34'38.1\"N","'")[0]);
        assertEquals("38.1",parser.getDMS("38.1\"N","\"")[0]);
        assertEquals("20.34",parser.getDMS("20.34 38.1\"N","°")[0]);

    }

    @Test
    public void testHasDirection() {
        assertEquals('N',parser.hasDirection("88.2°20.34'38.1\"N"));
        assertEquals('E',parser.hasDirection("88.2°20.34'38.1\"E"));
        assertEquals('0',parser.hasDirection("88.2°20.34'38.1"));
    }

    @Test
    public void testGetLocationArray(){
        assertArrayEquals(new double[]{88.2,-20.34,38.1},parser.getLocationArray("88.2°-20.34'38.1\""),.00000001);
        assertArrayEquals(new double[]{0,0,0},parser.getLocationArray(""),.00000001);
        assertArrayEquals(new double[]{0,-3.2,0},parser.getLocationArray("-3.2'"),.00000001);
        assertArrayEquals(new double[]{0,3.2,0},parser.getLocationArray("3.2'"),.00000001);
        assertArrayEquals(new double[]{43,12,3.2},parser.getLocationArray("43 12 3.2\""),.00000001);
        assertArrayEquals(new double[]{43,12,3.2},parser.getLocationArray("43°12'3.2"),.00000001);
        assertArrayEquals(new double[]{43,0,0},parser.getLocationArray("43"),.00000001);
        assertArrayEquals(new double[]{0,43,44},parser.getLocationArray("43'44"),.00000001);
    }

    @Test
    public void testGetLocationErrors(){
        assertArrayEquals(null,parser.getLocationArray("43 12 3.2'"),.00000001);
        assertArrayEquals(null,parser.getLocationArray("43 12° 3.2"),.00000001);
        assertArrayEquals(null,parser.getLocationArray("43A 12 3.2"),.00000001);
    }


    @Test
    public void testParseLat() {
        assertEquals(38.2 + (20.34 / 60) + (38.1 / 3600.0), parser.parseLatLong("38.2°20.34'38.1\"N", true),.00000001);  //test no spaces
        assertEquals(39.35 + (32.0 / 60) + (42.12 / 3600.0), parser.parseLatLong("    39.35  ° 32   ' 42.12   \" N  ", true),.00000001);  //test latitude general form and lots of spaces
        assertEquals(40.35 - (32.0 / 60.0) - (42.12 / 3600.0), parser.parseLatLong("-40.35° 32' 42.12\" S", true),.00000001); //test negative sign
        assertEquals(84.0 + (42.12 / 3600.0), parser.parseLatLong("37° 42.12\" N", true),.00000001);  //test exclude degrees from expression
        assertEquals(37.21, parser.parseLatLong("-37.21 S", true),.00000001);  //test decimal degrees plus direction
    }

    @Test
    public void testParseLong() {
        assertEquals(-158.2+(20.64/60.0)+(38.1/3600.0), parser.parseLatLong("-108.2   ° 20.64 ' 38.1  ",false),.00000001);
        assertEquals(-108.2+(20.64/60.0)+(38.1/3600.0), parser.parseLatLong("-108.2° 20.64' 38.1\" E",false),.00000001); //test longitude general form
        assertEquals(-102.2-(20.0/60.0)-(100.12/3600.0), parser.parseLatLong("102.2° 20' 100.12\" W",false),.00000001);  //test west and carryover from seconds
        assertEquals(-107.32, parser.parseLatLong("   -107.32   ",false),.00000001);  //test already in format longitude degrees and extra spaces
        assertEquals(-104.95, parser.parseLatLong("104.95° W",false),.00000001);  //test only degrees
        assertEquals(-105.95 + (32.1/60.0), parser.parseLatLong("-105.95° 32.1'",false),.00000001);  //test no direction in full format
    }

    @Test
    public void testParseLatLongFail() {
        assertEquals(-1000, parser.parseLatLong("89.95°60' 43\" N",true),.00000001);  //test that latitude cant go over 90
        assertEquals(-1000, parser.parseLatLong("180.95°60' 43\" E",false),.00000001);  //test that longitude cant go over 180;
        assertEquals(-1000, parser.parseLatLong("49.95°60' 43\" E",true),.00000001);  //test that latitude cant be E or W
        assertEquals(-1000, parser.parseLatLong("59.95°60' 43\" S",false),.00000001);  //test that longitude cant be north south
        assertEquals(-1000, parser.parseLatLong("        ",true),.00000001);
        assertEquals(-1000,parser.parseLatLong("20' 43 39.95° N", true),.00000001); //test out of order
        assertEquals(-1000,parser.parseLatLong("N",true),.00000001);
        assertEquals(-1000, parser.parseLatLong("43 12° 3.2",true),.00000001);
    }
}
