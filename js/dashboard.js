$(document).ready(function() {

    // The API URL is correct and points to your "Appointments" controller.
    const API_BASE_URL = 'https://visitor-management-api-sudarsan-a0fshadyesard2fa.southeastasia-01.azurewebsites.net/api/Appointments';

    /**
     * This function now correctly fetches data from the API based on the status.
     * It also provides better user feedback in the table.
     */
    function loadVisitorData(status = 'Expected') {
        let apiUrl = API_BASE_URL;
        
        // If a status is provided, add it to the URL as a query parameter.
        // e.g., .../api/Appointments?status=CheckedIn
        if (status && status !== 'All') {
             apiUrl = `${API_BASE_URL}?status=${status}`;
        }
        
        console.log(`Loading data for status: "${status}" from URL: ${apiUrl}`);

        // Update the title and show a loading spinner.
        $('#visitor-list-title').html(`<b>${status.replace(/([A-Z])/g, ' $1').trim()} Visitors</b>`);
        const tableBody = $('#visitor-table-body');
        tableBody.html('<tr><td colspan="13" class="text-center p-4"><i class="fas fa-spinner fa-spin fa-2x"></i><br>Loading...</td></tr>');

        $.ajax({
            url: apiUrl,
            type: 'GET',
            success: function(appointments) {
                tableBody.empty(); // Clear the table before adding new data.
                if (!appointments || appointments.length === 0) {
                    tableBody.html(`<tr><td colspan="13" class="text-center p-4">No ${status} visitors found.</td></tr>`);
                    return;
                }

                $.each(appointments, function(index, appt) {
                    const meetingFrom = appt.meetingOn ? new Date(appt.meetingOn).toLocaleString() : 'N/A';
                    const meetingTo = appt.meetingTo ? new Date(appt.meetingTo).toLocaleString() : 'N/A';
                    
                    let statusBadge = 'badge-secondary';
                    if (appt.status === 'Expected') statusBadge = 'badge-warning';
                    if (appt.status === 'CheckedIn') statusBadge = 'badge-success';
                    if (appt.status === 'CheckedOut') statusBadge = 'badge-info';
                    if (appt.status === 'CrossedDeadlines') statusBadge = 'badge-danger';

                    const row = `
                        <tr>
                            <td><i class="fas fa-user-circle fa-2x text-muted"></i></td>
                            <td>${appt.id || 'N/A'}</td>
                            <td>${appt.appointmentType || 'Standard'}</td>
                            <td>${appt.visitorName || 'N/A'}</td>
                            <td>${appt.visitorType || 'N/A'}</td>
                            <td>${appt.visitorMobile || 'N/A'}</td>
                            <td>${appt.scheduler || 'N/A'}</td>
                            <td>${appt.location || 'N/A'}</td>
                            <td>${appt.purpose || 'N/A'}</td>
                            <td>${meetingFrom}</td>
                            <td>${meetingTo}</td>
                            <td>${appt.repeatVisit ? 'Yes' : 'No'}</td>
                            <td><span class="badge ${statusBadge}">${appt.status || 'N/A'}</span></td>
                        </tr>
                    `;
                    tableBody.append(row);
                });
            },
            error: function() {
                tableBody.html('<tr><td colspan="13" class="text-center text-danger p-4">Failed to load data.</td></tr>');
            }
        });
    }

    /**
     * This is the improved click handler for the colored status boxes.
     */
    $('.small-box').on('click', function(e) {
        e.preventDefault();

        // Highlight the selected box for better user experience.
        $('.small-box').removeClass('active-filter');
        $(this).addClass('active-filter');

        // --- THIS IS THE FIX ---
        // We get the status directly from the element's ID (e.g., "filter-Expected" -> "Expected").
        // This is much more reliable than reading the text.
        const status = this.id.split('-')[1];
        
        loadVisitorData(status);
    });

    /**
     * This new code ensures data is fresh when you return to the browser tab.
     */
    $(window).on('pageshow', function(event) {
        // 'persisted' is true if the page was loaded from the browser's back/forward cache.
        if (event.originalEvent.persisted) {
            console.log("Page was loaded from cache. Reloading active filter data.");
            // Find which filter is active and reload it.
            const activeStatus = $('.active-filter').attr('id').split('-')[1] || 'Expected';
            loadVisitorData(activeStatus);
        }
    });
    
    // Add a simple CSS rule for the active filter style.
    $('<style>.active-filter { box-shadow: 0 0 15px rgba(0,0,0,0.4) !important; transform: scale(1.03); transition: all 0.2s ease-in-out; }</style>').appendTo('head');

    // Redirect the "New Appointment" button to the form page.
    $('.card-tools .btn-light').on('click', function(e) {
        e.preventDefault();
        window.location.href = 'index.html';
    });

    // --- INITIAL LOAD ---
    // When the page first opens, load the 'Expected' visitors by default and highlight the box.
    loadVisitorData('Expected');
    $('#filter-Expected').addClass('active-filter');
});