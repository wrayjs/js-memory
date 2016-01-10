var $tableTarget = $(".table-target");
var $square = $("");
var colors = ["pink", "orange", "yellow", "green", "blue", "purple", "teal", "light-pink", "light-purple", "periwinkle"];
var icons = ["fort-awesome", "motorcycle", "leaf", "star", "heart", "tree", "coffee", "diamond", "sun-o", "cloud", "cubes", "eye"];
var clickCount = 0;
var turnCount = 0;
var x = 4;
var y = 4;

function removeFromArray(array, item){
  var index = array.indexOf(item);
  if (index > -1) {
    array.splice(index, 1);
  };
};

function randomFrom(array){
  return array[Math.floor(Math.random() * array.length)];
};

// This dynamically creates the board.
function renderTableHTML(x, y){
  var table = "";
  for(j = 1; j <= x; j++){
    var row = ("<div class='row row-" + j + "'>");
    var cells = function(){
      var column = "";
      for(i = 1; i <= y; i++){
          column = column + ("<div class='square col-xs-2 row-" + j + " column-" + i + "'><i class='fa fa-square-o fa-muted fa-5x'></i></div>");
        };
        return column;
      }();
      table = table + row + cells + "</div>";
    };
    $tableTarget.html(table);
  };

renderTableHTML( x, y );
$square = $(".square");

function randomColoredIcon(){
  var icon = randomFrom(icons);
  var color = randomFrom(colors);
  removeFromArray(icons, icon);
  return "<i class='icon fa fa-" + icon + " fa-4x fa-" + color + "'>"
};

var iconArray = function(){
  var array = [];
  for( var i = 0; i < (x*y/2); i++ ){
    array.push(randomColoredIcon());
  };
  array = $.merge(array, array)
  return array;
}();

function addRandomIcon(){
  var temp = randomFrom(iconArray);
  $(this).children().after(temp);
  $(this).find('.icon').hide();
  removeFromArray(iconArray, temp);
};

$square.each(addRandomIcon);

// Now the board is all set up.

function showIcon(el){             // Flips a card
  var $face = $(el).find('.icon');
  var $back = $(el).find('.fa-square-o');
  $face.show();
  $back.hide();
};

function hideIcon(el){
  var $face = $(el).find('.icon');
  var $back = $(el).find('.fa-square-o');
  window.setTimeout(function(){
    $face.fadeOut(300, function(){
        $back.fadeIn();
    });
  }, 3000);
};

var counter = 0;

function takeATurn(){
  if(counter == 0){
    counter ++;
    showIcon(this);
    $(this).addClass("clicked");
  }
  else if(counter == 1){
    showIcon(this);
    $(this).addClass("clicked");
    var $pair = $(document).find('.clicked .icon');
    var matches = $pair[0].className.split(" ").filter(function(n) { // intersection of sets
        return $pair[1].className.split(" ").indexOf(n) != -1
      });
    console.log(matches);
    if(matches.length == 4){
      console.log("Win!");
    }
    else{
      console.log("No win yet!");
      hideIcon($(document).find('.clicked'))
    };
  };
};


$square.click(takeATurn);
//
// When you click a square
//   If counter is 0, ++ counter: One square clicked!
//   - Show that square
//   If counter is 1
//   - Show that square
//   - Find both visible squares and compare them
//   - If they are the same, make them unclickable!
//   - If they are not the same, wait 3 sec and flip them back around.
//   - Increment turn count.
