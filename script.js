var player 					  = document.getElementById('player');
var playlistThumb 		= document.getElementById('playlistThumb');

var apiUrl 			= 'https://www.googleapis.com/youtube/v3/playlistItems';
var apiKey	 		= 'AIzaSyCiKn-vfXkIJAdp64jumGhM2Ypjxib7kCs';
var playlistId 	= 'PL9HrwmU6gBjNPcei2oKPZgI9bU57EvFQU';

getPlaylistData(playlistId, apiUrl, apiKey);

// Makes a single request to Youtube Data API
function getPlaylistData(playlistId, apiUrl, apiKey) {  
  var options = {
    part: "snippet",
    playlistId: playlistId,
    key: apiKey,
    maxResults: 25
  };
  var defautVideoIndex = 0;
  
  $.getJSON(apiUrl, options, function(response) {
    var item = response.items[defautVideoIndex];
    var medium = item.snippet.thumbnails.medium;
    var videoId = item.snippet.resourceId.videoId;
    
    player.innerHTML = '<iframe id="iframe-player" data-id="' + videoId + '" width="100%" height="100%" src="//www.youtube.com/embed/' + videoId + '?rel=0;enablejsapi=1&version=3&playerapiid=ytplayer1" frameborder="0" sandbox="allow-scripts allow-same-origin allow-presentation"></iframe>';
    
    for (var i = 0; i < response.items.length; i++) {
          item = response.items[i];
          medium = item.snippet.thumbnails.medium;
          videoId = item.snippet.resourceId.videoId;
    	$(playlistThumb).append(
      	'<li id="video-icon" data-vid="'+ videoId +'"><img src="'+ medium.url +'" width="'+ medium.width +'" height="'+ medium.height +'" />'+
          '<button class="ytp-large-play-button ytp-button" aria-label="Play">'+
						'<svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">'+
              '<path class="ytp-md-pay-btn" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#212121" fill-opacity="0.8"></path>'+
              '<path d="M 43,24 30,17 30,31" fill="#FFF"></path>'+
        		'</svg>'+
         	'</button>'+
         '</li>'
       );
    }
    $(document).on('click', '[data-vid]', function() {
        
 		   	videoId = this.dataset.vid;
        if (!videoId) return;
        var iframe = document.getElementById('iframe-player');
        if (!iframe) return;
        if (iframe.dataset.id === videoId) return;
         player.innerHTML = '<iframe id="iframe-player" data-id="' + videoId + '" width="100%" height="100%" onload="playYtpVideo()" src="https://www.youtube.com/embed/' + videoId + '?rel=0;enablejsapi=1&version=3&playerapiid=ytplayer1" frameborder="0" sandbox="allow-scripts allow-same-origin allow-presentation"></iframe>';
        $(player).append('<div class="save_spinner"></div>');
    });

	});
}


function playYtpVideo() {
  var iframe = document.getElementById('iframe-player');
  var spinner = document.querySelector('.save_spinner');
  spinner.remove();
  iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
}