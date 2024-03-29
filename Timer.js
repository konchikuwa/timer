var TimeKeep={
  nowseconds: 0,
  nowminutes: 0,
  nowhours: 0,
  startseconds : 0,
  startminutes : 0,
  starthours : 0,
  getstartTime : ()=>{
    let DD = new Date();
    TimeKeep.startseconds = DD.getSeconds();
    TimeKeep.startminutes = DD.getMinutes();
    TimeKeep.starthours = DD.getHours();
  },
  getnowTime : ()=>{
    let DD = new Date();
      TimeKeep.nowseconds = DD.getSeconds();
      TimeKeep.nowminutes = DD.getMinutes();
      TimeKeep.nowhours = DD.getHours();

    if(leave.seconds-TimeKeep.nowseconds+TimeKeep.startseconds>59){
      TimeDisplay.seconds = getDoubleNumber(leave.seconds-TimeKeep.nowseconds+TimeKeep.startseconds-60);
      TimeKeep.nowminutes--;
    }else if(leave.seconds-TimeKeep.nowseconds+TimeKeep.startseconds<0){
      TimeDisplay.seconds = getDoubleNumber(leave.seconds-TimeKeep.nowseconds+TimeKeep.startseconds+60);
      TimeKeep.nowminutes++;
    }else{
      TimeDisplay.seconds = getDoubleNumber(leave.seconds-TimeKeep.nowseconds+TimeKeep.startseconds);
    }

    if(leave.minutes-TimeKeep.nowminutes+TimeKeep.startminutes>59){
      TimeDisplay.minutes = getDoubleNumber(leaveminutess-TimeKeep.nowminutes+TimeKeep.startminutes-60);
      TimeKeep.nowhours--;
    }else if(leave.minutes-TimeKeep.nowminutes+TimeKeep.startminutes<0){
      TimeDisplay.minutes = getDoubleNumber(leave.minutes-TimeKeep.nowminutes+TimeKeep.startminutes+60);
      TimeKeep.nowhours++;
    }else{
      TimeDisplay.minutes = getDoubleNumber(leave.minutes-TimeKeep.nowminutes+TimeKeep.startminutes);
    }

    TimeDisplay.hours = getDoubleNumber(leave.hours-TimeKeep.nowhours+TimeKeep.starthours);
    hours.innerHTML=TimeDisplay.hours + ":";
    minutes.innerHTML=TimeDisplay.minutes + ":";
    seconds.innerHTML=TimeDisplay.seconds;
    if(TimeDisplay.hours ==="00" && TimeDisplay.minutes ==="00" && TimeDisplay.seconds ==="00"){

      TimerStop();
      $('body').attr("class", "over");
      $('#display').attr("class", "over");
      $('.sound').get(0).currentTime = 0;
      $('.sound').get(0).play();
    }
  }
};

var continuegetnowTime = 0;

var getDoubleNumber = i =>{
  i=("00" + i).slice(-2);
  return i;
}

var TimerStart = () =>{
  $('#start_button').html("ストップ");
  console.log("a");
  TimeKeep.getstartTime();
  $('#input_hours').prop("disabled", true);
  $('#input_minutes').prop("disabled", true);
  $('#input_seconds').prop("disabled", true);
  $('#input_button').prop("disabled", true);
  continuegetnowTime = setInterval("TimeKeep.getnowTime()",1000);
}
var TimerStop = () =>{
  $('#start_button').html("スタート");
  clearInterval(continuegetnowTime);
  leave.seconds = Number(TimeDisplay.seconds);
  leave.minutes = Number(TimeDisplay.minutes);
  leave.hours = Number(TimeDisplay.hours);
}

var TimeDisplay = {
  hours: "00",
  minutes: "00",
  seconds: "00"
}

var Setting = {
  hours: 0,
  minutes: 0,
  seconds: 0
}

var leave = {
  hours: 0,
  minutes: 0,
  seconds: 0
}

$('#input_hours').click(()=>{
  if(document.getElementById("input_hours").value>=0 && document.getElementById("input_hours").value<100){
    Setting.hours = document.getElementById("input_hours").value;
    TimeDisplay.hours = getDoubleNumber(Setting.hours);
    hours.innerHTML=TimeDisplay.hours + ":";
    leave.hours = Setting.hours;
    $("#start_button").prop("disabled", false);
    $("#reset_button").prop("disabled", false);
    if(TimeDisplay.hours ==="00" && TimeDisplay.minutes ==="00" && TimeDisplay.seconds ==="00"){
      $("#start_button").prop("disabled", true);
      $("#reset_button").prop("disabled", true);
    }
  }else{
    alert("範囲を守ることが大切とは限らない！！");
  }
});
$('#input_minutes').click(()=>{
  if(document.getElementById("input_minutes").value>=0 && document.getElementById("input_minutes").value<60){
    Setting.minutes = document.getElementById("input_minutes").value;
    TimeDisplay.minutes = getDoubleNumber(Setting.minutes);
    minutes.innerHTML=TimeDisplay.minutes + ":";
    leave.minutes = Setting.minutes;
    $("#start_button").prop("disabled", false);
    $("#reset_button").prop("disabled", false);
    if(TimeDisplay.hours ==="00" && TimeDisplay.minutes ==="00" && TimeDisplay.seconds ==="00"){
      $("#start_button").prop("disabled", true);
      $("#reset_button").prop("disabled", true);
    }
  }else{
    alert("範囲を守ることが大切とは限らない！！");
  }
});
$('#input_seconds').click(()=>{
  if(document.getElementById("input_seconds").value>=0 && document.getElementById("input_seconds").value<60){
    Setting.seconds = document.getElementById("input_seconds").value
    TimeDisplay.seconds = getDoubleNumber(Setting.seconds);
    seconds.innerHTML=TimeDisplay.seconds;
    leave.seconds = Setting.seconds;
    $("#start_button").prop("disabled", false);
    $("#reset_button").prop("disabled", false);
    if(TimeDisplay.hours ==="00" && TimeDisplay.minutes ==="00" && TimeDisplay.seconds ==="00"){
      $("#start_button").prop("disabled", true);
      $("#reset_button").prop("disabled", true);
    }
  }else{
    alert("範囲を守ることが大切とは限らない！！");
  }
});

