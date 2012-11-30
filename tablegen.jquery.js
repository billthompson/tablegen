(function($) {
    /**
     * @name tablegen
     * @author Bill Thompson
     * @url https://github.com/billthompson/tablegen
     * @description Quickly prototype tabular data of varying sizes.
     * @license MIT
     */

    var methods = {
        options: {
            size: {rows: 10, cols: 10}
        },
        init : function(userops) {
            var self = methods;

            $.extend(true, methods.options, {element: this}, userops);

            return this.each(function() {

                var $this = $(this)
                    , data = $this.data('tablegen');

                // If the plugin hasn't been initialized yet
                if (! data) {
                    $(this).data('tablegen', methods.options);
                }

                self._generate();
            });
        },
        _getOps : function(opt) {
            // Let's always get the options from the element data (not the options object)
            var $this = $(methods.options.element)
                , data = $this.data('tablegen');

            // If we are looking for a specific option, let's provide a shortcut
            if (opt != null) {
                data = data[opt];
            }

            return data;
        },
        _generate: function() {
            var $element = methods._getOps('element')
                , rows = methods._getOps('size').rows
                , columns = methods._getOps('size').cols
                , fragment = document.createDocumentFragment().appendChild(document.createElement('table'));

            // Create the table header
            fragment.appendChild(methods._generateTableSection({ type: 'thead'
                                                                 , cellTag: 'th'
                                                                 , rowStartIndex: 1
                                                                 , rowsToGenerate: 1
                                                                 , columns: columns }));
            // Create the table footer
            fragment.appendChild(methods._generateTableSection({ type: 'tfoot'
                                                                 , cellTag: 'td'
                                                                 , rowStartIndex: rows
                                                                 , rowsToGenerate: 1
                                                                 , columns: columns }));
            // Create the table body
            fragment.appendChild(methods._generateTableSection({ type: 'tbody'
                                                                 , cellTag: 'td'
                                                                 , rowStartIndex: 2
                                                                 , rowsToGenerate: rows - 2
                                                                 , columns: columns }));
            // Append the table to the DOM
            $element[0].appendChild(fragment);
        },
        /**
         * Create a table section ('thead', 'tfoot', 'tbody'). Responsible 
         * for getting its subsections as well.
         *
         * Takes a sectionOptions object to prevent costly data look ups 
         * for each row and column.
         */
        _generateTableSection: function(sectionOptions) {
            var section = document.createElement(sectionOptions.type)
                , fragment = document.createDocumentFragment()
                , currentRowIndex = sectionOptions.rowStartIndex;

            // Generate n rows and append them to the section
            for (var i = 0; i < sectionOptions.rowsToGenerate; i++) {
                fragment.appendChild(methods._generateRow(sectionOptions, currentRowIndex));

                currentRowIndex++;
            }

            section.appendChild(fragment);

            return section;
        },
        /**
         * Responsible for generating a table row of 'th' or  'td'
         * children.
         */
        _generateRow: function(sectionOptions, rowIndex) {
            var row = document.createElement('tr')
                , fragment = document.createDocumentFragment();
            
            // Building a row with n columns. Using 1 based index for output.
            for (var i = 1; i <= sectionOptions.columns; i++) {
                var cellContainer = document.createElement(sectionOptions.cellTag)
                    , cell = document.createTextNode(['R', rowIndex, '-C', i].join(''));

                cellContainer.appendChild(cell);
                fragment.appendChild(cellContainer);
            }

            row.appendChild(fragment);

            return row;
        },
        /**
         * Completely remove tablegen's existence.
         */
        destroy : function() {
            return this.each(function() {
                var $this = $(this)
                    , data = $this.data('tablegen');

                // Empty the table and remove it's data
                $this.empty();
                $this.removeData('tablegen');
            });
        }
    };

    $.fn.tablegen = function(method) {
        // http://docs.jquery.com/Plugins/Authoring#Plugin_Methods
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || ! method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.tablegen');
        }
    };
})(jQuery);