$(document).ready(function() {

    // Logic for the Yes/No labels on toggle switches
    $('.custom-control-input').on('change', function() {
        // Find the associated label text (using a more specific selector)
        const label = $(this).closest('.d-flex').find('span.toggle-label');
        if ($(this).is(':checked')) {
            label.text('Yes');
        } else {
            label.text('No');
        }
    }).trigger('change'); // Trigger on page load to set initial text

    // RESET Button Logic
    $('#resetBtn').on('click', function() {
        const form = $('#visitorTabContent');
        form.find('input[type="text"], input[type="email"], input[type="tel"], input[type="datetime-local"], textarea').val('');
        form.find('select').prop('selectedIndex', 0);
        form.find('input[type="checkbox"]').prop('checked', false);
        
        // Reset the toggle switch labels back to "No"
        $('.custom-control-input').trigger('change');
        
        // Switch back to the first tab
        $('#details-tab').tab('show');
    });

    // SUBMIT Button Logic
    $('#submitBtn').on('click', function() {
        // --- IMPROVEMENT: Using direct IDs for robustness ---
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
            meetingTo: $('#meetingTo').val() || null, // Send null if empty
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

        // --- NEW: API Call using jQuery AJAX ---
        // IMPORTANT: Replace the URL with the one your API runs on.
        // It will likely be something like https://localhost:7123 or http://localhost:5123
        const apiUrl = 'https://localhost:7103/api/appointments'; 

        console.log("Sending data to API:", formData);

        $.ajax({
            url: apiUrl,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                alert('Appointment booked successfully!');
                console.log('Server response:', response);
                $('#resetBtn').click(); // Reset the form on success
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Error booking appointment. Check the console for details.');
                console.error('AJAX Error:', textStatus, errorThrown);
                console.error('Response Text:', jqXHR.responseText);
            }
        });
    });
});