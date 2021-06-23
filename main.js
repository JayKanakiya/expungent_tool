$(document).ready(function() {
  $("#slct").change(function(){
    if ($(this).val()!='') {
      window.location.href=$(this).val()
    }
  });
});
