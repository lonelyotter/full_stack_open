describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user1 = {
      name: "root",
      username: "root",
      password: "root",
    };

    const user2 = {
      name: "root2",
      username: "root2",
      password: "root2",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user1);
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user2);
    cy.visit("");
  });

  it("Login form is shown", function () {
    cy.contains("log in to application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("root");
      cy.get("#password").type("root");
      cy.get("#login-button").click();

      cy.contains("root logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("root");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.contains("Wrong username or password");

      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "root", password: "root" });
    });

    it("A blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("a blog created by cypress");
      cy.get("#author").type("cypress");
      cy.get("#url").type("www.cypress.com");
      cy.get("#create-button").click();

      cy.contains("a blog created by cypress");
    });

    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "a blog created by cypress",
          author: "cypress",
          url: "www.cypress.com",
        });
      });

      it("it can be liked", function () {
        cy.contains("show").click();
        cy.contains("like").click();

        cy.contains("likes 1");
      });

      it("it can be deleted by the owner", function () {
        cy.contains("show").click();
        cy.contains("delete").click();

        cy.get("html").should("not.contain", "a blog created by cypress");
      });

      it("it can not be deleted by another user", function () {
        cy.contains("logout").click();
        cy.login({ username: "root2", password: "root2" });
        cy.contains("show").click();
        cy.get("html").should("not.contain", "delete");
      });
    });

    describe("and multiple blogs exist", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "The title with the second most likes",
          author: "cypress",
          url: "www.cypress.com",
          likes: 5,
        });
        cy.createBlog({
          title: "The title with the most likes",
          author: "cypress",
          url: "www.cypress.com",
          likes: 10,
        });
      });

      it.only("they are ordered by likes", function () {
        cy.get(".blog")
          .eq(0)
          .should("contain", "The title with the most likes");
        cy.get(".blog")
          .eq(1)
          .should("contain", "The title with the second most likes");
      });
    });
  });
});
