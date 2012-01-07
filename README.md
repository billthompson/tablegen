tablegen - A jQuery plugin
============

Allows easy creation of HTML tables for logic/debugging purposes.

Need a 10 col x 100 row table? Need a 50 col x 1 row table?

tablegen will generate it in a flash so you can focus on the fun logic!

BROWSER SUPPORT
-----------------

I have only tested locally using the latest Chrome at this point. While I wouldn't expect there to be any issues, be aware that I haven't test in any other browsers at this point.

Usage
------
First, load [jQuery](http://jquery.com/) and the plugin:
<pre><code>
    <script src="jquery.min.js" type="text/javascript"></script>
    <script src="tablegen.jquery.js" type="text/javascript"></script>
</code></pre>


Make sure you have at least one HTML table defined
<pre><code>
    <table></table>
</code></pre>


Now, call tablegen (see the 'options' object for the default settings)
<pre><code>
    $(document).ready(function() {
        $('table').tablegen();
    });
</code></pre>


Other examples:

    Change row/column count
    <pre><code>
        $('table').tablegen({size: {rows: 4, cols: 6}});
    </code></pre>


    Change column count and remove footer
    <pre><code>
        $('table').tablegen({size: {cols: 6}, footer: {include: false}});
    </code></pre>
        
    Change column count and remove footer, change header cell value
    <pre><code>
        $('table').tablegen({size: {cols: 6}, header: {cellValue: "col"}, footer: {include: false}});
    </code></pre>


Copyright 2012 Bill Thompson (billthompson.me). Released under MIT License.