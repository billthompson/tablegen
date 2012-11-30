tablegen - A jQuery plugin
============

Quickly prototype large, tabular datasets by letting you easily generate x * y tables.

Usage
------
First, load [jQuery](http://jquery.com/) and the plugin:

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
	<script src="./tablegen.jquery.min.js"></script>

Now, call tablegen:

    $('#target').tablegen();

View examples/ for more...examples.

Options
------
Change row/column count:

    $('#target').tablegen({size: {rows: 4, cols: 6}});


Copyright 2012  [Bill Thompson](https://github.com/billthompson). Released under MIT License.