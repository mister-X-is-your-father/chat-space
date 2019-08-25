$(function() {

  var search_list = $("#user-search-result");
  var member_list = $(".chat-group-user");

  function appendUser(user){
    var html = `
                <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add js-add-btn" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
                </div>`;
      search_list.append(html);
  }


//未実装
  function appendNoUser(user){
    var html = `いません`;
      search_list.append(html);
  }

  function addUser(user_id, user_name) {
    console.log(user_id);
    var html = `
              <div class="chat-group-user clearfix js-chat-member" id=${user_id}>
              <input value="22" name="group[user_ids][]" type="hidden" id="group_user_ids">
              <p class="chat-group-user__name">${user_name}</p>
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
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendNoUser("一致するユーザはいません");//未実装
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
    // var user_id = $('select').val();
  });
  });