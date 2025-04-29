describe('Login Page Tests', function () {
  
  // Clear cookies and local storage before each test to avoid session persistence issues
  beforeEach(() => {
    cy.clearCookies();         // Clear all cookies
    cy.clearLocalStorage();    // Clear local storage
  });

  // Test Case 1: Successful login with valid credentials
  it('should log in with valid credentials', function () {
    cy.visit('http://localhost:5173/login'); // Visit the login page
    cy.get('input[name="email"]').type('admin@example.com'); // Type valid email
    cy.get('input[name="password"]').type('123456'); // Type valid password
    cy.get('button').contains('Login').click(); // Click the Login button
    cy.url().should('include', '/dashboard'); // Assert redirection to the Dashboard page
  });

  // Test Case 2: Login with invalid credentials
  it('should show an error message for invalid email or password', function () {
    cy.visit('http://localhost:5173/login'); // Visit the login page
    cy.get('input[name="email"]').type('wrong@example.com'); // Enter invalid email
    cy.get('input[name="password"]').type('wrongpassword'); // Enter invalid password
    cy.get('button').contains('Login').click(); // Click the Login button
    cy.get('.auth-error').should('contain', 'Login failed!'); // Assert error message
  });

});
