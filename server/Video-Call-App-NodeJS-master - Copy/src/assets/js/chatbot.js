$(document).ready(function() {
    var currDomain = 'http://localhost:3000'
    $(".chatbox").on('click', function() {
        $(".chatbox").css("display","none");
        $(".chat-container").show(300);
        $('body').css('overflow-y','hidden');
    });
    $(".close-btn").click(function(){
        $(".chat-container").hide(100);
        $(".chatbox").show(500);
        $('body').css('overflow-y','visible');
    });
    function getBotResponse() {
        var rawText = $(".publisher-input").val();
        if(rawText==="") {
            return;
        }
        var userQuery = '<div class="media media-chat media-chat-reverse"> <div class="media-body"> <p> '+ rawText +' </p> </div> </div>'
        $(".publisher-input").val("");
        $(".chat-container > .chat-window > .chat-content > .chat").append(userQuery);
        $(".chat-container > .chat-window > .chat-footer > .publisher")[0].scrollIntoView({block: 'start', behavior: 'smooth'});
        $.post(currDomain+"/chatbot/getResponse", { note: rawText }).done(function(data) {
            var botQuery = '<div class="media media-chat"> <img class="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..."> <div class="media-body"> <p>' + data + '</p> </div> </div>';
            $(".chat-container > .chat-window > .chat-content > .chat").append(botQuery);
            $(".chat-container > .chat-window > .chat-footer > .publisher")[0].scrollIntoView({block: 'start', behavior: 'smooth'});
            $('.chat-container > .chat-window > .chat-content').animate({scrollTop : $('.chat-container > .chat-window > .chat-content').get(0).scrollHeight}, '300');
        });
    }
    $('.text-info').click(function() {
        getBotResponse();
    });
    $('.publisher-input').keypress(function(e) {
        if(e.which == 13) {
            getBotResponse();
        }
    });
})