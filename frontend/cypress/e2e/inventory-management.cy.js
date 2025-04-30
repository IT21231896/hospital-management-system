describe('Login and Inventory Management CRUD Tests', function () {

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

  // Test Case 1: Add a new inventory item
  it('should add a new inventory item successfully', function () {
    cy.visit('http://localhost:5173/inventory-management'); // Visit the inventory management page

    // Open the 'Add Item' modal
    cy.get('button').contains('Add Item').click();

    // Fill out the form to add a new inventory item
    cy.get('input[name="name"]').type('Test Item'); // Enter valid item name
    cy.get('input[name="quantity"]').type('100'); // Enter valid quantity
    cy.get('input[name="supplier"]').type('Test Supplier'); // Enter valid supplier
    cy.get('input[name="expiryDate"]').type('2025-12-31'); // Enter valid expiry date

    // Submit the form to add the item
    cy.get('button[type="submit"]').click(); // Click the 'Save' button

    // Assert that the new item is added to the table
    cy.get('table').contains('td', 'Test Item'); // Assert the item's name appears in the table
  });

  // Test Case 2: Edit an existing inventory item with Swal confirmation
  it('should edit an existing inventory item with Swal confirmation', function () {
    cy.visit('http://localhost:5173/inventory-management'); // Visit the inventory management page

    // Assuming 'Test Item' exists in the table, click the Edit button
    cy.get('td').contains('Test Item') // Locate the row containing 'Test Item'
      .parent() // Get the parent row (tr element)
      .find('button') // Find the button inside the row
      .filter('.edit-btn') // Ensure we're targeting the correct Edit button (based on the class name)
      .click(); // Click the Edit button

    // Modify inventory item details in the form
    cy.get('input[name="name"]').clear().type('Updated Item'); // Update name to 'Updated Item'
    cy.get('input[name="quantity"]').clear().type('200'); // Update quantity to '200'
    cy.get('input[name="supplier"]').clear().type('Updated Supplier'); // Update supplier to 'Updated Supplier'
    cy.get('input[name="expiryDate"]').clear().type('2026-01-01'); // Update expiry date

    // Submit the form to save changes (trigger Swal confirmation)
    cy.get('button[type="submit"]').click(); // Click the 'Save' button

    // Confirm the update in the Swal modal
    cy.get('.swal2-confirm').click(); // Click the confirm button

    // Assert that the inventory item's details have been updated in the table
    cy.get('table').contains('td', 'Updated Item'); // Assert that the updated item's name appears in the table
  });

  // Test Case 3: Search for an inventory item
  it('should filter inventory items based on the search term', function () {
    cy.visit('http://localhost:5173/inventory-management'); // Visit the inventory management page

    // Enter the search term
    cy.get('input[placeholder="Search inventory..."]').type('Test Item'); // Search for "Test Item"

    // Assert that the filtered items contain "Test Item"
    cy.get('table').contains('td', 'Test Item'); // Assert the filtered item's name appears in the table
  });

  // Test Case 4: Delete an inventory item
  it('should delete an inventory item successfully', function () {
    cy.visit('http://localhost:5173/inventory-management'); // Visit the inventory management page

    // Wait for the table to load and ensure that 'Test Item' exists in the table
    cy.get('table').contains('td', 'Test Item').should('be.visible'); // Ensure 'Test Item' is in the table

    // Locate the Delete button more precisely
    cy.get('td').contains('Test Item') // Locate the row containing 'Test Item'
      .parent() // Get the parent (the tr element of the table)
      .find('button') // Find the button within that row
      .filter('.delete-btn') // Use a more specific class for the delete button
      .click(); // Click the Delete button

    // Confirm the deletion in the Swal modal
    cy.get('.swal2-confirm').click(); // Click the confirm button

    // Assert that the item has been removed from the table
    cy.get('table').should('not.contain', 'Test Item'); // Assert that the deleted item is not in the table
  });

});
