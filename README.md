# Earshot

Turn Slack conversations into blog posts with AI.

---

## 🧠 Overview

**Earshot** is a Slack bot that listens for mentions in threads, captures the full conversation, and uses **Claude 3.7 Sonnet** from Anthropic to generate a structured, high-quality blog post. The final output is delivered directly into the Slack thread as a formatted `.txt` file.

---

## ✨ Features

- **Simple Integration** – Just tag `@earshot` in any Slack thread  
- **Contextual Understanding** – Captures the full conversation for deep context  
- **Custom Prompting** – Add specific instructions with your tag to shape the output  
- **Instant Delivery** – Blog posts are returned right inside the thread  

---

## ⚙️ How It Works

1. Tag `@earshot` in any Slack thread  
2. Optionally include custom instructions in your message  
3. Earshot captures the full thread conversation  
4. The bot sends it to **Claude 3.7 Sonnet** via the Anthropic API  
5. A clean, formatted blog post is returned as a `.txt` file in the thread

---

## 🛠 Installation & Setup

### Prerequisites

- Node.js (v14 or later)
- Access to a Slack workspace (with permission to install apps)
- Anthropic API key (Claude 3.7 access)

### Setup

```bash
git clone https://github.com/cattyjones/earshot.git
cd earshot
npm install
```

### Create a `.env` file

```env
SLACK_BOT_TOKEN=xoxb-your-slack-token
SLACK_SIGNING_SECRET=your-slack-signing-secret
CLAUDE_API_KEY=your-anthropic-api-key
```

### Set up your Slack app

1. Go to [https://api.slack.com/apps](https://api.slack.com/apps) and create a new app
2. Enable the following **OAuth scopes**:
   - `app_mentions:read`
   - `channels:history`
   - `chat:write`
   - `files:write`
3. Enable **Event Subscriptions**:
   - Request URL: `https://your-server.com/slack/events`
   - Subscribe to the `app_mention` event
4. Install the app to your workspace

### Start the server

```bash
node index.js
```

---

## 🚧 Local Development (with ngrok)

If you are developing locally, use [ngrok](https://ngrok.com/) to expose your local server:

```bash
ngrok http 3000
```

Then, update your Slack Event Subscriptions URL to:

```
https://<your-ngrok-subdomain>.ngrok.io/slack/events
```

---

## 🚀 Deployment

Earshot can be deployed on:

- Heroku
- AWS
- Google Cloud
- DigitalOcean
- Replit (for quick testing)

Update your Event Subscriptions URL to match your production server.

---

## 🔐 Environment Variables

| Variable             | Description                     |
|----------------------|---------------------------------|
| `SLACK_BOT_TOKEN`    | Your Slack bot token (`xoxb-`)  |
| `SLACK_SIGNING_SECRET` | Your Slack app signing secret |
| `CLAUDE_API_KEY`     | Your Anthropic Claude API key   |

---

## 🧩 Customization

To customize how Earshot prompts Claude, edit the prompt text inside the `app_mention` event handler in `index.js`. This lets you shape the tone, format, or structure of the blog output.

---

## 🤝 Contributing

Contributions are welcome!  
Feel free to fork the repo and submit a pull request.

---

## 📄 License

MIT
AWS
Google Cloud
Digital Ocean

Update your Slack app's Event Subscriptions URL to point to your production server.
Environment Variables
VariableDescriptionSLACK_BOT_TOKENYour Slack bot token (xoxb-)SLACK_SIGNING_SECRETYour Slack signing secretCLAUDE_API_KEYYour Anthropic API key
Customization
You can customize the prompt sent to Claude by modifying the promptText variable in the app_mention event handler.
Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
License
MIT
