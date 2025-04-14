Turns slack discussions into blog posts with AI.

**Overview**

Earshot is a slack bot that listens for mentions in threads, captures the entire conversation, and uses Anthropic's Claude 3.7 Sonnet to generate a well-structured blog post based on the discussion. The blog post is then delivered back to the thread as a text file.

**Features**

Simple Integration: Tag @Earshot in any Slack thread
Contextual Understanding: Processes the entire conversation thread for coherent output
Custom Prompting: Add specific instructions when tagging for tailored results
Instant Delivery: Returns the blog post directly in the thread

**How It Works**

Tag @Earshot in any Slack thread
Optionally include specific instructions with your tag
Earshot captures the entire thread conversation
The bot sends the conversation to Claude 3.7 Sonnet
A formatted blog post is returned to the thread as a text file

**Installation
Prerequisites**

Node.js (v14+)
Slack workspace with permission to add apps
Anthropic API key

**Setup**

Clone this repository:
bashgit clone https://github.com/cattyjones/earshot.git
cd earshot

Install dependencies:bashnpm install

Create a .env file with your credentials:
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_SIGNING_SECRET=your-signing-secret
CLAUDE_API_KEY=your-anthropic-api-key

Set up your Slack app:

Create a new Slack app at api.slack.com
Add the app_mentions:read, channels:history, chat:write, and files:write scopes
Enable Event Subscriptions and subscribe to the app_mention event
Install the app to your workspace


Start the server:
bashnode index.js

Expose your local server (for development):

Use a tool like ngrok: ngrok http 3000
Update your Slack app's Event Subscriptions URL to your ngrok URL + /slack/events



**Usage** 

Basic Usage
- Simply tag @Earshot in any thread or @Earshot with custom instructions
- Focus on the technical aspects and format with bullet points
Deployment


Heroku
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
