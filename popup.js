/* SpoilerAlert Chrome Extension by Javi Caballero. All rights reserved. */

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
        }/*,
        {
            "name": "The Walking Dead",
            "day": -1,
            "watch": true
        }*/
    ]
};

var config = defaultConfig;

document.addEventListener('DOMContentLoaded', function() {
   
    document.getElementById("saveConfig").onclick = function(){
        saveConfig();
    }

    chrome.storage.local.get("spoilerAlertConfig", function(data){
        if(data.spoilerAlertConfig){
            config = data.spoilerAlertConfig;
            console.log("Sync", config);
        }
        else console.log("UnSync", config);
        for (var i=0; i< config.series.length; i++) {
            var serie = config.series[i];
            document.getElementById("seriesList").innerHTML += 
            '<div class="serieCheckbox">'+
            '<label for="'+ serie.name + '">'+ serie.name + '</label>'+
            '<input class="serieInput" type="checkbox" name="'+ serie.name + '"'
            + ' value='+ i
            + (serie.watch? ' checked>' : '>')
            + '</div>';
        }
    });


});

function saveConfig(){
    var list = document.getElementsByClassName("serieInput");
    for (var i=0; i< list.length; i++) {
        var input = list[i];
        config.series[input.value].watch = input.checked;
    }
    chrome.storage.local.set({ "spoilerAlertConfig": config }, function(){
        console.log("Synced", config)
    });
}