var allUpdate = () =>{
  $('#input_hours').trigger("click");
  $('#input_minutes').trigger("click");
  $('#input_seconds').trigger("click");
  if(document.getElementById("switchmode_button").innerHTML ==="タイマーへ"){
    $("#start_button").prop("disabled", false);
    $("#reset_button").prop("disabled", false);
  }
}

document.getElementById("start_button").onclick = function(){
  if(document.getElementById("switchmode_button").innerHTML === "ストップウォッチへ"){
    if($('#input_hours').prop("disabled") === true){
      TimerStop();
      $('#input_hours').prop("disabled", false);
      $('#input_minutes').prop("disabled", false);
      $('#input_seconds').prop("disabled", false);
      $('#input_button').prop("disabled", false);
      if(TimeDisplay.hours ==="00" && TimeDisplay.minutes ==="00" && TimeDisplay.seconds ==="00"){
        allUpdate();
        $('body').removeAttr("class","over");
        $('#display').removeAttr("class", "over");
        $('.sound').get(0).pause();
      }
    }else{
      TimerStart();
    }
  }else{
    if($('#start_button').html() === "スタート"){
      StopwatchStart();
    }else{
      TimerStop();
    }
  }
}
document.getElementById("reset_button").onclick = function(){
  TimerStop();
  $('.input_number').val("0");
  allUpdate();
  $('#input_hours').prop("disabled", false);
  $('#input_minutes').prop("disabled", false);
  $('#input_seconds').prop("disabled", false);
  $('#input_button').prop("disabled", false);
  $('body').removeAttr("class","over");
  $('#display').removeAttr("class", "over");
  $('.sound').get(0).pause();
  leave = {
    hours: 0,
    minutes: 0,
    seconds: 0
  }
}
$("#start_button").prop("disabled", true);
$("#reset_button").prop("disabled", true);
$('.input_number').val("0");

var StopwatchStart = () => {
  $('#start_button').html("ストップ");
  TimeKeep.getstartTime();
  continuegetnowTime = setInterval("StopwatchgetnowTime()",500);
}
var StopwatchgetnowTime = () =>{
  let DD = new Date();
      TimeKeep.nowseconds = DD.getSeconds();
      TimeKeep.nowminutes = DD.getMinutes();
      TimeKeep.nowhours = DD.getHours();

    if(leave.seconds+TimeKeep.nowseconds-TimeKeep.startseconds>59){
      TimeDisplay.seconds = getDoubleNumber(leave.seconds+TimeKeep.nowseconds-TimeKeep.startseconds-60);
      TimeKeep.nowminutes++;
    }else if(leave.seconds+TimeKeep.nowseconds-TimeKeep.startseconds<0){
      TimeDisplay.seconds = getDoubleNumber(leave.seconds+TimeKeep.nowseconds-TimeKeep.startseconds+60);
      TimeKeep.nowminutes--;
    }else{
      TimeDisplay.seconds = getDoubleNumber(leave.seconds+TimeKeep.nowseconds-TimeKeep.startseconds);
    }

    if(leave.minutes+TimeKeep.nowminutes-TimeKeep.startminutes>59){
      TimeDisplay.minutes = getDoubleNumber(leaveminutess+TimeKeep.nowminutes-TimeKeep.startminutes-60);
      TimeKeep.nowhours++;
    }else if(leave.minutes+TimeKeep.nowminutes-TimeKeep.startminutes<0){
      TimeDisplay.minutes = getDoubleNumber(leave.minutes+TimeKeep.nowminutes-TimeKeep.startminutes+60);
      TimeKeep.nowhours--;
    }else{
      TimeDisplay.minutes = getDoubleNumber(leave.minutes+TimeKeep.nowminutes-TimeKeep.startminutes);
    }

    TimeDisplay.hours = getDoubleNumber(leave.hours+TimeKeep.nowhours-TimeKeep.starthours);
    hours.innerHTML=TimeDisplay.hours + ":";
    minutes.innerHTML=TimeDisplay.minutes + ":";
    seconds.innerHTML=TimeDisplay.seconds;
}
var StopwatchStop = () => {

}
var switchMode = () => {
  $('#reset_button').trigger("click");
  if(document.getElementById("switchmode_button").innerHTML === "ストップウォッチへ"){
    document.getElementById("switchmode_button").innerHTML = "タイマーへ";
    $('.input').hide();
    $('#headline').html("ストップウォッチ");
    $("#start_button").prop("disabled", false);
    $("#reset_button").prop("disabled", false);
  }else{
    document.getElementById("switchmode_button").innerHTML = "ストップウォッチへ"
    $('.input').show();
    $('#headline').html("タイマー");
    $("#start_button").prop("disabled", true);
    $("#reset_button").prop("disabled", true);
  }
}
