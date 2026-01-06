const url: string = "http://localhost:3000/";

const getDate = (addDays: number = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + addDays);
  return date.toLocaleDateString("es-ES", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};

describe("template spec", () => {
  beforeEach(() => {
    cy.visit(url);
  });

  it("check for current date", () => {
    cy.contains("Hoy").click();
    cy.contains(getDate()).should("be.visible");
  });

  it("check for tomorrow date", () => {
    cy.contains("Mañana").click();
    cy.contains(getDate(1)).should("be.visible");
  });

  it("check for yesterday date", () => {
    cy.contains("Ayer").click();
    cy.contains(getDate(-1)).should("be.visible");
  });

  it("check for countries starting with C", () => {
    let counter: number = 0;
    cy.get("table tbody tr td:nth-child(1)")
      .filter((_, el) => el.innerText.trim().startsWith("C"))
      .should("have.length.greaterThan", 0)
      .each(($el) => {
        cy.wrap($el)
          .siblings("td:nth-child(2)")
          .then((countryName) => {
            countryName.each((_, nameEl) => {
              const population = nameEl.innerText.trim().replace(/[,.]/g, "");
              if (Number(population) > 10_000_000) {
                counter++;
              }
            });
          })
          .then(() => {
            expect(counter).to.be.greaterThan(0);
          });
      });
  });

  afterEach(() => {
    console.log("Test completed");
  });
});
