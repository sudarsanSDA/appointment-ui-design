$(document).ready(function() {
    $('.custom-control-input').on('change', function() {
        const label = $(this).closest('.d-flex').find('span.toggle-label');
        label.text($(this).is(':checked') ? 'Yes' : 'No');
    }).trigger('change');

    $('#resetBtn').on('click', function() {
        const form = $('#visitorTabContent');
        form.find('input[type="text"], input[type="email"], input[type="tel"], input[type="datetime-local"], textarea').val('');
        form.find('select').prop('selectedIndex', 0);
        form.find('input[type="checkbox"]').prop('checked', false);
        $('.custom-control-input').trigger('change');
        $('#details-tab').tab('show');
        $('.form-control').removeClass('is-invalid');
    });

    $('#submitBtn').on('click', function() {

        $('.form-control').removeClass('is-invalid');
        
        let isValid = true;
        let errorMessages = [];

        const requiredFields = [
            { id: 'visitorType', name: 'Visitor Type' },
            { id: 'visitorName', name: 'Visitor Name' },
            { id: 'visitorEmail', name: 'Visitor Email' },
            { id: 'visitorMobile', name: 'Visitor Mobile' },
            { id: 'purpose', name: 'Purpose' },
            { id: 'location', name: 'Location' },
            { id: 'gate', name: 'Gate' },
            { id: 'area', name: 'Area' },
            { id: 'meetingOn', name: 'Meeting On Date' }
        ];

        requiredFields.forEach(function(field) {
            const element = $('#' + field.id);
            
            if (!element.val() || element.val().trim() === '') {
                isValid = false;
                errorMessages.push(field.name);
                element.addClass('is-invalid');
            }
        });

       
        if (!isValid) {
            alert('Please fill out the following required fields:\n\n- ' + errorMessages.join('\n- '));
            return; 
        }
        


        const formData = {
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
            assistanceRequired: $('#assistance').is(':checked'),
            serviceProviderAccess: $('#serviceAccess').is(':checked'),
            wifiRequired: $('#wifiRequired').is(':checked'),
            escortRequired: $('#escortRequired').is(':checked'),
            additionalNotification: $('#additionalNotif').is(':checked'),
            notifyTo: $('#notifyTo').val(),
            visitorMessage: $('#visitorMessage').val(),
            checkInInstructions: $('#checkInInstructions').val()
        };

        const apiUrl = 'https://visitor-management-api-sudarsan-a0fshadyesard2fa.southeastasia-01.azurewebsites.net/api/Appointments';

        console.log("Submitting to API:", apiUrl);
        console.log("Form Data:", formData);

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
                console.error('Response Status:', jqXHR.status);
                console.error('Response Text:', jqXHR.responseText);
            }
        });
    });
});