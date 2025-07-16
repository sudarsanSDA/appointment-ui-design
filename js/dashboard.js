$(document).ready(function() {

    const API_BASE_URL = 'https://visitor-management-api-sudarsan-a0fshadyesard2fa.southeastasia-01.azurewebsites.net/api/Appointments';
    function loadVisitorData(status = 'Expected') {
        let apiUrl = `${API_BASE_URL}?status=${status}`;
        console.log(`Loading visitor list for: "${status}" from URL: ${apiUrl}`);

        $('#visitor-list-title').html(`<b>${status.replace(/([A-Z])/g, ' $1').trim()} Visitors</b>`);
        const tableBody = $('#visitor-table-body');
        tableBody.html('<tr><td colspan="13" class="text-center p-4"><i class="fas fa-spinner fa-spin fa-2x"></i><br>Loading...</td></tr>');

        $.ajax({
            url: apiUrl,
            type: 'GET',
            success: function(appointments) {
                tableBody.empty();
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
                    
                    const row = `
                        <tr>
                            <td><i class="fas fa-user-circle fa-2x text-muted"></i></td>
                            <td>${appt.id}</td><td>${appt.appointmentType || 'Standard'}</td><td>${appt.visitorName}</td>
                            <td>${appt.visitorType}</td><td>${appt.visitorMobile}</td><td>${appt.scheduler || 'N/A'}</td>
                            <td>${appt.location}</td><td>${appt.purpose}</td><td>${meetingFrom}</td>
                            <td>${meetingTo}</td><td>${appt.repeatVisit ? 'Yes' : 'No'}</td>
                            <td><span class="badge ${statusBadge}">${appt.status}</span></td>
                        </tr>`;
                    tableBody.append(row);
                });
            },
            error: function() {
                tableBody.html('<tr><td colspan="13" class="text-center text-danger p-4">Failed to load data.</td></tr>');
            }
        });
    }

    
    function updateAllCounts() {
        const statuses = ['Expected', 'CheckedIn', 'InPremises', 'CrossedDeadlines', 'Upcoming', 'CheckedOut'];

        console.log("Updating all dashboard counts...");

        statuses.forEach(status => {
            const countElement = $(`#count-${status}`);
            const apiUrl = `${API_BASE_URL}?status=${status}`;

            countElement.html('<i class="fas fa-spinner fa-xs fa-spin"></i>');

            $.ajax({
                url: apiUrl,
                type: 'GET',
                success: function(data) {
                    countElement.text(data.length);
                },
                error: function() {
                    countElement.text('?');
                }
            });
        });
    }


    $('.small-box').on('click', function(e) {
        e.preventDefault();
        $('.small-box').removeClass('active-filter');
        $(this).addClass('active-filter');
        const status = this.id.split('-')[1];
        loadVisitorData(status);
    });
    
    $('<style>.active-filter { box-shadow: 0 0 15px rgba(0,0,0,0.4) !important; transform: scale(1.03); transition: all 0.2s ease-in-out; }</style>').appendTo('head');
    $('.card-tools .btn-light').on('click', function(e) {
        e.preventDefault();
        window.location.href = 'index.html';
    });

    loadVisitorData('Expected');
    $('#filter-Expected').addClass('active-filter');

    updateAllCounts();
});