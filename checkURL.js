//Default config
var defaultConfig = {
    "pages": [
        "twitter.com",
        "facebook.com",
        "youtube.com"
    ],

    "series": [
        {
            "name": "Game of Thrones",
            "day": 1,
            "watch": true
        },
        {
            "name": "The Walking Dead",
            "day": -1,
            "watch": true
        }
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
    alert(msg);
}