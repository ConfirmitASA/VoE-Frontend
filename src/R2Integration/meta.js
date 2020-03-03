//meta-creator, pass array of arrays [['paramName', 'paramValue']]
function addMeta(ap){if(Array.isArray(ap)){ap.forEach(function(p){if(p && typeof p==='object'){var m=document.createElement('meta');for(var k in p){m.setAttribute(k, p[k])} document.head.appendChild(m)}})}}

//make reportal a web-app via  tags
addMeta([
    {name:'viewport', content:'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'},
    {name:'theme-color', content:'#484f59'}, //Chrome for Android theme color
    {name:'msapplication-TileColor', content:'#efefef'}, //Tile color for Win8
    //Add to homescreen for Chrome on Android
    {name:'mobile-web-app-capable',content:'yes'},
    {name:'application-name', content:'Two Steps and an Action'},
    //Add to homescreen for Safari on iOS
    {name:'apple-mobile-web-app-capable', content:'yes'},
    {name:'apple-mobile-web-app-status-bar-style', content:'#484f59'},
    {name:'apple-mobile-web-app-title', content:'Two Steps and an Action'}
]);