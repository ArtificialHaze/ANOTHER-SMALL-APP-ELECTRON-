const form = document.getElementById("form");
const youtubeChannelId = require("get-youtube-channel-id");
let channelId;
let result;
let id;
let user;
let username;
const API_KEY = "[GOOGLE_DEVELOPER_CONSOLE_YOUTUBE_API]";

process.env.NODE_ENV = "development";

form.addEventListener("submit", function (event) {
  event.preventDefault();
  channelId = document.getElementById("channelId").value;
  result = youtubeChannelId(channelId);

  result.then(function (data) {
    if (!data.username) {
      id = data.id;
      getData(id);
    } else {
      username = data.username;
      convertUsernameToId(username);
    }
  });
});

function convertUsernameToId(username) {
  const url = "[GOOGLEAPIS_YOUTUBE_V3_API]" + API_KEY + username;

  $.get(url, function (data) {
    id = data.items[0].id;
    getData(id);
  });
}

function clearFields() {
  $("#channelId").val("");
  $("#result").empty();
}

function getData(id) {
  clearFields();
  const url = "[GOOGLEAPIS_YOUTUBE_V3_API]" + API_KEY + id;
  $.get(url, function (data) {
    user = `
    <h2>${data.items[0].snippet.title}</h2>
    <img class="img-circle" src="${data.items[0].snippet.thumbnails.default.url}"/>
    </br>
    </br>
    <h2>Subscribers: <span>${data.items[0].statistics.subscriberCount}</span></h2>
    </br>
    <h2>Views: ${data.items[0].statistics.viewCount}</h2>
    </br>
    <h2>Videos: ${data.items[0].statistics.videoCount}</h2>
    `;
    $("#result").html(user);
  });
}
