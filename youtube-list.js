(function() {
  'use strict';

  class youtubeList extends HTMLElement {
    constructor() {
      super();
      this._maxResult = 5;
      this._CID = 'UCK2ACorzpH-igxuHZ2ObCEA';
      this.API_Key = '';
    }

    connectedCallback() {
      this.innerHTML =
      `
      <div id="frame"></div>
      `;
      let frame = this.querySelector("#frame");
      let _url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${this._CID}&maxResults=${this._maxResult}&order=date&key=${this.API_Key}`;

      fetch(_url)
        .then((resp) => resp.json())
        .then(function(data) {
          data.items.forEach(item => {
            let container = document.createElement('div');
            let videoID = item.id.videoId;
            container.id = "container";
            container.innerHTML =
              `<section id="content">
                <div class="image">
                  <img id="image" src="">
                </div>
                <div class="content-D">
                  <div class="word title">
                  </div>
                </div>
              </section>`;
            let newContainer = container.cloneNode(true);
            frame.appendChild(newContainer);
            newContainer.querySelector("#image").src = item.snippet.thumbnails.default.url;
            newContainer.querySelector(".title").innerHTML = item.snippet.title;
            newContainer.addEventListener("click", e => {
                window.open(`https://www.youtube.com/watch?v=${videoID}`, '_blank');
            });
          });
        })
        .catch(function(error) {
          console.log(error);
        });
      }
  };

  customElements.define('youtube-list', youtubeList);
}());
