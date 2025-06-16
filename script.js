$(document).ready(function() {


  $('.custom-control-input').on('change', function() {
    const label = $(this).closest('.d-flex').find('span.ml-2');
    if ($(this).is(':checked')) {
      label.text('Yes');
    } else {
      label.text('No');
    }
  });


  // RESET
  $('button:contains("Reset")').on('click', function() {
    const formContainer = $('#visitorTabContent');

    formContainer.find('input[type="text"], input[type="email"], input[type="tel"], input[type="datetime-local"]').val('');
    formContainer.find('textarea').val('');
    formContainer.find('select').prop('selectedIndex', 0);
    formContainer.find('input[type="checkbox"]').prop('checked', false);
    formContainer.find('.custom-control-input').trigger('change');
    
    // Switch back to the first tab
    $('#details-tab').tab('show');

  });


  // SUBMIT
  // Selecting the button based on its text content "Submit"
  $('button:contains("Submit")').on('click', function() {
    //No IDs
    const formData = {
      // Details Tab
      visitorType: $('label:contains("Visitor Type")').parent().find('select').val(),
      visitorName: $('label:contains("Visitor Name")').parent().find('input').val(),
      visitorEmail: $('label:contains("Visitor Email")').parent().find('input').val(),
      visitorMobile: $('label:contains("Visitor Mobile")').parent().find('input').val(),
      purpose: $('label:contains("Purpose")').parent().find('input').val(),
      location: $('label:contains("Location")').parent().find('select').val(),
      gate: $('label:contains("Gate")').parent().find('select').val(),
      area: $('label:contains("Area")').parent().find('select').val(),
      meetingOn: $('label:contains("Meeting On")').parent().find('input').val(),
      meetingTo: $('label:contains("Meeting To")').parent().find('input').val(),
      allDay: $('#allday').is(':checked'),
      repeatVisit: $('#repeatVisit').is(':checked'),
      scheduler: $('label:contains("Scheduler")').parent().find('input').val(),
      recurrence: $('label:contains("Recurrence Pattern")').parent().find('select').val(),
      

      assistanceRequired: $('#assistance').is(':checked'),
      serviceProviderAccess: $('#serviceAccess').is(':checked'),
      wifiRequired: $('#wifiRequired').is(':checked'),
      escortRequired: $('#escortRequired').is(':checked'),
      additionalNotification: $('#additionalNotif').is(':checked'),
      notifyTo: $('label:contains("Notify to:")').parent().find('input').val(),
      visitorMessage: $('label:contains("Message to Visitors:")').parent().find('textarea').val(),
      checkInInstructions: $('label:contains("Check-In Instructions:")').parent().find('textarea').val()
    };
    
    // send the `formData` object to server.
  });

});