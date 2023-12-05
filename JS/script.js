/*
Name: Kevin Sree
Email: kevinsree@student.uml.edu
File: script.js
*/

jQuery(document).ready(function() {
    // Initialize form validation
    jQuery('#multiplicationForm').validate({
      // Specify validation rules
      rules: {
        minRow: {
          required: true,
          number: true
        },
        maxRow: {
          required: true,
          number: true
        },
        minColumn: {
          required: true,
          number: true
        },
        maxColumn: {
          required: true,
          number: true
        }
      },
      // Specify validation error messages
      messages: {
        minRow: {
          required: "Please enter a minimum row value.",
          number: "Please enter a valid number."
        },
        maxRow: {
          required: "Please enter a maximum row value.",
          number: "Please enter a valid number."
        },
        minColumn: {
          required: "Please enter a minimum column value.",
          number: "Please enter a valid number."
        },
        maxColumn: {
          required: "Please enter a maximum column value.",
          number: "Please enter a valid number."
        }
      },
      // Handle form submission if validation passes
      submitHandler: function(form) {
        // Get values
        const minRow = parseInt(jQuery('#minRow').val());
        const maxRow = parseInt(jQuery('#maxRow').val());
        const minColumn = parseInt(jQuery('#minColumn').val());
        const maxColumn = parseInt(jQuery('#maxColumn').val());
  
        // Validate and generate table
        if (!isNaN(minRow) && !isNaN(maxRow) && !isNaN(minColumn) && !isNaN(maxColumn)) {
          if (minRow <= maxRow && minColumn <= maxColumn) {
            if (minRow >= -50 && maxRow <= 50 && minColumn >= -50 && maxColumn <= 50) {
              generateTable(minRow, maxRow, minColumn, maxColumn);
            } else {
              displayError("errorMessage", "Please enter numbers between -50 and 50.");
            }
          } else {
            displayError("errorMessage", "The minimum value should not exceed the maximum value.");
          }
        } else {
          displayError("errorMessage", "Invalid input. Please enter valid numbers.");
        }
      }
    });

    // Function to create the table and populate it with the correct values
    function generateTable(minRow, maxRow, minColumn, maxColumn) {
        const tableContainer = jQuery('#tableContainer');
        tableContainer.empty();
    
        const table = jQuery('<table></table>');
    
        const topRow = jQuery('<tr></tr>');
        topRow.append(jQuery('<th></th>'));
    
        // For-loop to create header row
        for (let i = minRow; i <= maxRow; i++) {
          const th = jQuery('<th></th>').text(i);
          topRow.append(th);
        }
    
        // Appends header row to top of table
        table.append(topRow);
    
        // Nested for-loop to create rows and columns of table
        for (let i = minColumn; i <= maxColumn; i++) {
          const row = jQuery('<tr></tr>');
    
          const th = jQuery('<th></th>').text(i);
          row.append(th);
    
          // Calculates each value in a row
          for (let j = minRow; j <= maxRow; j++) {
            const td = jQuery('<td></td>').text(i * j);
            row.append(td);
          }
    
          // Appends each completed row
          table.append(row);
        }
    
        // Appends table to the container
        tableContainer.append(table);
      }
    
    // Function to display the error message
    function displayError(elementId, message) {
    const errorMessageElement = jQuery('#' + elementId);
    errorMessageElement.text(message);
    }

    // Replace input fields with sliders
  jQuery('#minRow, #maxRow, #minColumn, #maxColumn').each(function() {
    jQuery(this).slider({
      min: -50, // Set minimum and maximum values
      max: 50,
      slide: function(event, ui) {
        // Update the corresponding input value on slide
        jQuery(this).siblings('input').val(ui.value);
      }
    });
    // Update the slider value based on the input field
    jQuery(this).siblings('input').on('input', function() {
      jQuery(this).prev('.ui-slider').slider('value', jQuery(this).val());
    });
  });

  // Initialize tabs
  jQuery('#tabs').tabs();

  // Function to create new tabs for generated tables
  function createTab(tabId, tableHtml, tabLabel) {
    // Create a new tab structure
    const newTab = '<div id="' + tabId + '">' + tableHtml + '</div>';
    const ul = jQuery('#tabs ul');
    const tabCount = ul.children('li').length + 1;
  
    // Append a new list item for the tab label
    ul.append('<li><a href="#' + tabId + '">' + tabLabel + '</a></li>');
  
    // Append the new tab content
    jQuery('#tabs').append(newTab);
  
    // Refresh the tabs
    jQuery('#tabs').tabs('refresh');
    jQuery('#tabs').tabs('option', 'active', tabCount - 1);
  }

  // Function to delete individual tab
  function deleteTab(tabId) {
    jQuery('#' + tabId).remove();
    jQuery('#tabs').tabs('refresh');
  }

  // Function to delete multiple tabs
  function deleteMultipleTabs(tabIds) {
    tabIds.forEach(tabId => jQuery('#' + tabId).remove());
    jQuery('#tabs').tabs('refresh');
  }

});