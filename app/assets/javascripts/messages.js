$(document).on('turbolinks:load', function() {
$(function(){
  function buildMessage(message){
    image = (message.image) ? `<img class= "lower-message__image" src=${message.image} >` : "";
    var html = `<div class="message" data-message-id="${message.id}">
                <div class="upper-message">
                <div class="upper-message__user-name">
                ${message.user_name}
                </div>
                <div class="upper-message__date">
                ${message.created_at}
                </div>
                </div>
                <div class="lower-message">
                <p class="lower-message__content">
                ${message.content}
                </p>
                </div>
                ${image}
                </div>`
    return html;
  }

  function ScrollToNewMessage(){
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
  }

  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $('.messages').append(html);
      $('.inner_form')[0].reset();
      $('.form__submit').prop('disabled', false);
      ScrollToNewMessage();
    })
    .fail(function(){
      alert('メッセージを入力して下さい');
      $('.form__submit').prop('disabled', false);
    })
  })

  var reloadMessages = function() {
    group_id = $('.left-header__title').attr('data-group-id');
    last_message_id = $('.message:last').attr('data-message-id');
    $.ajax({
      url: `/groups/${group_id}/api/messages`,
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {

      if (messages.length !== 0){
      messages.forEach(function(message){
      var html = buildMessage(message);
      $('.messages').append(html);
      ScrollToNewMessage();
      });
      }
    })

    .fail(function() {
      alert('reload error');
    });
  };
  if (window.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 5000);
  }
});
});