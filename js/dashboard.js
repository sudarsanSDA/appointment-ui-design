$(document).ready(function () {
    const apiBaseUrl = 'https://your-api-domain.com/api/visitors'; // Replace with your API

    function renderTable(statusType) {
        $('#visitor-list-title').html(`<b>${statusType} Visitors</b>`);
        const tableBody = $('#visitor-table-body');
        tableBody.html(`<tr><td colspan="10" class="text-center">Loading...</td></tr>`);

        $.ajax({
            url: `${apiBaseUrl}?status=${statusType}`,
            method: 'GET',
            success: function (data) {
                tableBody.empty();
                if (data.length === 0) {
                    tableBody.append(`<tr><td colspan="10" class="text-center">No records found</td></tr>`);
                } else {
                    data.forEach(visitor => {
                        tableBody.append(`
                            <tr>
                                <td><img src="${visitor.photoUrl || 'https://via.placeholder.com/40'}" alt="Photo" width="40"></td>
                                <td>${visitor.id}</td>
                                <td>${visitor.name || 'N/A'}</td>
                                <td>${visitor.mobile || 'N/A'}</td>
                                <td>${visitor.host || 'N/A'}</td>
                                <td>${visitor.location || 'N/A'}</td>
                                <td>${visitor.purpose || 'N/A'}</td>
                                <td>${formatDateTime(visitor.meetingFrom)}</td>
                                <td>${formatDateTime(visitor.meetingTo)}</td>
                                <td>${visitor.status || 'N/A'}</td>
                            </tr>
                        `);
                    });
                }
            },
            error: function () {
                tableBody.html(`<tr><td colspan="10" class="text-center text-danger">Failed to load data</td></tr>`);
            }
        });
    }

    function formatDateTime(dateString) {
        if (!dateString) return 'N/A';
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    $('.status-filter').click(function () {
        const statusType = $(this).data('type');
        renderTable(statusType);
    });

    renderTable('Expected'); // Default load
});
