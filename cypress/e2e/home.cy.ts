describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should load the home page and display map", () => {
    cy.get("iframe").should("exist");
  });

  it("should allow user to enter an address", () => {
    cy.get("input[placeholder='Enter Delivery Address']")
      .type("123 Main St, New York")
      .should("have.value", "123 Main St, New York");
  });

  it("should trigger 'Share Location' button", () => {
    cy.get("button").contains("Share Location").click();
  });

  it("should trigger 'Find Restaurants' button", () => {
    cy.get("button").contains("Find Restaurants").click();
  });
});

describe("Location Dropdown", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display city and name in the dropdown", () => {
    cy.get(".p-dropdown").click();
    cy.get(".p-dropdown-item").should("contain", "Berlin, Germany");
  });

  it("should allow selecting a location", () => {
    cy.get(".p-dropdown").click();
    cy.get(".p-dropdown-item").contains("Nicosia, Cyprus").click();
    cy.get(".p-dropdown-label").should("contain", "Nicosia, Cyprus");
  });
});

describe("Restaurants", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display restaurant list", () => {
    cy.get("button").contains("Share Location").click();
    cy.get("button").contains("Find Restaurants").click();
    cy.get("#restaurants h2").should("contain", "Explore Restaurants");
  });
});
