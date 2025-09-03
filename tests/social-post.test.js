// Social Post Component Tests
// Simple test suite for the social-post web component

class TestSuite {
  constructor() {
    this.tests = [];
    this.results = [];
  }

  addTest(name, testFn) {
    this.tests.push({ name, testFn });
  }

  async runTests() {
    console.log("🧪 Running Social Post Component Tests...\n");

    for (const test of this.tests) {
      try {
        const result = await test.testFn();
        this.results.push({ name: test.name, passed: result, error: null });
        console.log(`✅ ${test.name}`);
      } catch (error) {
        this.results.push({
          name: test.name,
          passed: false,
          error: error.message,
        });
        console.log(`❌ ${test.name} - Error: ${error.message}`);
      }
    }

    this.displaySummary();
  }

  displaySummary() {
    const passed = this.results.filter((r) => r.passed).length;
    const total = this.results.length;
    const successRate = Math.round((passed / total) * 100);

    console.log("\n📊 Test Summary:");
    console.log(`Total Tests: ${total}`);
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${total - passed}`);
    console.log(`Success Rate: ${successRate}%`);
  }
}

// Test functions
function testComponentDefinition() {
  return customElements.get("social-post") !== undefined;
}

function testBasicInstantiation() {
  const post = document.createElement("social-post");
  return post instanceof HTMLElement && post.shadowRoot !== null;
}

function testAttributeGetters() {
  const post = document.createElement("social-post");
  post.setAttribute("username", "testuser");
  post.setAttribute("display-name", "Test User");
  post.setAttribute("likes", "42");

  return (
    post.username === "testuser" &&
    post.displayName === "Test User" &&
    post.likes === 42
  );
}

function testPropertySetters() {
  const post = document.createElement("social-post");
  post.username = "proptest";
  post.displayName = "Property Test";
  post.likes = 25;
  post.theme = "dark";

  return (
    post.username === "proptest" &&
    post.displayName === "Property Test" &&
    post.likes === 25 &&
    post.theme === "dark"
  );
}

function testIncrementLikes() {
  const post = document.createElement("social-post");
  post.likes = 10;
  const initialLikes = post.likes;
  post.incrementLikes();

  return post.likes === initialLikes + 1;
}

function testSetTheme() {
  const post = document.createElement("social-post");
  post.setTheme("dark");

  return post.theme === "dark";
}

function testContentTruncation() {
  const post = document.createElement("social-post");
  const longContent =
    "This is a very long piece of content that should definitely be truncated because it exceeds the normal length limit for social media posts and would take up too much space in the UI.";
  post.content = longContent;

  return post.isContentTruncated();
}

function testRenderingWithoutErrors() {
  const post = document.createElement("social-post");
  post.username = "testuser";
  post.displayName = "Test User";
  post.content = "Test content";

  document.body.appendChild(post);
  const hasContent = post.shadowRoot.innerHTML.length > 0;
  document.body.removeChild(post);

  return hasContent;
}

// Run tests when component is ready
if (typeof window !== "undefined") {
  // Browser environment
  customElements.whenDefined("social-post").then(() => {
    const suite = new TestSuite();

    suite.addTest("Component is defined", testComponentDefinition);
    suite.addTest("Basic instantiation works", testBasicInstantiation);
    suite.addTest("Attribute getters work", testAttributeGetters);
    suite.addTest("Property setters work", testPropertySetters);
    suite.addTest("incrementLikes() method works", testIncrementLikes);
    suite.addTest("setTheme() method works", testSetTheme);
    suite.addTest("Content truncation detection works", testContentTruncation);
    suite.addTest(
      "Component renders without errors",
      testRenderingWithoutErrors
    );

    suite.runTests();
  });
} else {
  // Node.js environment
  module.exports = {
    TestSuite,
    testComponentDefinition,
    testBasicInstantiation,
    testAttributeGetters,
    testPropertySetters,
    testIncrementLikes,
    testSetTheme,
    testContentTruncation,
    testRenderingWithoutErrors,
  };
}
