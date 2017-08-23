// $(document).ready(function(){
//
//     $(".div_1").mCustomScrollbar({
//         scrollButtons:{
//             enable:true
//         },
//         theme:"dark"
//     });
//
//     $(".bao_zi").raty();
// });
(function ($) {
    $(".div_1").mCustomScrollbar({
        scrollButtons: {
            enable: true
        },
        theme: "dark"
    });
    //用户的评分
    $(".bao_zi_1").raty({
        hints: ['1', '2', '3', '4', '5'],
        target: '.score1',
        targetKeep: true,

    });
    $(".bao_zi_2").raty({
        hints: ['1', '2', '3', '4', '5'],
        target: '.score',
        targetKeep: true,

    });
})(jQuery);