describe('Login and Lab Management CRUD Tests', function () {

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
  
    // Test Case 1: Add a new lab test
    it('should add a new lab test successfully', function () {
      cy.visit('http://localhost:5173/lab-management'); // Visit the lab management page
  
      // Open the 'Add Test' modal
      cy.get('button').contains('Add Test').click();
  
      // Fill out the form to add a new lab test
      cy.get('input[name="testName"]').type('Blood Test'); // Enter valid test name
      cy.get('input[name="patientName"]').type('John Doe'); // Enter valid patient name
      cy.get('input[name="testDate"]').type('2025-12-31'); // Enter valid test date
      cy.get('select[name="status"]').select('Pending'); // Select status
  
      // Submit the form to add the test
      cy.get('button[type="submit"]').click(); // Click the 'Save' button
  
      // Assert that the new lab test is added to the table
      cy.get('table').contains('td', 'Blood Test'); // Assert the test's name appears in the table
    });
  
    // Test Case 2: Edit an existing lab test with Swal confirmation
    it('should edit an existing lab test with Swal confirmation', function () {
      cy.visit('http://localhost:5173/lab-management'); // Visit the lab management page
  
      // Assuming 'Blood Test' exists in the table, click the Edit button
      cy.get('td').contains('Blood Test') // Locate the row containing 'Blood Test'
        .parent() // Get the parent row (tr element)
        .find('button') // Find the button inside the row
        .filter('.edit-btn') // Ensure we're targeting the correct Edit button (based on the class name)
        .click(); // Click the Edit button
  
      // Modify lab test details in the form
      cy.get('input[name="testName"]').clear().type('Updated Blood Test'); // Update name to 'Updated Blood Test'
      cy.get('input[name="patientName"]').clear().type('Jane Doe'); // Update patient name to 'Jane Doe'
      cy.get('input[name="testDate"]').clear().type('2026-01-01'); // Update test date
      cy.get('select[name="status"]').select('Completed'); // Update status
  
      // Submit the form to save changes (trigger Swal confirmation)
      cy.get('button[type="submit"]').click(); // Click the 'Save' button
  
      // Confirm the update in the Swal modal
      cy.get('.swal2-confirm').click(); // Click the confirm button
  
      // Assert that the lab test's details have been updated in the table
      cy.get('table').contains('td', 'Updated Blood Test'); // Assert that the updated test's name appears in the table
    });
  
    // Test Case 3: Search for a lab test
    it('should filter lab tests based on the search term', function () {
      cy.visit('http://localhost:5173/lab-management'); // Visit the lab management page
  
      // Enter the search term
      cy.get('input[placeholder="Search lab tests..."]').type('Blood Test'); // Search for "Blood Test"
  
      // Assert that the filtered lab tests contain "Blood Test"
      cy.get('table').contains('td', 'Blood Test'); // Assert the filtered test's name appears in the table
    });
  
    // Test Case 4: Delete a lab test
    it('should delete a lab test successfully', function () {
      cy.visit('http://localhost:5173/lab-management'); // Visit the lab management page
  
      // Wait for the table to load and ensure that 'Blood Test' exists in the table
      cy.get('table').contains('td', 'Blood Test').should('be.visible'); // Ensure 'Blood Test' is in the table
  
      // Locate the Delete button more precisely
      cy.get('td').contains('Blood Test') // Locate the row containing 'Blood Test'
        .parent() // Get the parent (the tr element of the table)
        .find('button') // Find the button within that row
        .filter('.delete-btn') // Use a more specific class for the delete button
        .click(); // Click the Delete button
  
      // Confirm the deletion in the Swal modal
      cy.get('.swal2-confirm').click(); // Click the confirm button
  
      // Assert that the lab test has been removed from the table
      cy.get('table').should('not.contain', 'Blood Test'); // Assert that the deleted test is not in the table
    });
  
  });
  