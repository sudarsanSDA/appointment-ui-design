$(document).ready(function () {
    const API_URL = 'https://localhost:7103/api/appointments';

    let allAppointments = [];
    
    function initializeDashboard() {
        fetchAppointments();
    }

    function fetchAppointments() {
        $.ajax({
            url: API_URL,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log("--- Raw data from API ---");
                console.log(data);
                allAppointments = processAppointmentData(data);
                console.log("--- Processed appointments with status ---");
                console.log(allAppointments);
                updateDashboardCounts();
                filterAndRenderTable('Expected');
            },
            error: function (error) {
                console.error("Error fetching appointment data:", error);
                const tableBody = $('#visitor-table-body');
                tableBody.empty();
                tableBody.append(`
                    <tr>
                        <td colspan="13" class="text-center text-danger">
                            Could not load data from the server. Please ensure the API is running and accessible at ${API_URL}.
                        </td>
                    </tr>
                `);
            }
        });
    }

    function processAppointmentData(appointments) {
        const now = new Date();
        const upcomingLimit = new Date(now.getTime() + 60 * 60 * 1000);

        if (!Array.isArray(appointments)) {
            console.error("API did not return an array.", appointments);
            return [];
        }

        return appointments.map(appt => {
            const meetingOn = new Date(appt.meetingOn);
            const meetingTo = appt.meetingTo ? new Date(appt.meetingTo) : null;
            let status = 'Unknown';

            if (isNaN(meetingOn.getTime())) {
                console.warn("Invalid 'meetingOn' date for appointment:", appt);
                return { ...appt, calculatedStatus: 'Unknown' };
            }

            if (meetingTo && now > meetingTo) {
                status = 'CrossedDeadlines';
            } else if (meetingOn <= now && (!meetingTo || now < meetingTo)) {
                status = 'InPremises'; 
            } else if (meetingOn > now) {
                if (meetingOn <= upcomingLimit) {
                    status = 'Upcoming';
                } else {
                    status = 'Expected';
                }
            }
            
            return { ...appt, calculatedStatus: status };
        });
    }

    function updateDashboardCounts() {
        const counts = {
            Expected: 0,
            CheckedIn: 0,
            InPremises: 0,
            CrossedDeadlines: 0,
            Upcoming: 0,
            CheckedOut: 0 
        };

        allAppointments.forEach(appt => {
            if (counts.hasOwnProperty(appt.calculatedStatus)) {
                counts[appt.calculatedStatus]++;
            }
        });

        counts.CheckedIn = counts.InPremises;

        $('#count-Expected').text(counts.Expected);
        $('#count-CheckedIn').text(counts.CheckedIn);
        $('#count-InPremises').text(counts.InPremises);
        $('#count-CrossedDeadlines').text(counts.CrossedDeadlines);
        $('#count-Upcoming').text(counts.Upcoming);
        $('#count-CheckedOut').text(counts.CheckedOut); 
    }

    function filterAndRenderTable(filter) {

        $('.small-box').removeClass('active');
        $(`#filter-${filter}`).closest('.small-box').addClass('active');
  


        const titles = {
            'Expected': 'Expected Visitors',
            'CheckedIn': 'Checked-In Visitors',
            'InPremises': 'Visitors In-Premises',
            'CrossedDeadlines': 'Visits with Crossed Deadlines',
            'Upcoming': 'Upcoming Visits',
            'CheckedOut': 'Checked-Out Visitors'
        };

        $('#visitor-list-title').html(`<b>${titles[filter] || 'All Visitors'}</b>`);
        
        let filteredData;
        
        if (filter === 'CheckedIn') {
             filteredData = allAppointments.filter(appt => appt.calculatedStatus === 'InPremises');
        } else {
             filteredData = allAppointments.filter(appt => appt.calculatedStatus === filter);
        }

        renderTable(filteredData);
    }


    function renderTable(appointments) {
        const tableBody = $('#visitor-table-body');
        tableBody.empty();

        if (appointments.length === 0) {
            tableBody.append(`
                <tr>
                    <td colspan="13" class="text-center">No visitors to display in this category.</td>
                </tr>
            `);
            return;
        }

        appointments.forEach(appt => {
            const row = `
                <tr>
                    <td><i class="fas fa-user-circle fa-2x text-muted"></i></td>
                    <td>${appt.id}</td>
                    <td>Standard</td> <!-- "Appt Type" is not in the schema, using a placeholder -->
                    <td>${appt.visitorName || 'N/A'}</td>
                    <td>${appt.visitorType || 'N/A'}</td>
                    <td>${appt.visitorMobile || 'N/A'}</td>
                    <td>${appt.scheduler || 'N/A'}</td> <!-- Using 'Scheduler' as 'Host' -->
                    <td>${appt.location || 'N/A'}</td>
                    <td>${appt.purpose || 'N/A'}</td>
                    <td>${formatDateTime(appt.meetingOn)}</td>
                    <td>${formatDateTime(appt.meetingTo)}</td>
                    <td>${appt.repeatVisit ? 'Yes' : 'No'}</td>
                    <td>${getStatusBadge(appt.calculatedStatus)}</td>
                </tr>
            `;
            tableBody.append(row);
        });
    }

    function setupEventListeners() {
        $('.small-box a').on('click', function(e) {
            e.preventDefault();
            const filterId = $(this).attr('id');
            const filterType = filterId.replace('filter-', ''); 
            filterAndRenderTable(filterType);
        });
    }

    function formatDateTime(dateString) {
        if (!dateString) {
            return 'N/A';
        }
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    function getStatusBadge(status) {
        const badgeClasses = {
            'Expected': 'badge badge-warning',
            'InPremises': 'badge badge-success',
            'CrossedDeadlines': 'badge badge-danger',
            'Upcoming': 'badge badge-info',
            'CheckedOut': 'badge badge-secondary',
            'Unknown': 'badge badge-light'
        };
        const statusText = status.replace(/([A-Z])/g, ' $1').trim(); 
        return `<span class="${badgeClasses[status] || 'badge-light'}">${statusText}</span>`;
    }

    initializeDashboard();
    setupEventListeners();
});
