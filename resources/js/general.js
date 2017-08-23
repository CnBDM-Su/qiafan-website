/**
 * Created by jessy on 06/28/17.
 */
/*
$(function () {
    $("#head_nav").find("li").each(function () {
        var a = $(this).find("a:first")[0];
        if ($(a).attr("href") === location.pathname) {
            $(this).addClass("active");
        } else {
            $(this).removeClass("active");
        }
    });
})
*/

$(function () {
    var head = $("#head").height();
    var foot = $("#foot").height();
    var body = $(document).height()-head-foot;
    $("#body").css({"min-height":body+"px"});
    $("#back_to_top").css({"bottom":"10px"});

})


