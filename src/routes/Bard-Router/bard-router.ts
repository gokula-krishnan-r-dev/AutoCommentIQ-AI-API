import express, { NextFunction, Request, Response } from "express";
import { verifyToken } from "../../utils/verifyToken";
const { BardAPI } = require("bard-api-node");

const bardRouter = express.Router();

bardRouter.get("/bard", verifyToken, async (req, res) => {
  const { message } = req.query;
  try {
    // const response = await Bard.ask(String(message));
    async function testAssistant() {
      try {
        const assistant = new BardAPI();

        // Set session information for authentication
        await assistant.setSession(
          "__Secure-1PSID",
          "eQg7cjJw8y9ZDH-BkMNYxNLoNFKmi8FjIVwqeqg7q5YHoIy07KJIW3GRf2i31evWEdgfaw."
        );

        const response = await assistant.getBardResponse(message);
        console.log("Bard:", response.content);
        return res.send(response);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    testAssistant();
  } catch (error) {
    console.error("Error asking Bard AI:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
export default bardRouter;
