import express from "express";

const bardRouter = express.Router();

bardRouter.get("/bard", async (req, res) => {
  const { message } = req.query;
  try {
    const response = await testAssistant(String(message));
    console.log("Bard:", response);
    res.json(response);
  } catch (error) {
    console.error("Error asking Bard AI:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

async function testAssistant(message) {
  try {
    import("bard-ai").then(({ default: Bard }) => {
      const BARD_API_KEY =
        "eQg7cjJw8y9ZDH-BkMNYxNLoNFKmi8FjIVwqeqg7q5YHoIy07KJIW3GRf2i31evWEdgfaw.";

      const bard = new Bard(BARD_API_KEY);

      bard.ask(String(message)).then((response) => {
        return response;
      });
    });
    // const assistant = new BardAPI();

    // // Set session information for authentication
    // await assistant.setSession(
    //   "__Secure-1PSID",
    //   "eQg7cjJw8y9ZDH-BkMNYxNLoNFKmi8FjIVwqeqg7q5YHoIy07KJIW3GRf2i31evWEdgfaw."
    // );

    // const response = await assistant.getBardResponse(message);
    // return response;
  } catch (error) {
    console.error("Error in testAssistant:", error);
    throw error; // Re-throw the error for the calling function to handle
  }
}

export default bardRouter;
