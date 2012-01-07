(function($) {
    /**
     * tablegen.jquery.js
     *
     * @author Bill Thompson (@bthompson_)
     * @website billthompson.me
     * @description Allows easy creation of HTML tables for debug purposes. Need a 10 col x 100 row table?
     * Need a 50 col x 1 row table? tablegen will generate it in a flash so you can focus on the fun logic!
     *
     * Copyright Bill Thompson, 2012
     * This content is released under the MIT License http://www.opensource.org/licenses/mit-license.php.
     *
     * Basically, provided "as-is" and don't remove anything above this line and you'll be fine :)
     
     * TODO: Refactor _generateHeader and _generateFooter.
     */

    var methods = {
        options: {
            size: {rows: 12, cols: 8},
            header: {include: true, includeCellNum: true, cellValue: "hcol-"},
            footer: {include: true, includeCellNum: true, cellValue: "fcol-"},
            body: {includeCellNum: true, cellValue: "row-"}
        },
        init : function(userops) {
            var self = methods;

            $.extend(true, methods.options, {element: this}, userops);

            return this.each(function() {

                var $this = $(this),
                    data = $this.data('tablegen');

                // If the plugin hasn't been initialized yet
                if (! data) {
                    $(this).data('tablegen', methods.options);
                }

                //self._generate();
                self._generate()

            });
        },
        _getOps : function(opt) {
            // Let's always get the options from the element data (not the options object)
            var $this = $(methods.options.element),
                data = $this.data('tablegen');

            // If we are looking for a specific object, let's provide a shortcut
            if (opt != null) {
                data = data[opt];
            }

            return data;
        },
        _generate: function() {
            var self = methods,
                element = self._getOps('element');

            // We don't want to assume previously valid syntax with correct
            // column/row counts so let's start from scratch.
            if($(element).children().length > 0) {
                $(element).empty();
            }

            // If we should include the header, do so.
            if (self._getOps('header').include) {
                self._generateHeader();
            }

            // If we should include the footer, do so.
            if (self._getOps('footer').include) {
                self._generateFooter();
            }

            // What's a table without a body? Let's include it.
            self._generateBody();

        },
        _generateHeader: function() {
            var self = methods,
                element = self._getOps('element'),
                headRow = $(element).append('<thead/>').find('thead').append('<tr/>').find('tr').last();

            // Building a header with 1 row and N columns.
            for (i = 0; i <= self._getOps('size').cols - 1; i++) {
                // Determine if we should include the column number in the cell and render cell value
                var cellValue = (self._getOps('header').includeCellNum) ? self._getOps('header').cellValue + i: self._getOps('header').cellValue;
                $(headRow).append('<td/>').find('td').last().text(cellValue);
            }
        },
        _generateFooter: function() {
            var self = methods,
                element = self._getOps('element'),
                footRow = $(element).append('<tfoot/>').find('tfoot').append('<tr/>').find('tr').last();

            // Building a footer with 1 row and N columns.
            for (i = 0; i <= self._getOps('size').cols - 1; i++) {
                // Determine if we should include the column number in the cell and render cell value
                var cellValue = (self._getOps('footer').includeCellNum) ? self._getOps('footer').cellValue + i: self._getOps('footer').cellValue;
                $(footRow).append('<td/>').find('td').last().text(cellValue);
            }
        },
        _generateBody: function() {
            var self = methods,
                element = self._getOps('element'),
                tbody = $(element).append('<tbody/>');

            // Building a body with N rows and K columns
            for (i = 0; i <= self._getOps('size').rows - 1; i++) {
                var row = $(tbody).append('<tr/>').find('tr').last();
                for (j = 0; j <= self._getOps('size').cols - 1; j++) {
                    // Determine if we should include the row number in the cell and render cell value
                    var cellValue = (self._getOps('body').includeCellNum) ? self._getOps('body').cellValue + i: self._getOps('body').cellValue;
                    $(row).append('<td/>').find('td').last().text(cellValue);
                }
            }
        },
        destroy : function() {
            return this.each(function() {
                var $this = $(this),
                    data = $this.data('tablegen');

                // Namespacing FTW
                $this.empty();
                $this.removeData('tablegen');
            });

        }
    };

    $.fn.tablegen = function(method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || ! method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.tablegen');
        }

    };

})(jQuery);