document.addEventListener('turbolinks:load', function(){
$(function() {

  var search_list = $("#user-search-result");
  var member_list = $(".member-name");

  function appendUser(user){
    var html = `
                <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add js-add-btn" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
                </div>`;
      search_list.append(html);
  }


  function appendNoUser(user){
    var html = user;
      search_list.append(html);
  }

  function addUser(user_id, user_name) {
    var html = `
              <div class='chat-group-user'>
              <input name='group[user_ids][]' type='hidden' value='${user_id}'>
              <p class='chat-group-user__name'>${user_name}</p>
              <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
              </div>
              `;
    member_list.append(html);
    }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      $("#user-search-result").empty();
      console.log($("#user-search-field").val());
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
          if ($("#user-search-field").val() === "") {
            search_list.children().remove();
          }
          // console.log($("#user-search-field").val())
        });
      }
      else {
        appendNoUser("一致するユーザーが見つかりません");
      }
    })
    .fail(function(){
      alert('検索に失敗しました');
    })
  });

  $(document).on("click",'.user-search-add', function(){
    var user_id =  $(this).attr('data-user-id');
    var user_name =  $(this).attr('data-user-name');
    addUser(user_id,user_name)
    $(this).parent().remove();
  });

  $(document).on("click",'.js-remove-btn', function(){
    $(this).parent().remove();
  });

  });
});