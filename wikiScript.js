function wiki(data) {
    var obj = data.query.pages;
    var HTMLnodes = "";
    // build up the results
    $.map(obj, function(v, i) {

        HTMLnodes += "<div id='wikiDiv'><a href='https://en.wikipedia.org/wiki/" +
            v.title + "' target='_blank'><h2 id='wikiTitle'>" + v.title +
            "</h2>" + "</a><h4 id='wikiExtract'>" +
            v.extract + "</h4></div>";
    })
    $wikiContent = $("#wikiContent");
    //remove old search results//add new results
    $wikiContent.empty().append(HTMLnodes);
}
//function pre(event){event.preventDefault();}//this is prevent refreshing if use onsubmit="loadData()" inside of form tag in html;
function loadData() {
    var wikiUrl = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max&callback=?&gsrsearch="
    var value = $("input").val();
    /*bad practice since append one by one, should only append once!
    $.getJSON(wikiUrl+value, function(data){
        var obj=data.query.pages;
        $("#wikiContent").text(""); //or $("#wikiContent").empty();
        $.map(obj,function(v,i){
          $("#wikiContent").append("<div id='wikiDiv'><a href='https://en.wikipedia.org/wiki/"
          +v.title+"' target='_blank'><h2 id='wikiTitle'>"+v.title+
          "</h2>"+"</a><h4 id='wikiExtract'>"
          +v.extract+"</h4></div>")})})}*/
    $.getJSON(wikiUrl + value, wiki);
    //pre(event);//this is prevent refreshing if use onsubmit="loadData()" inside of form tag in html;//console.log(event);//since parameter e is not defined, cannot use pre(e);
}
$("#wikiSearch").on("input", loadData); //when type letter, then shows search result same time;//replace oninput="loadData()"in input tag;
$("#form-container").on("submit", function(e) { // replace pre(e); function pre(e){e.preventDefault();};
    e.preventDefault(); //replace onsubmit="return false" in form tag;
    //loadData();
})

/*$.getJSON(wikiUrl+value, function(data){
        var obj=data.query.pages;
        var HTMLnodes = "";
        // build up the results
        $.map(obj,function(v,i){
          HTMLnodes+="<div id='wikiDiv'><a href='https://en.wikipedia.org/wiki/"
          +v.title+"' target='_blank'><h2 id='wikiTitle'>"+v.title+
          "</h2>"+"</a><h4 id='wikiExtract'>"
          +v.extract+"</h4></div>";
    })
     //remove old search results
     $("#wikiContent").empty();
            //add new results
            $("#wikiContent").append(HTMLnodes);
    })
}/*
//$("#wikiSearch").on("input", loadData);//or use $.keyup(); or change();
//$("#form-container").submit(loadData);
//$("#form-container").submit(function (event) {event.preventDefault();
    // prevents default browser submission
    // the rest of your code goes here});//prevent reloading ajax call of form submit;

/*
// using keypress with input tag equal to submit with form tag;
$("#wikiSearch").keypress(function(event){
if(event.keyCode===13){
   event.preventDefault();
    loadData();
}
})
// get sorted json index number
var obj=a.query.pages;
var pages = [];
var titles = [];
for(var prop in obj){
	pages.push(prop);
}
console.log(pages);
pages.sort( function( x, y ) {return obj[x].index-obj[y].index;});
console.log(pages);
pages.forEach(function(x){
	titles.push(obj[x].title);
});
console.log(titles);
*/
/*//fontawsome search icon;
 <form id="form-container" onsubmit="return false">
<div class="input-group">
  <span  class="input-group-addon" class="form-control-feedback">
        <i class="fa fa-search"></i>
    </span>
         <input class="form-control" type="search" id="wikiSearch" value="" placeholder="Search..." oninput="loadData()">
        </div>
         <br>
         <br>
         <br>
         <a href="https://en.wikipedia.org/wiki/Special:Random" class="btn btn-primary" target="_black">Random Wikipedia</a>
      </form>
*/
