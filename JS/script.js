let colors = ["#45EBA5", "#FF6138", "#F56A47", "#FDB44B", "#005792",
    "#E7475E", "#248888", "#97124B", "#48466D", "#522546","#F38181",
    "#1FAB89", "#3A4750", "#12776F", "#513C3C", "#453246", "#84B9EF",
    "#883C82", "#B7569A", "#3B5F41","#66A96B"]

let apiAddress = "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1";
let xMashapeKey = "TpHygERAZymshRraqHWKqLmOfR3kp1kt7U2jsnyGIjhzHcKXSL";
let accept = "application/json"

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function changeColor() {

    $("body").get(0).style.setProperty("--main-color", colors[getRandomInt(colors.length)]);
    $("body").get(0).style.setProperty("transition", " 1s linear");
}




let quote = "";
let author = "";





function getQuote(){
    $.ajax({
        url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1',
        headers: {
            'X-Mashape-Key': xMashapeKey,
            Accept: accept,
        },
        method: 'GET',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'JSON',
        success: function (response) {
           
            quote = response.quote;
            author = response.author;
            
            quoteAndAuthorForTwitter = 'https://twitter.com/intent/tweet?hashtags=quotes,inspire&text=' + encodeURIComponent('"' + quote + '" ' + author)


            $("#tweet-quote").click(function(){
                window.open(quoteAndAuthorForTwitter, "_blank");
            });

            // Animates text and author name after quote has been loaded.
            $("#text").animate({
                opacity: 0
            }, 500,
                function () {
                    $(this).animate({
                        opacity: 1
                    }, 500);
                    $('#text').text(response.quote);
                });

            $("#author").animate({
                opacity: 0
            }, 500,
                function () {
                    $(this).animate({
                        opacity: 1
                    }, 500);
                    $('#author').html(response.author);
                });
            // Animate text and author ends here.

            //Changes background color when quote fetched.
            changeColor();
            

        }
    });

}



$(document).ready(function () {
    getQuote();
   
    $("#quoteMeButton").on("click",getQuote);
    $("#quoteMeButton").on("click", changeColor);
   


    
});
