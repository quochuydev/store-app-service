const { Telegraf } = require("telegraf");
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

let chatId = null;

bot.command("start", (ctx) => {
  console.log(ctx.from);
  chatId = ctx.chat.id;

  bot.telegram.sendMessage(
    ctx.chat.id,
    "hello there! Welcome to my new telegram bot.",
    {}
  );
});

bot.launch();
