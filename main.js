
// Random Quote Generator
var url = "https://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=jsonp&lang=en&jsonp=?";
var quoteArray = [];
var singleQuote = [];
var quoteCount = null; // used to track number of quotes collected
var quoteIndex = null; // used to cycle through collected quotes
var tweetQuote = "";

$(document).ready(function() {
    $.getJSON(url, getQuote, 'jsonp');
    $("#previousQuote").click(getPreviousQuote);
    $("#nextQuote").click(getNextQuote);
    $("#tweetThis").click(tweetToTwitter);
});

var getQuote = function(data) {
    // Reset quoteNumber if used to cycle through previously collected quotes
    if (quoteIndex < quoteCount - 1) {
        quoteIndex = quoteCount - 1;
    }

    if ((!quoteIndex) && (!quoteCount)) {
        quoteIndex = 0;
        quoteCount = 1;
    } else {
        quoteIndex++;
        quoteCount++
    }
    $("#quote").text(data.quoteText);

    if (data.quoteAuthor === '') {
        data.quoteAuthor = 'Unknown';
    }
    $("#author").text("- " + data.quoteAuthor);

    tweetQuote = data.quoteText + " - " + data.quoteAuthor;
    singleQuote = [data.quoteText, data.quoteAuthor, quoteIndex];
    quoteArray.push(singleQuote);
};

$("#getQuote").click(function() {
    $.getJSON(url, getQuote, 'jsonp');
});

function getPreviousQuote() {

    // cycle to back of the list
    if (quoteIndex === 0) {
        quoteIndex = quoteCount - 1;
    } else {
        quoteIndex--;
    }

    $("#quote").text(quoteArray[quoteIndex][0]);
    $("#author").text(" - " + quoteArray[quoteIndex][1]);
    tweetQuote = quoteArray[quoteIndex][0] + " - " + quoteArray[quoteIndex][1];

};

function getNextQuote() {
    // cycle to front of the list
    if (quoteIndex === quoteCount - 1) {
        quoteIndex = 0;
    } else {
        quoteIndex++;
    }

    $("#quote").text(quoteArray[quoteIndex][0]);
    $("#author").text(" - " + quoteArray[quoteIndex][1]);
    tweetQuote = quoteArray[quoteIndex][0] + " - " + quoteArray[quoteIndex][1];
};

function tweetToTwitter() {
    var encodedPhrase = encodeURIComponent(tweetQuote);
    var url = "https://twitter.com/intent/tweet?text=" + encodedPhrase;
    window.open(url);
};



//TIME & DATE FUNCTION

function startTime() {
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    var ampm = "";
    m = checkTime(m);
    
     if (h > 12) {
    	h = h - 12;
    	ampm = " PM";
    } else if (h == 12){
        h = 12;
    	ampm = " AM";
    } else if (h < 12){
        ampm = " AM";
    } else {
        ampm = "PM";
    };
  
  if(h==0) {
    h=12;
  }

 document.getElementById('display').innerHTML = h+":"+m+ampm;
    var t = setTimeout(function(){startTime()},500);
}

function checkTime(i) {
    if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}


//date
function startDate() {
  var d = new Date();
  var days = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
  document.getElementById("date").innerHTML = days[d.getDay()]+" | "+d.getDate()+"/"+[d.getMonth()+1]+"/"+d.getFullYear();
}


//Full API LINK, before jsonp added:

/*
http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en

*/