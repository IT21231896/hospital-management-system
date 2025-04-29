describe('Registration Page Tests', function () {

  // Test Case 1: Successful registration with valid credentials
  it('should register with valid credentials', function () {
    cy.visit('http://localhost:5173/register'); // Visit the registration page
    cy.get('input[name="name"]').type('John Doe'); // Enter valid name
    cy.get('input[name="email"]').type('john.doe@example.com'); // Enter valid email
    cy.get('input[name="password"]').type('password123'); // Enter valid password
    cy.get('input[name="confirmPassword"]').type('password123'); // Enter matching confirm password
    cy.get('button').contains('Sign Up').click(); // Click the Sign Up button
    cy.url().should('include', '/login');
  });

  // Test Case 2: Registration with mismatched passwords
  it('should show an error for mismatched passwords', function () {
    cy.visit('http://localhost:5173/register'); // Visit the registration page
    cy.get('input[name="name"]').type('John Doe'); // Enter valid name
    cy.get('input[name="email"]').type('john.doe@example.com'); // Enter valid email
    cy.get('input[name="password"]').type('password123'); // Enter password
    cy.get('input[name="confirmPassword"]').type('password456'); // Enter mismatched confirm password
    cy.get('button').contains('Sign Up').click(); // Click the Sign Up button
    cy.get('.auth-error').should('contain', 'Passwords do not match');
  });

});
