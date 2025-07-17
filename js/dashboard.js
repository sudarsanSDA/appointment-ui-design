$(document).ready(function() {

    const API_BASE_URL = 'https://visitor-management-api-sudarsan-a0fshadyesard2fa.southeastasia-01.azurewebsites.net/api/Appointments';

    function loadVisitorData(status = 'Expected') {
        let apiUrl = `${API_BASE_URL}?status=${status}`;
        $('#visitor-list-title').html(`<b>${status.replace(/([A-Z])/g, ' $1').trim()} Visitors</b>`);
        const tableBody = $('#visitor-table-body');
        // Note: The colspan is now 14 to account for the new "Actions" column.
        tableBody.html('<tr><td colspan="14" class="text-center p-4"><i class="fas fa-spinner fa-spin fa-2x"></i><br>Loading...</td></tr>');

        $.ajax({
            url: apiUrl,
            type: 'GET',
            success: function(appointments) {
                tableBody.empty();
                if (!appointments || appointments.length === 0) {
                    tableBody.html(`<tr><td colspan="14" class="text-center p-4">No ${status} visitors found.</td></tr>`);
                    return;
                }

                $.each(appointments, function(index, appt) {
                    const meetingFrom = new Date(appt.meetingOn).toLocaleString();
                    const meetingTo = appt.meetingTo ? new Date(appt.meetingTo).toLocaleString() : 'N/A';
                    
                    let statusBadge = 'badge-secondary';
                    let actionButtons = '';

                    if (appt.status === 'Expected') {
                        statusBadge = 'badge-warning';
                        actionButtons = `<button class="btn btn-xs btn-success btn-check-in" data-id="${appt.id}">Check In</button>`;
                    } else if (appt.status === 'CheckedIn') {
                        statusBadge = 'badge-success';
                        actionButtons = `<button class="btn btn-xs btn-info btn-check-out" data-id="${appt.id}">Check Out</button>`;
                    } else if (appt.status === 'CheckedOut') {
                        statusBadge = 'badge-info';
                        actionButtons = '<span class="text-muted">Completed</span>';
                    }

                    const row = `
                        <tr>
                            <td><i class="fas fa-user-circle fa-2x text-muted"></i></td>
                            <td>${appt.id}</td><td>${appt.appointmentType || 'Standard'}</td><td>${appt.visitorName}</td>
                            <td>${appt.visitorType}</td><td>${appt.visitorMobile}</td><td>${appt.scheduler || 'N/A'}</td>
                            <td>${appt.location}</td><td>${appt.purpose}</td><td>${meetingFrom}</td>
                            <td>${meetingTo}</td><td>${appt.repeatVisit ? 'Yes' : 'No'}</td>
                            <td><span class="badge ${statusBadge}">${appt.status}</span></td>
                            <td>${actionButtons}</td>
                        </tr>`;
                    tableBody.append(row);
                });
            }
        });
    }

    
    function updateAllCounts() {
        const statuses = ['Expected', 'CheckedIn', 'InPremises', 'CrossedDeadlines', 'Upcoming', 'CheckedOut'];
        statuses.forEach(status => {
            const countElement = $(`#count-${status}`);
            countElement.html('<i class="fas fa-spinner fa-xs fa-spin"></i>');
            $.get(`${API_BASE_URL}?status=${status}`, data => countElement.text(data.length)).fail(() => countElement.text('?'));
        });
    }

    function updateStatus(appointmentId, newStatus) {
        const apiUrl = `${API_BASE_URL}/${appointmentId}/status`;
        console.log(`Updating status for ID ${appointmentId} to "${newStatus}"`);

        $.ajax({
            url: apiUrl,
            type: 'PATCH',
            contentType: 'application/json',
            data: JSON.stringify({ status: newStatus }),
            success: function() {
                alert(`Visitor successfully updated to: ${newStatus}`);
                updateAllCounts();
                const activeStatus = $('.active-filter').attr('id').split('-')[1] || 'Expected';
                loadVisitorData(activeStatus);
            },
            error: function() {
                alert('Error: Could not update status. Please try again.');
            }
        });
    }
    

    $('#visitor-table-body').on('click', '.btn-check-in', function() {
        const id = $(this).data('id');
        updateStatus(id, 'CheckedIn');
    });

    $('#visitor-table-body').on('click', '.btn-check-out', function() {
        const id = $(this).data('id');
        updateStatus(id, 'CheckedOut');
    });

    $('.small-box').on('click', function(e) {
        e.preventDefault();
        $('.small-box').removeClass('active-filter');
        $(this).addClass('active-filter');
        const status = this.id.split('-')[1];
        loadVisitorData(status);
    });
    
    $('<style>.active-filter { box-shadow: 0 0 15px rgba(0,0,0,0.4) !important; transform: scale(1.03); transition: all 0.2s ease-in-out; }</style>').appendTo('head');

    $('.card-tools .btn-light').on('click', (e) => { e.preventDefault(); window.location.href = 'index.html'; });

    loadVisitorData('Expected');
    $('#filter-Expected').addClass('active-filter');
    updateAllCounts();
});