describe('Login and Doctor Management CRUD Tests', function () {

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

  // Test Case 1: Add a new doctor
  it('should add a new doctor successfully', function () {
    cy.visit('http://localhost:5173/doctor-management'); // Visit the doctor management page

    // Open the 'Add Doctor' modal
    cy.get('button').contains('Add Doctor').click();

    // Fill out the form to add a new doctor
    cy.get('input[name="name"]').type('Dr. John Doe'); // Enter valid name
    cy.get('input[name="specialization"]').type('Cardiologist'); // Enter valid specialization
    cy.get('input[name="contact"]').type('john.doe@example.com'); // Enter valid contact email
    cy.get('input[name="availability"]').type('Mon-Fri, 9 AM - 5 PM'); // Enter valid availability

    // Submit the form to add the doctor
    cy.get('button[type="submit"]').click(); // Click the 'Save' button

    // Assert that the new doctor is added to the table
    cy.get('table').contains('td', 'Dr. John Doe'); // Assert the doctor's name appears in the table
  });

  // Test Case 2: Edit an existing doctor with Swal confirmation
  it('should edit an existing doctor with Swal confirmation', function () {
    cy.visit('http://localhost:5173/doctor-management'); // Visit the doctor management page

    // Assuming 'Dr. John Doe' exists in the table, click the Edit button
    cy.get('td').contains('Dr. John Doe') // Locate the doctor row containing 'Dr. John Doe'
      .parent() // Get the parent row (tr element)
      .find('button') // Find the button inside the row
      .filter('.edit-btn') // Ensure we're targeting the correct Edit button (based on the class name)
      .click(); // Click the Edit button

    // Modify doctor details in the form
    cy.get('input[name="contact"]').clear().type('newDoe@example.com'); // Update name to 'Dr. John Smith'
    cy.get('input[name="specialization"]').clear().type('Neurologist'); // Update specialization to 'Neurologist'

    // Submit the form to save changes (trigger Swal confirmation)
    cy.get('button[type="submit"]').click(); // Click the 'Save' button


    // Confirm the update in the Swal modal
    cy.get('.swal2-confirm').click(); // Click the confirm button


    // Assert that the doctor's details have been updated in the table
    cy.get('table').contains('td', 'newDoe@example.com'); // Assert that the updated doctor's name appears in the table
  });

  // Test Case 3: Search for a doctor
  it('should filter doctors based on the search term', function () {
    cy.visit('http://localhost:5173/doctor-management'); // Visit the doctor management page

    // Enter the search term
    cy.get('input[placeholder="Search doctors..."]').type('Dr. John'); // Search for "Dr. John"

    // Assert that the filtered doctors contain "Dr. John"
    cy.get('table').contains('td', 'Dr. John'); // Assert the filtered doctor's name appears in the table
  });

  // Test Case 4: Delete a doctor
  it('should delete a doctor successfully', function () {
    cy.visit('http://localhost:5173/doctor-management'); // Visit the doctor management page

    // Wait for the table to load and ensure that 'Dr. John Doe' exists in the table
    cy.get('table').contains('td', 'Dr. John Doe').should('be.visible'); // Ensure Dr. John Doe is in the table

    // Locate the Delete button more precisely
    cy.get('td').contains('Dr. John Doe') // Locate the doctor row containing 'Dr. John Doe'
      .parent() // Get the parent (the tr element of the table)
      .find('button') // Find the button within that row
      .filter('.delete-btn') // Use a more specific class for the delete button
      .click(); // Click the Delete button

    // Confirm the deletion in the Swal modal
    cy.get('.swal2-confirm').click(); // Click the confirm button

    // Assert that the doctor has been removed from the table
    cy.get('table').should('not.contain', 'Dr. John Doe'); // Assert that the deleted doctor is not in the table
  });



});
