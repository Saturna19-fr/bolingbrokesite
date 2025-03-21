"use server"

export const sendDiscordMessage = async (message: string) => {
  try {
    // A fetch request to send data through the discord
    // webhook, and display it as a message in your
    // discord channel
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      throw new Error("DISCORD_WEBHOOK_URL is not defined in the environment variables.");
    }

    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: message,
      }),
    });
  } catch (err: any) {
    // Just in case :)
    console.log(err.message)
  }
}