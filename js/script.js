$(document).ready(function() {
    // Toggle Yes/No Labels
    $('.custom-control-input').on('change', function() {
        const label = $(this).closest('.d-flex').find('span.toggle-label');
        label.text($(this).is(':checked') ? 'Yes' : 'No');
    }).trigger('change');

    // Reset Button Logic
    $('#resetBtn').on('click', function() {
        const form = $('#visitorTabContent');
        form.find('input[type="text"], input[type="email"], input[type="tel"], input[type="datetime-local"], textarea').val('');
        form.find('select').prop('selectedIndex', 0);
        form.find('input[type="checkbox"]').prop('checked', false);
        $('.custom-control-input').trigger('change');
        $('#details-tab').tab('show');
    });

    // Submit Button Logic
    $('#submitBtn').on('click', function() {
        const formData = {
            // Details Tab
            visitorType: $('#visitorType').val(),
            visitorName: $('#visitorName').val(),
            visitorEmail: $('#visitorEmail').val(),
            visitorMobile: $('#visitorMobile').val(),
            purpose: $('#purpose').val(),
            location: $('#location').val(),
            gate: $('#gate').val(),
            area: $('#area').val(),
            meetingOn: $('#meetingOn').val(),
            meetingTo: $('#meetingTo').val() || null,
            allDay: $('#allday').is(':checked'),
            repeatVisit: $('#repeatVisit').is(':checked'),
            scheduler: $('#scheduler').val(),
            recurrence: $('#recurrence').val(),

            // Additional Tab
            assistanceRequired: $('#assistance').is(':checked'),
            serviceProviderAccess: $('#serviceAccess').is(':checked'),
            wifiRequired: $('#wifiRequired').is(':checked'),
            escortRequired: $('#escortRequired').is(':checked'),
            additionalNotification: $('#additionalNotif').is(':checked'),
            notifyTo: $('#notifyTo').val(),
            visitorMessage: $('#visitorMessage').val(),
            checkInInstructions: $('#checkInInstructions').val()
        };

        console.log("Submitting:", formData);

        const apiUrl = 'https://your-api-url.com/api/appointments'; // Replace with actual API URL

        $.ajax({
            url: apiUrl,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                alert('Appointment booked successfully!');
                console.log('API Response:', response);
                $('#resetBtn').click();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Error booking appointment. See console for details.');
                console.error('AJAX Error:', textStatus, errorThrown);
                console.error('Response Text:', jqXHR.responseText);
            }
        });
    });
});
