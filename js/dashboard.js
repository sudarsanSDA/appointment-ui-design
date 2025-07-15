$(document).ready(function() {

    // Function to load data for a given status
    function loadVisitorData(status) {
        // TODO: Replace with your API call to fetch visitors by status
        console.log("Loading data for:", status);

        // Example of updating table title
        $('#visitor-list-title').text(status + ' Visitors');

        // Simulating data load
        $('#visitor-table-body').html(`<tr><td colspan="13">${status} data loaded here...</td></tr>`);
    }

    // Click listeners for each filter box
    $('.small-box').on('click', function() {
        const status = $(this).find('p').text().replace(/\s+/g, '');
        loadVisitorData(status);
    });

    // Optionally, load 'Expected Visitors' by default
    loadVisitorData('Expected');
});

