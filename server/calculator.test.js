describe("GET /api/", () => {
    it("should return hello world", async () => {
      const res = await fetch("http://localhost:4002/api/").then((response) => {
        expect(response.status).toBe(200);
        return response.json();

    })
      .then((data) => {
        expect(data.txt).toBe('Hello World!');
      });
    });
});

describe("GET /api/calculate", () => {
  it("5! should return 120", async () => {
    const result = await fetch("http://localhost:4002/api/calculate",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({str: "5!"})
    })
    .then((response) => response.json())
    .then((data) => {
      expect(data.result).toBe('120');
    });
  });
});

describe("GET /api/calculate", () => {
  it("9^3 should return 729", async () => {
    const result = await fetch("http://localhost:4002/api/calculate",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({str: "9^3"})
    })
    .then((response) => response.json())
    .then((data) => {
      expect(data.result).toBe('729');
    });
  });
});

describe("GET /api/calculate", () => {
  it("Ln 69 should return 4.23410650459726", async () => {
    const result = await fetch("http://localhost:4002/api/calculate",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({str: "ln69"})
    })
    .then((response) => response.json())
    .then((data) => {
      expect(data.result).toBe('4.23410650459726');
    });
  });
});

describe("GET /api/calculate", () => {
  it("√64 should return 8", async () => {
    const result = await fetch("http://localhost:4002/api/calculate",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({str: "√64"})
    })
    .then((response) => response.json())
    .then((data) => {
      expect(data.result).toBe('8');
    });
  });
});