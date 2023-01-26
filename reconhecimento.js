if ("webkitSpeechRecognition" in window){
    var recognition = new webkitSpeechRecognition();
    recognition.lang = "pt-BR";


    recognition.continuous = true;
    
    recognition.interimResults = true;

    var startButton = document.getElementById("start-button");
    var stopButton = document.getElementById("stopButton");
    var output = document.getElementsByClassName("output")[0];

    if(startButton){
        startButton.addEventListener('click', function(){
            recognition.start();
            startButton.disabled = true;
            stopButton.disabled = false;
        });
    }

    if (stopButton) {
        stopButton.addEventListener('click', function() {
            recognition.stop();
            startButton.disabled = false;
            stopButton.disabled = true;
            //stopButton.classList.add("disabled");
        });
    }

    recognition.onresult = function(event){
        var transcript = "";

        for(var i = event.resultIndex; i < event.results.length; i++){
            transcript += event.results[i][0].transcript;
        }

        output.innerHTML = transcript;
    }

    recognition.onerror = function(event){
        console.log('ERROR: ', event.error);
    };

} else {
    console.log("Seu navegador não suporta a Web Speech API")
}
