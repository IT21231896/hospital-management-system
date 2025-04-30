describe('Login and Ward Management CRUD Tests', function () {

    // Before each test, simulate login and set the token in localStorage
    beforeEach(() => {
      cy.clearCookies();
      cy.clearLocalStorage();
  
      // Simulate login with valid credentials
      cy.visit('http://localhost:5173/login'); // Visit the login page
      cy.get('input[name="email"]').type('admin@example.com'); // Type valid email
      cy.get('input[name="password"]').type('123456'); // Type valid password
      cy.get('button').contains('Login').click(); // Click the Login button
  
      // Assert that the user is redirected to the Dashboard page after login
      cy.url().should('include', '/dashboard'); // Ensure we are on the Dashboard page
  
      // Simulate a logged-in user by setting a mock token in localStorage
      localStorage.setItem('token', 'mock-jwt-token');
    });
  
    // Test Case 1: Add a new ward
    it('should add a new ward successfully', function () {
      cy.visit('http://localhost:5173/ward-management'); // Visit the ward management page
  
      // Open the 'Add Ward' modal
      cy.get('button').contains('Add Ward').click();
  
      // Fill out the form to add a new ward
      cy.get('input[name="name"]').type('General Ward'); // Enter valid name
      cy.get('input[name="totalBeds"]').type('100'); // Enter total beds
      cy.get('input[name="occupiedBeds"]').type('50'); // Enter occupied beds
      cy.get('input[name="type"]').type('General'); // Enter ward type
  
      // Submit the form to add the ward
      cy.get('button[type="submit"]').click(); // Click the 'Save' button
  
      // Assert that the new ward is added to the table
      cy.get('table').contains('td', 'General Ward'); // Assert the ward's name appears in the table
    });
  
    // Test Case 2: Edit an existing ward with Swal confirmation
    it('should edit an existing ward with Swal confirmation', function () {
      cy.visit('http://localhost:5173/ward-management'); // Visit the ward management page
  
      // Assuming 'General Ward' exists in the table, click the Edit button
      cy.get('td').contains('General Ward') // Locate the ward row containing 'General Ward'
        .parent() // Get the parent row (tr element)
        .find('button') // Find the button inside the row
        .filter('.edit-btn') // Ensure we're targeting the correct Edit button (based on the class name)
        .click(); // Click the Edit button
  
      // Modify ward details in the form
      cy.get('input[name="name"]').clear().type('Updated General Ward'); // Update the name to 'Updated General Ward'
      cy.get('input[name="totalBeds"]').clear().type('120'); // Update total beds to '120'
      cy.get('input[name="occupiedBeds"]').clear().type('60'); // Update occupied beds to '60'
      cy.get('input[name="type"]').clear().type('Critical'); // Update ward type to 'Critical'
  
      // Submit the form to save changes (trigger Swal confirmation)
      cy.get('button[type="submit"]').click(); // Click the 'Save' button
  
      // Confirm the update in the Swal modal
      cy.get('.swal2-confirm').click(); // Click the confirm button
  
      // Assert that the ward's details have been updated in the table
      cy.get('table').contains('td', 'Updated General Ward'); // Assert the updated ward's name appears in the table
    });
  
    // Test Case 3: Search for a ward
    it('should filter wards based on the search term', function () {
      cy.visit('http://localhost:5173/ward-management'); // Visit the ward management page
  
      // Enter the search term
      cy.get('input[placeholder="Search wards..."]').type('General'); // Search for "General"
  
      // Assert that the filtered wards contain "General"
      cy.get('table').contains('td', 'General Ward'); // Assert the filtered ward's name appears in the table
    });
  
    // Test Case 4: Delete a ward
    it('should delete a ward successfully', function () {
      cy.visit('http://localhost:5173/ward-management'); // Visit the ward management page
  
      // Wait for the table to load and ensure that 'General Ward' exists in the table
      cy.get('table').contains('td', 'General Ward').should('be.visible'); // Ensure 'General Ward' is in the table
  
      // Locate the Delete button more precisely
      cy.get('td').contains('General Ward') // Locate the ward row containing 'General Ward'
        .parent() // Get the parent (the tr element of the table)
        .find('button') // Find the button within that row
        .filter('.delete-btn') // Use a more specific class for the delete button
        .click(); // Click the Delete button
  
      // Confirm the deletion in the Swal modal
      cy.get('.swal2-confirm').click(); // Click the confirm button
  
      // Assert that the ward has been removed from the table
      cy.get('table').should('not.contain', 'General Ward'); // Assert that the deleted ward is not in the table
    });
  });
  