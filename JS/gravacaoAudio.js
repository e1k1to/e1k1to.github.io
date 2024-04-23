let mediaRecorder;
let audioChunks = [];

const myButton = document.getElementById('recordButton');
const recordLabel = document.getElementById('recordLabel');

navigator.mediaDevices.getUserMedia({ audio: true })
  .then(function(stream) {
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = function(e) {
      audioChunks.push(e.data);
    };

    mediaRecorder.onstop = function() {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      document.getElementById('audioPlayer').src = audioUrl;
    };
  });



myButton.addEventListener('click', function() {

  if(mediaRecorder.state == 'inactive') {
    audioChunks = [];
    mediaRecorder.start();
    recordLabel.textContent = "Gravando...";
  } else if (mediaRecorder.state == 'recording') {
    mediaRecorder.stop();
    recordLabel.textContent = "Escute o que você gravou:";
  }

});

