import express, { Request, Response, Router } from "express";
import axios from "axios";

const YtRouter: Router = express.Router();
const createVideoEndpoint = (path: string) => {
  YtRouter.get(path, async (req: Request, res: Response) => {
    try {
      const queryParams = new URLSearchParams(
        req.query as Record<string, string>
      );

      if (Object.keys(req.query).length === 0) {
        return res
          .status(400)
          .json({ message: "No query parameters provided" });
      }

      const apiUrl = `https://youtube.googleapis.com/youtube/v3${path}?${queryParams.toString()}`;
      console.log(apiUrl);

      const response = await axios.get(apiUrl);
      const data = response.data;
      res.json({ [path]: data }); // Send response with dynamic key
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch YouTube data" });
    }
  });
};

createVideoEndpoint("/videos");
createVideoEndpoint("/search");
createVideoEndpoint("/channels");
createVideoEndpoint("/commentThreads");
createVideoEndpoint("/thumbnails");
createVideoEndpoint("/members");
createVideoEndpoint("/comments");
createVideoEndpoint("/activities");
export default YtRouter;
