(function($) {

    /**
     * Counter Clock Face
     *
     * This class will generate a generice flip counter. The timer has been
     * disabled. clock.increment() and clock.decrement() have been added.
     *
     * @param  object  The parent FlipClock.Factory object
     * @param  object  An object of properties to override the default  
     */

    FlipClock.CashFace = FlipClock.Face.extend({

        /**
         * Tells the counter clock face if it should auto-increment
         */

    	autoStart: false,

        /**
         * Constructor
         *
         * @param  object  The parent FlipClock.Factory object
         * @param  object  An object of properties to override the default  
         */

        constructor: function(factory, options) {
			factory.timer.interval = 0;
			factory.autoStart 	   = false;
			factory.running  	   = true;

			factory.increment = function() {
				factory.countdown = false;
				factory.setTime(factory.getTime().time + 1);
				
			};

            factory.decrement = function() {
                factory.countdown = true;
				factory.setTime(factory.getTime().time - 1);
            };

            factory.setValue = function(digits) {
                factory.setTime(digits);
            };

            factory.setCounter = function(digits) {
                factory.setTime(digits);
            };

            this.base(factory, options);
        },

        /**
         * Build the clock face 
         */

        build: function() {
            var t        = this;
			var children = this.factory.$wrapper.find('ul');
			var lists    = [];
            var time     = this.factory.getTime().digitize([this.factory.getTime().time]);

			if(time.length > children.length) {
				$.each(time, function(i, digit) {
					var list = t.createList(digit);

					list.select(digit);
					lists.push(list);
				});
			
			}

			$.each(lists, function(i, list) {
				list.play();
			});

			this.factory.lists = lists;

            if ( time.length > 3 ) {
                this.createDivider();
                $(this.dividers[0]).insertBefore(this.factory.lists[this.factory.lists.length - 3].$obj);

                if ( time.length > 6 ) {
                    this.createDivider();
                    $(this.dividers[1]).insertBefore(this.factory.lists[this.factory.lists.length - 6].$obj);

                    if ( time.length > 9 ) {
                        this.createDivider();
                        $(this.dividers[2]).insertBefore(this.factory.lists[this.factory.lists.length - 9].$obj);

                        if ( time.length > 12 ) {
                            this.createDivider();
                            $(this.dividers[3]).insertBefore(this.factory.lists[this.factory.lists.length - 12].$obj);
                        }
                    }
                }
            }

            this.base();
        },

        createDivider: function(label, css, excludeDots) {
            if(typeof css == "boolean" || !css) {
                excludeDots = css;
                css = label;
            }

            var dots = [
                '<span class="'+this.factory.classes.dot+' comma">,</span>'
            ].join('');

            if(excludeDots) {
                dots = '';  
            }

            label = this.factory.localize(label);

            var html = [
                '<span class="'+this.factory.classes.divider+' '+(css ? css : '').toLowerCase()+'">',
                    dots,
                '</span>'
            ];  

            var $html = $(html.join(''));

            this.dividers.push($html);

            return $html;
        },

        /**
         * Flip the clock face
         */

		flip: function(doNotAddPlayClass) {
			var time = this.factory.getTime().digitize([this.factory.getTime().time]);

			this.base(time, doNotAddPlayClass);
		},
    });

}(jQuery));