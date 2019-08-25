$(function(){
  function buildMessage(message){
    image = ( message.image ) ? `<img class= "lower-message__image" src=${message.image} >` : "";
    var html = `<div class="message">
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
      $('.messages').append(html)
      $('#message_content').val('')
      $('.form__submit').prop('disabled', sfalse);
      ScrollToNewMessage();
    })
    .fail(function(){
      alert('error')
    })
  })
});