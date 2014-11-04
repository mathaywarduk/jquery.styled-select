(function ($) {

    var StyledSelect = function(el, opts) {
        var $element = this.$element = $(el),
            $list = this.$list = $("<ul/>")
            $toggle = this.$toggle,
            this.options = new Array();

        this.opts = opts;
        this.init();
    }

    StyledSelect.prototype = {
        constructor: StyledSelect,
        init: function() {
            this.bind();
        },
        bind: function() {
            var _self = this;

            // get values from data-attributes
            this.getAttributes();

            // get options with values
            this.getOptions();

            // create toggle element
            this.createToggle();

            // create list
            this.createList();

            // check for preselected value
            this.checkValue();

            // hide list and original select
            this.$list.hide();
            this.$element.hide();
        },
        getAttributes: function() {
            this.opts.classPrefix = this.$element.attr("data-ssel-class") ? this.$element.attr("data-ssel-class") : this.opts.classPrefix;
            this.opts.toggleText = this.$element.attr("data-ssel-toggletext") ? this.$element.attr("data-ssel-toggletext") : this.opts.toggleText;
        },
        getOptions: function() {
            var _self = this;

            this.$element.children().each (function() {
                if (typeof($(this).attr("value")) != 'undefined') {

                    var obj = {
                        value: $(this).attr("value"),
                        text: $(this).text()
                    }
                    _self.options.push(obj);
                }
            });
        },
        createToggle: function() {
            var _self = this;

            this.$toggle = $("<a/>").attr("href", "#").addClass(this.opts.classPrefix + "toggle").text(this.opts.toggleText);
            this.$element.after(this.$toggle);

            this.$toggle.on('click', function(e) {
                e.preventDefault();
                _self.$list.toggle();
                $(this).toggleClass("active");
            });
        },
        createList: function() {
            var _self = this;

            $.each( this.options, function(index, obj) {
                var item = $("<li/>").append($("<a/>").attr("href", obj.value).text(obj.text));
                _self.$list.append(item);
            });

            this.$list.addClass(this.opts.classPrefix + "options");
            this.$toggle.after(this.$list);

            $("." + this.opts.classPrefix + "options a").on('click', function(e) {
                e.preventDefault();
                _self.$element.val($(this).attr("href"));
                _self.$toggle.text($(this).text()).addClass(_self.opts.classPrefix + "toggle--selected").removeClass("active");
                _self.$list.hide();
            });
        },
        checkValue: function() {
            var $selected = this.$element.children("[selected]");
            if ($selected.length) {
                this.$toggle.text($selected.text());
            }
        }
    }

    $.fn.styledselect = function(option, param) {
        var opts;

        if (typeof option === 'object' && option) {
            opts = $.extend(true, {}, $.fn.styledselect.defaults, option);
        } else {
            opts = $.extend(true, {}, $.fn.styledselect.defaults);
        }
        return this.each(function() {
            var $this = $(this),
            // don't call again if already initialised on this object
            data = $this.data('styledselect');
            if(!data){
                $this.data('styledselect', data = new StyledSelect(this, opts));
            }
            // allow the calling of plugin methods on an instance by name, eg: $item.styledselect('bind')
            if (typeof option === 'string') {
                data[option](param);
            }
        });
    };

    $.fn.styledselect.defaults = {
        classPrefix: "styled-select__",
        toggleText: "Please select"
    };


    $(window).load( function() {
        $("[data-ssel]").each( function() {
            $(this).styledselect();
        });
    });


})(jQuery);
