//Basic Example
$("#example-basic").steps({
  headerTag: "h3",
  bodyTag: "section",
  transitionEffect: "slideLeft",
  autoFocus: true,
});

// Basic Example with form
var form = $("#example-form");
form.validate({
  errorPlacement: function errorPlacement(error, element) {
    element.before(error);
  },
  rules: {
    confirm: {
      equalTo: "#password",
    },
  },
});
form.children("div").steps({
  headerTag: "h3",
  bodyTag: "section",
  transitionEffect: "slideLeft",
  onStepChanging: function (event, currentIndex, newIndex) {
    form.validate().settings.ignore = ":disabled,:hidden";
    return form.valid();
  },
  onFinishing: function (event, currentIndex) {
    form.validate().settings.ignore = ":disabled";
    return form.valid();
  },
  onFinished: function (event, currentIndex) {
    alert("Submitted!");
  },
});

// Advance Example

var advanced_form = $("#example-advanced-form").show();

advanced_form
  .steps({
    headerTag: "h3",
    bodyTag: "fieldset",
    transitionEffect: "slideLeft",
    onStepChanging: function (event, currentIndex, newIndex) {
      // Allways allow previous action even if the current form is not valid!
      if (currentIndex > newIndex) {
        return true;
      }
      // Forbid next action on "Warning" step if the user is to young
      if (newIndex === 3 && Number($("#age-2").val()) < 18) {
        return false;
      }
      // Needed in some cases if the user went back (clean up)
      if (currentIndex < newIndex) {
        // To remove error styles
        advanced_form.find(".body:eq(" + newIndex + ") label.error").remove();
        advanced_form.find(".body:eq(" + newIndex + ") .error").removeClass("error");
      }
      advanced_form.validate().settings.ignore = ":disabled,:hidden";
      return advanced_form.valid();
    },
    onStepChanged: function (event, currentIndex, priorIndex) {
      // Used to skip the "Warning" step if the user is old enough.
      if (currentIndex === 2 && Number($("#age-2").val()) >= 18) {
        advanced_form.steps("next");
      }
      // Used to skip the "Warning" step if the user is old enough and wants to the previous step.
      if (currentIndex === 2 && priorIndex === 3) {
        advanced_form.steps("previous");
      }
    },
    onFinishing: function (event, currentIndex) {
      advanced_form.validate().settings.ignore = ":disabled";
      return advanced_form.valid();
    },
    onFinished: function (event, currentIndex) {
      alert("Submitted!");
    },
  })
  .validate({
    errorPlacement: function errorPlacement(error, element) {
      element.before(error);
    },
    rules: {
      confirm: {
        equalTo: "#password-2",
      },
    },
  });

// Dynamic Manipulation
$("#example-manipulation").steps({
  headerTag: "h3",
  bodyTag: "section",
  enableAllSteps: true,
  enablePagination: false,
});

//Vertical Steps

$("#example-vertical").steps({
  headerTag: "h3",
  bodyTag: "section",
  transitionEffect: "slideLeft",
  stepsOrientation: "vertical",
});

//Custom design form example
$(".tab-wizard").steps({
  headerTag: "h6",
  bodyTag: "section",
  transitionEffect: "fade",
  titleTemplate: '<span class="step">#index#</span> #title#',
  labels: {
    finish: "Submit",
  },
  onFinished: function (event, currentIndex) {
  	// 채널을 생성 후, 완료 된 시점에서 다시 페이지의 버튼 및 입력 항목들을 원 상태로 돌리는 프로세스나
  	// 해당 페이지를 reload해서 다시 원상태로 돌리는거나 같은 프로세스
  	// 채널 생성이 완료된 후, 알림창을 출력하고 해당 페이지로 이동한다.
  	// 아래와 같은 프로세스가 본인이 생각했던 프로세
  
    // $("#channel_disp").hide();
    alert("채널 생성이 완료되었습니다!");
    location.href = "/synerhub/main";
  }
});

function resetJQuerySteps(elementTarget, noOfSteps){
    var noOfSteps = noOfSteps - 1;

    var currentIndex = $(elementTarget).steps("getCurrentIndex");
        if(currentIndex >= 1){
            for(var x = 0; x < currentIndex;x++){
                $(elementTarget).steps("previous");
            }
        }
    
    setTimeout(function resetHeaderCall(){ 
    var y, steps;
        for(y = 0, steps= 2; y < noOfSteps;y++){
            //console.log(steps);
            try{
                $(`${elementTarget} > .steps > ul > li:nth-child(${steps})`).removeClass("done");
                    $(`${elementTarget} > .steps > ul > li:nth-child(${steps})`).removeClass("current");
                    $(`${elementTarget} > .steps > ul > li:nth-child(${steps})`).addClass("disabled");

            }
            catch(err){}
      steps++;
        }
    }, 50);
    
}

var form = $(".validation-wizard").show();

$(".validation-wizard").steps({
  headerTag: "h6",
  bodyTag: "section",
  transitionEffect: "fade",
  titleTemplate: '<span class="step">#index#</span> #title#',
  labels: {
    finish: "Submit",
  },
  onStepChanging: function (event, currentIndex, newIndex) {
    return (
      currentIndex > newIndex ||
      (!(3 === newIndex && Number($("#age-2").val()) < 18) &&
        (currentIndex < newIndex &&
          (form.find(".body:eq(" + newIndex + ") label.error").remove(),
          form.find(".body:eq(" + newIndex + ") .error").removeClass("error")),
        (form.validate().settings.ignore = ":disabled,:hidden"),
        form.valid()))
    );
  },
  onFinishing: function (event, currentIndex) {
    return (form.validate().settings.ignore = ":disabled"), form.valid();
  },
  onFinished: function (event, currentIndex) {
    swal(
      "Form Submitted!",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat eleifend ex semper, lobortis purus sed."
    );
  },
}),
  $(".validation-wizard").validate({
    ignore: "input[type=hidden]",
    errorClass: "text-danger",
    successClass: "text-success",
    highlight: function (element, errorClass) {
      $(element).removeClass(errorClass);
    },
    unhighlight: function (element, errorClass) {
      $(element).removeClass(errorClass);
    },
    errorPlacement: function (error, element) {
      error.insertAfter(element);
    },
    rules: {
      email: {
        email: !0,
      },
    },
  });