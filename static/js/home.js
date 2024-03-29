export default $.fn.imgtransition = function (o) {
    var defaults = {
        speed: 5000,
        animate: 1000
    };
    o = $.extend(defaults, o);
    return this.each(function () {
        var arr_e = $("li", this);
        arr_e.css({ position: "absolute" });
        arr_e.parent().css({ margin: "0", padding: "0", "list-style": "none", overflow: "hidden" });
        function shownext() {
            var active = arr_e.filter(".active").length ? arr_e.filter(".active") : arr_e.first();
            var next = active.next().length ? active.next() : arr_e.first();
            active.css({ "z-index": 9 });
            next.css({ opacity: 0.0, "z-index": 10 }).addClass('active').animate({ opacity: 1.0 }, o.animate, function () {
                active.removeClass('active').css({ "z-index": 8 });
            });
        }
        arr_e.first().css({ "z-index": 9 }).addClass('active');
        setInterval(function () {
            shownext();
        }, o.speed);
    });
};	