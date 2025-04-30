describe('Login and Patient Management CRUD Tests', function () {

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
  
    // Test Case 1: Add a new patient
    it('should add a new patient successfully', function () {
      cy.visit('http://localhost:5173/patient-management'); // Visit the patient management page
  
      // Open the 'Add Patient' modal
      cy.get('button').contains('Add Patient').click();
  
      // Fill out the form to add a new patient
      cy.get('input[name="name"]').type('John Doe'); // Enter valid name
      cy.get('input[name="age"]').type('45'); // Enter valid age
      cy.get('input[name="contact"]').type('john.doe@example.com'); // Enter valid contact email
      cy.get('input[name="diagnosis"]').type('Flu'); // Enter valid diagnosis
  
      // Submit the form to add the patient
      cy.get('button[type="submit"]').click(); // Click the 'Save' button
  
      // Assert that the new patient is added to the table
      cy.get('table').contains('td', 'John Doe'); // Assert the patient's name appears in the table
    });
  
    // Test Case 2: Edit an existing patient with Swal confirmation
    it('should edit an existing patient with Swal confirmation', function () {
      cy.visit('http://localhost:5173/patient-management'); // Visit the patient management page
  
      // Assuming 'John Doe' exists in the table, click the Edit button
      cy.get('td').contains('John Doe') // Locate the row containing 'John Doe'
        .parent() // Get the parent row (tr element)
        .find('button') // Find the button inside the row
        .filter('.edit-btn') // Ensure we're targeting the correct Edit button (based on the class name)
        .click(); // Click the Edit button
  
      // Modify patient details in the form
      cy.get('input[name="name"]').clear().type('Jane Doe'); // Update name to 'Jane Doe'
      cy.get('input[name="age"]').clear().type('50'); // Update age to '50'
      cy.get('input[name="contact"]').clear().type('jane.doe@example.com'); // Update contact email
      cy.get('input[name="diagnosis"]').clear().type('Pneumonia'); // Update diagnosis
  
      // Submit the form to save changes (trigger Swal confirmation)
      cy.get('button[type="submit"]').click(); // Click the 'Save' button
  
      // Confirm the update in the Swal modal
      cy.get('.swal2-confirm').click(); // Click the confirm button
  
      // Assert that the patient's details have been updated in the table
      cy.get('table').contains('td', 'Jane Doe'); // Assert that the updated patient's name appears in the table
    });
  
    // Test Case 3: Search for a patient
    it('should filter patients based on the search term', function () {
      cy.visit('http://localhost:5173/patient-management'); // Visit the patient management page
  
      // Enter the search term
      cy.get('input[placeholder="Search patients..."]').type('Jane Doe'); // Search for "John Doe"
  
      // Assert that the filtered patients contain "John Doe"
      cy.get('table').contains('td', 'Jane Doe'); // Assert the filtered patient's name appears in the table
    });
  
    // Test Case 4: Delete a patient
    it('should delete a patient successfully', function () {
      cy.visit('http://localhost:5173/patient-management'); // Visit the patient management page
  
      // Wait for the table to load and ensure that 'John Doe' exists in the table
      cy.get('table').contains('td', 'Jane Doe').should('be.visible'); // Ensure 'John Doe' is in the table
  
      // Locate the Delete button more precisely
      cy.get('td').contains('Jane Doe') // Locate the row containing 'John Doe'
        .parent() // Get the parent (the tr element of the table)
        .find('button') // Find the button within that row
        .filter('.delete-btn') // Use a more specific class for the delete button
        .click(); // Click the Delete button
  
      // Confirm the deletion in the Swal modal
      cy.get('.swal2-confirm').click(); // Click the confirm button
  
      // Assert that the patient has been removed from the table
      cy.get('table').should('not.contain', 'Jane Doe'); // Assert that the deleted patient is not in the table
    });
  
  });
  