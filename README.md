tablegen - A jQuery plugin
============

Allows easy creation of HTML tables for logic/debugging purposes.

Need a 10 col x 100 row table? Need a 50 col x 1 row table?

tablegen will generate it in a flash so you can focus on the fun logic!

BROWSER SUPPORT
-----------------

I have only tested locally using the latest Chrome. While I wouldn't expect there to be any issues, be aware that I haven't test in any other browsers at this point.

Usage
------
First, load [jQuery](http://jquery.com/) and the plugin:

    <script src="jquery.min.js" type="text/javascript"></script>
    <script src="tablegen.jquery.js" type="text/javascript"></script>

Make sure you have at least one HTML table defined

    <table></table>

Now, call tablegen (see the 'options' object for the default settings)

    $(document).ready(function() {
        $('table').tablegen();
    });

Other examples:

Change row/column count

    $('table').tablegen({size: {rows: 4, cols: 6}});

Change column count and remove footer

    $('table').tablegen({size: {cols: 6}, footer: {include: false}});

Change column count and remove footer, change header cell value

    $('table').tablegen({size: {cols: 6}, header: {cellValue: "col"}, footer: {include: false}});


Copyright 2012  [Bill Thompson](https://github.com/billthompson). Released under MIT License.