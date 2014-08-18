/*
 * Halflife - a jQuery countdown timer
 * @author: Jubal Mabaquiao
 * @created: Aug 17, 2014
 * @licence: MIT
 * @description: A simple countdown timer plugin for jQuery
 * @usage:
 *   Simply declare the class names to use for each time part
 *   you need to render the timer.
 *
 */

;(function ($, window, document, undefined) {

    var Halflife = function (elem, options) {
        this.$selector = this.selector;
        this.elem = elem;
        this.$elem = $(elem);
        this.options = options;
    };

    Halflife.prototype = {
        defaults: {
            startDate   : null,
            endDate     : null,
            twoDigits   : true,
            useBem      : true,
            daysClass   : '__days',
            hoursClass  : '__hours',
            minutesClass: '__minutes',
            secondsClass: '__seconds'
        },

        init: function () {

            var _this = this;

            this.config = $.extend({}, this.defaults, this.options);

            if(this.config.useBem) {
                this.$days = this.$elem.find('[class$=' + this.config.daysClass + ']');
                this.$hours = this.$elem.find('[class$=' + this.config.hoursClass + ']');
                this.$minutes = this.$elem.find('[class$=' + this.config.minutesClass + ']');
                this.$seconds = this.$elem.find('[class$=' + this.config.secondsClass + ']');
            }

            else {
                this.$days = this.$elem.find(this.config.daysClass);
                this.$hours = this.$elem.find(this.config.hoursClass);
                this.$minutes = this.$elem.find(this.config.minutesClass);
                this.$seconds = this.$elem.find(this.config.secondsClass);
            }

            setInterval(function() {
                _this.render();
            }, 1000);

            return this;

        },

        difference: function (part) {
            // TODO: ability to customize start date
            var startDate = new Date(),
                endDate = new Date(this.config.endDate),
                delta = Math.abs(endDate - startDate) / 1000;

            var days = Math.floor(delta / 86400);
            delta -= days * 86400;

            var hours = Math.floor(delta / 3600) % 24;
            delta -= hours * 3600;

            var minutes = Math.floor(delta / 60) % 60;
            delta -= minutes * 60;

            var seconds = delta % 60;

            var timePart = {
                d: days,
                h: hours,
                m: minutes,
                s: seconds
            };

            return !this.config.twoDigits
                ? Math.floor(timePart[part])
                : makeTwoDigits(Math.floor(timePart[part]));

            function makeTwoDigits(d) {
                return (d < 10) ? '0' + d.toString() : d.toString();
            }

        },

        render: function () {

            if(!this.config.endDate) {
                if(!this.nowarn) {
                    console.log('Halflife: no end date set');
                    this.nowarn = true;
                }
                return;
            }

            this.$days.html(this.difference('d'));
            this.$hours.html(this.difference('h'));
            this.$minutes.html(this.difference('m'));
            this.$seconds.html(this.difference('s'));

        }
    };

    Halflife.defaults = Halflife.prototype.defaults;

    $.fn.halflife = function (options) {
        return this.each(function () {
            new Halflife(this, options).init();
        });
    };

    // optional: window.Halflife = Halflife;

})(jQuery, window, document);