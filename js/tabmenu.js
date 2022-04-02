var num;
$('.tot_board .tabmenu > li').on('click', function () {
    $(this).addClass('active')
        .siblings().removeClass('active')
    num = $(this).index()
    $(this).parent().next().children()
        .eq(num).addClass('active')
        .siblings().removeClass('active')
})

