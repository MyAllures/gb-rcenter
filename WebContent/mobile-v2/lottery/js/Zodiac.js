define([], function() {
    var zodiac = ["猴","鸡","狗","猪","鼠","牛","虎","兔","龙","蛇","马","羊"];
    return function (age) {
        return zodiac[age%12];
    };
});