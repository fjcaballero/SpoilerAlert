//Default config
var defaultConfig = {
    "pages": [
        "twitter.com",
        "facebook.com",
        "youtube.com"
    ],

    "series": [
        {
            "name": "Juego de Tronos",
            "day": 1,
            "watch": true
        }/*,
        {
            "name": "The Walking Dead",
            "day": -1,
            "watch": true
        }*/
    ]
};

var url = window.location.href;
var config = defaultConfig;
chrome.storage.local.get("spoilerAlertConfig", function(data){
    if(data.spoilerAlertConfig){
        config = data.spoilerAlertConfig;
        console.log("Sync", config);
    }
    checkURL(url);
});

function checkURL(url){
    for (var i=0; i< config.pages.length; i++) {
        var page = config.pages[i];
        if(url.includes(page)){
            checkSeries(page);
            return;
        }
    }
}

function checkSeries(page){
    var day = new Date().getDay();
    for (var i=0; i< config.series.length; i++) {
        var serie = config.series[i];
        if(serie.watch && serie.day === day){
            block(page, serie);
            return;
        }
    }
}

function block(page, serie){
    var msg = "Hoy se ha estrenado un capítulo de " + serie.name 
    + '\n'+ "¿Seguro que quiere visitar " + page + "?";
    //alert(msg);
    createPopUp(msg);
}

function createPopUp(msg){
    var darkBody = document.getElementsByTagName("body")[0].appendChild(document.createElement("div"));
    darkBody.className = "darkBody";
    
    var div = document.getElementsByTagName("body")[0].appendChild(document.createElement("div"));
    div.id = "spoilerAlert";
    div.className = "customAlert";

    var header = div.appendChild(document.createElement("div"));
    header.className = "spoilerAlertHeader";
    header.innerText = "Spoiler Alert!!";

    var content = div.appendChild(document.createElement("div"));
    content.className = "spoilerAlertContent";
    content.innerText = msg;

    var acceptBtn = div.appendChild(document.createElement("button"));
    acceptBtn.className = "spoilerAlertButton";
    acceptBtn.innerText = "Continuar";
    acceptBtn.onclick = function(){
        document.getElementsByTagName("body")[0].removeChild(div);
        document.getElementsByTagName("body")[0].removeChild(darkBody);
    }

    var cancelBtn = div.appendChild(document.createElement("button"));
    cancelBtn.className = "spoilerAlertButton";
    cancelBtn.innerText = "Volver";
    cancelBtn.onclick = function(){
        window.history.back();
    }

}