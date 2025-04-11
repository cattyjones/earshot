const { App, ExpressReceiver } = require("@slack/bolt");
const axios = require("axios");
const express = require("express");
const fs = require("fs");

// Set up ExpressReceiver to manage custom endpoints
const receiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  endpoints: "/slack/events",
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver,
});

// Handle @mentions in threads
app.event("app_mention", async ({ event, client }) => {
  console.log("👂 Earshot was mentioned!");
  console.log("Event details:", event);

  try {
    // Fetch the full thread
    const result = await client.conversations.replies({
      channel: event.channel,
      ts: event.thread_ts || event.ts,
    });

    const threadText = result.messages.map((msg) => msg.text).join("\n");

    // Extract the user's direction from the @mention
    const userPrompt = event.text.replace(/<@[^>]+>/, "").trim();
    const prompt = `
${userPrompt || "Write a blog post based on the following discussion:"}

Here is the full Slack thread:
${threadText}
    `.trim();

    console.log("📝 Prompt for Claude:", prompt);

    // Send to Claude 2.1
    const claudeRes = await axios.post(
      "https://api.anthropic.com/v1/messages",
      {
        model: "claude-3-sonnet-20240229",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 1024,
      },
      {
        headers: {
          "x-api-key": process.env.CLAUDE_API_KEY,
          "content-type": "application/json",
          "anthropic-version": "2023-06-01",
        },
      },
    );

    const blogText = claudeRes.data.content[0].text;
    console.log("✅ Received blog from Claude");

    // Write blog to a .txt file
    const filePath = "blog.txt";
    fs.writeFileSync(filePath, blogText);

    // Upload the blog as a .txt snippet using Slack's uploadV2
    await client.files.uploadV2({
      channel_id: event.channel,
      thread_ts: event.thread_ts || event.ts,
      initial_comment: "📝 Blog post from Earshot (formatted as snippet)",
      file: filePath,
      filename: "earshot-blog.txt",
    });

    // Follow-up reply in the original thread
    await client.chat.postMessage({
      channel: event.channel,
      thread_ts: event.ts,
      text: "Blog post below",
    });

    console.log("📎 Blog snippet uploaded + thread reply sent");
  } catch (error) {
    console.error(
      "❌ Error in Earshot handler:",
      error.response?.data || error.message,
    );
  }
});

// Simple status endpoint
receiver.app.get("/", (req, res) => {
  res.send("Earshot is running!");
});

// Start the app
receiver.app.listen(3000, "0.0.0.0", () => {
  console.log("⚡️ Earshot is listening at http://0.0.0.0:3000");
});
