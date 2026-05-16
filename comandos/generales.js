const { downloadContentFromMessage } = require('@whiskeysockets/baileys')
const sharp = require('sharp')

const NO_DISPONIBLE = (cmd, nombre) => '*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n๑ " El comando *' + cmd + '* aun esta en desarrollo... ❄ "\n\n🕯️ Vuelve pronto, *' + nombre + '*...\n\n> [ ✰ ] Sandrone-MD'

module.exports = async (ctx) => {
  const { sock, msg, from, nombre, cmd, args, s, config, tienePrefijo } = ctx
  if (!cmd) return false

  if (cmd === 'menu') {
    await sock.sendMessage(from, {
      image: { url: config.MENU_IMG },
      caption: '*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n๑ " Hola *' + nombre + '* soy *Sandrone*, espero que tengas un lindo dia ❄ "\n︶ ⏝ ︶ ୨୧ ︶ ⏝ ︶\n  ░  ׅ 🖤  *Sandrone-MD* ֺ 🕯️\nੈ✰ֵ‧₊˚ 🖤 *Motor* ꢁ *Baileys Multi Device*\nੈ✿ֵ‧₊˚ ✨ *Modo* ꢁ *Publico*\nੈ❀ֵ‧₊˚ 👑 *Creador* ꢁ *Ofic_Nasuma*\n*───────────୨ৎ───────────*\n\n*─ׄ─ׅ─ׄ─⭒ Comandos Del Bot ⭒─ׄ─ׅ─ׄ─*\n\n          ִ ࣪ ˖ ࣪ `Iꭇꭉꬻꬽ` ! ᰔ ִ ׄ\n‧₊˚🖤 *::* menu\n‧₊˚🖤 *::* infomenu\n‧₊˚🖤 *::* info\n‧₊˚🖤 *::* ping\n‧₊˚🖤 *::* runtime\n‧₊˚🖤 *::* hora\n‧₊˚🖤 *::* creador\n‧₊˚🖤 *::* s\n‧₊˚🖤 *::* imgs\n‧₊˚🖤 *::* wikipedia\n\n‿    ׅ   𝆬     ε🖤з   𝆬     ׅ      ‿\n\n          ִ ࣪ ˖ ࣪ `Gᵃᵐᵉˢ` ! ᰔ ִ ׄ\n‧₊˚🖤 *::* ahorcado\n‧₊˚🖤 *::* trivia\n‧₊˚🖤 *::* numero\n‧₊˚🖤 *::* ppt\n‧₊˚🖤 *::* coinflip\n‧₊˚🖤 *::* acertijo\n‧₊˚🖤 *::* piropo\n‧₊˚🖤 *::* reto\n‧₊˚🖤 *::* dado\n‧₊˚🖤 *::* saludo\n\n‿    ׅ   𝆬     ε🖤з   𝆬     ׅ      ‿\n\n          ִ ࣪ ˖ ࣪ `Gʳᵒᵘᵖˢ` ! ᰔ ִ ׄ\n‧₊˚🖤 *::* ban\n‧₊˚🖤 *::* agregar\n‧₊˚🖤 *::* anuncio\n‧₊˚🖤 *::* tagall\n‧₊˚🖤 *::* link\n‧₊˚🖤 *::* onantispam\n‧₊˚🖤 *::* offantispam\n\n‿    ׅ   𝆬     ε🖤з   𝆬     ׅ      ‿\n\n          ִ ࣪ ˖ ࣪ `Pʳᵒˣⁱᵐᵃᵐᵉⁿᵗᵉ` ! ᰔ ִ ׄ\n‧₊˚🖤 *::* play\n‧₊˚🖤 *::* tiktok\n‧₊˚🖤 *::* trad\n‧₊˚🖤 *::* ia\n‧₊˚🖤 *::* clima\n\n*───────────୨ৎ───────────*\n> [ ✰ ] Sandrone-MD | Ofic_Nasuma'
    })
    return true
  }

  if (cmd === 'infomenu') {
    await sock.sendMessage(from, {
      image: { url: config.MENU_IMG },
      caption: '*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n๑ " Guia completa de comandos ❄ "\n︶ ⏝ ︶ ୨୧ ︶ ⏝ ︶\n\n*─ׄ─ׅ─ׄ─⭒ Guia Del Bot ⭒─ׄ─ׅ─ׄ─*\n\n          ִ ࣪ ˖ ࣪ `Iꭇꭉꬻꬽ` ! ᰔ ִ ׄ\n‧₊˚🖤 *::* menu — Menu principal\n‧₊˚🖤 *::* infomenu — Esta guia\n‧₊˚🖤 *::* info — Sobre Sandrone\n‧₊˚🖤 *::* ping — Velocidad del bot\n‧₊˚🖤 *::* runtime — Tiempo encendida\n‧₊˚🖤 *::* hora — Hora actual\n‧₊˚🖤 *::* creador — Info del creador\n‧₊˚🖤 *::* s — Imagen a sticker\n‧₊˚🖤 *::* imgs — Sticker a imagen\n‧₊˚🖤 *::* wikipedia <tema> — Busca en Wikipedia\n\n‿    ׅ   𝆬     ε🖤з   𝆬     ׅ      ‿\n\n          ִ ࣪ ˖ ࣪ `Gᵃᵐᵉˢ` ! ᰔ ִ ׄ\n‧₊˚🖤 *::* ahorcado — Adivina la palabra\n‧₊˚🖤 *::* trivia — Cultura general\n‧₊˚🖤 *::* numero — Adivina el numero\n‧₊˚🖤 *::* ppt — Piedra papel tijera\n‧₊˚🖤 *::* coinflip — Cara o cruz\n‧₊˚🖤 *::* acertijo — Resuelve el acertijo\n‧₊˚🖤 *::* piropo — Recibe un piropo\n‧₊˚🖤 *::* reto — Recibe un reto\n‧₊˚🖤 *::* dado — Dado del 1 al 6\n‧₊˚🖤 *::* saludo — Saludo especial\n\n‿    ׅ   𝆬     ε🖤з   𝆬     ׅ      ‿\n\n          ִ ࣪ ˖ ࣪ `Gʳᵒᵘᵖˢ` ! ᰔ ִ ׄ\n‧₊˚🖤 *::* ban @usuario — Expulsa miembro\n‧₊˚🖤 *::* agregar numero — Agrega miembro\n‧₊˚🖤 *::* anuncio mensaje — Anuncio oficial\n‧₊˚🖤 *::* tagall — Menciona a todos\n‧₊˚🖤 *::* link — Link del grupo\n‧₊˚🖤 *::* onantispam — Activa antispam\n‧₊˚🖤 *::* offantispam — Desactiva antispam\n\n*───────────୨ৎ───────────*\n> [ ✰ ] Sandrone-MD | Ofic_Nasuma'
    })
    return true
  }

  if (cmd === 'info') {
    await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n๑ " Soy *Sandrone*, una presencia silenciosa ❄ "\n︶ ⏝ ︶ ୨୧ ︶ ⏝ ︶\nੈ✰ֵ‧₊˚ 👤 *Creadora:* Ofic_Nasuma\nੈ✿ֵ‧₊˚ 🔖 *Version:* 2.0\nੈ❀ֵ‧₊˚ ⚙️ *Motor:* Baileys + Node.js\nੈ✰ֵ‧₊˚ 📱 *Plataforma:* WhatsApp\n\n🕯️ Estoy aqui para acompanarte con calma...\n\n*───────────୨ৎ───────────*\n> [ ✰ ] Sandrone-MD')
    return true
  }

  if (cmd === 'ping') {
    const inicio = Date.now()
    await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ 🏓 *Pong!*\nੈ✿ֵ‧₊˚ ⚡ *Velocidad:* ' + (Date.now() - inicio) + 'ms\n\n🕯️ Sandrone sigue en las sombras...\n\n*───────────୨ৎ───────────*\n> [ ✰ ] Sandrone-MD')
    return true
  }

  if (cmd === 'runtime') {
    const ms = Date.now() - config.INICIO
    const sec = Math.floor(ms/1000), min = Math.floor(sec/60), h = Math.floor(min/60), d = Math.floor(h/24)
    await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ ⏱️ *Runtime*\nੈ✿ֵ‧₊˚ ⏰ *' + d + 'd ' + (h%24) + 'h ' + (min%60) + 'm ' + (sec%60) + 's*\n\n🕯️ Siempre en las sombras...\n\n*───────────୨ৎ───────────*\n> [ ✰ ] Sandrone-MD')
    return true
  }

  if (cmd === 'hora') {
    const h = new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
    await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ 🕰️ *Hora actual*\nੈ✿ֵ‧₊˚ ⏰ *' + h + '*\n\n🕯️ El tiempo nunca se detiene, ' + nombre + '... 🖤\n\n*───────────୨ৎ───────────*\n> [ ✰ ] Sandrone-MD')
    return true
  }

  if (cmd === 'dado') {
    const n = Math.floor(Math.random() * 6) + 1
    await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ 🎲 *Dado del Destino*\nੈ✿ֵ‧₊˚ 🎯 *Resultado:* ' + n + '\n\n🕯️ El destino hablo, ' + nombre + '... 🖤\n\n*───────────୨ৎ───────────*\n> [ ✰ ] Sandrone-MD')
    return true
  }

  if (cmd === 'saludo') {
    await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n๑ " Un saludo especial para ti ❄ "\n︶ ⏝ ︶ ୨୧ ︶ ⏝ ︶\n\nੈ✰ֵ‧₊˚ 🌸 Bienvenido, *' + nombre + '*\nੈ✿ֵ‧₊˚ 🕯️ Es un placer tenerte aqui\nੈ❀ֵ‧₊˚ ✨ Que tu estancia sea agradable\n\n*───────────୨ৎ───────────*\n> [ ✰ ] Sandrone-MD')
    return true
  }

  if (cmd === 'creador') {
    try {
      const ppUrl = await sock.profilePictureUrl('51954507582@s.whatsapp.net', 'image')
      const res = await fetch(ppUrl)
      const imgBuffer = Buffer.from(await res.arrayBuffer())
      await sock.sendMessage(from, {
        image: imgBuffer,
        caption: '*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n๑ " La mente detras de las sombras ❄ "\n︶ ⏝ ︶ ୨୧ ︶ ⏝ ︶\nੈ✰ֵ‧₊˚ 👑 *Ofic_Nasuma*\nੈ✿ֵ‧₊˚ 📱 *+51 954 507 582*\nੈ❀ֵ‧₊˚ 🎮 *Sandrone-MD*\nੈ✰ֵ‧₊˚ 🌐 *GitHub:* Ofc-Nasuma\n\n*───────────୨ৎ───────────*\n> [ ✰ ] Sandrone-MD',
        buttons: [{ buttonId: 'btn_creador', buttonText: { displayText: '💬 Enviar Mensaje' }, type: 1 }],
        footer: '🖤 Sandrone-MD'
      })
    } catch(e) {
      await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ 👑 *Ofic_Nasuma*\nੈ✿ֵ‧₊˚ 📱 *+51 954 507 582*\nੈ❀ֵ‧₊˚ 🎮 *Sandrone-MD*\n\n*───────────୨ৎ───────────*\n> [ ✰ ] Sandrone-MD')
    }
    return true
  }

  if (cmd === 's') {
    const quoted = msg.message.extendedTextMessage?.contextInfo?.quotedMessage
    const imgMsg = quoted?.imageMessage
    if (!imgMsg) { await s('🕯️ Responde una imagen con *#s*, ' + nombre + '. 🖤'); return true }
    try {
      const stream = await downloadContentFromMessage(imgMsg, 'image')
      let buffer = Buffer.from([])
      for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk])
      const webp = await (require('sharp'))(buffer).webp().toBuffer()
      await sock.sendMessage(from, { sticker: webp })
    } catch(e) { await s('🕯️ No pude convertir esa imagen... 🖤') }
    return true
  }

  if (cmd === 'imgs') {
    const quoted = msg.message.extendedTextMessage?.contextInfo?.quotedMessage
    const stickerMsg = quoted?.stickerMessage
    if (!stickerMsg) { await s('🕯️ Responde un sticker con *#imgs*, ' + nombre + '. 🖤'); return true }
    try {
      const stream = await downloadContentFromMessage(stickerMsg, 'sticker')
      let buffer = Buffer.from([])
      for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk])
      const png = await (require('sharp'))(buffer).png().toBuffer()
      await sock.sendMessage(from, { image: png, caption: '🖼️ Aqui esta tu imagen, ' + nombre + '. 🖤' })
    } catch(e) { await s('🕯️ No pude convertir ese sticker... 🖤') }
    return true
  }

  if (cmd === 'wikipedia') {
    if (!args) { await s('🕯️ Escribe: *#wikipedia* tema 🖤'); return true }
    try {
      const res = await fetch('https://es.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(args))
      const data = await res.json()
      if (data.extract) {
        await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ 📚 *Wikipedia*\nੈ✿ֵ‧₊˚ 🔎 *' + (data.title || args) + '*\n\n' + data.extract.slice(0, 500) + '...\n\n🔗 ' + (data.content_urls?.mobile?.page || '') + '\n\n*───────────୨ৎ───────────*\n> [ ✰ ] Sandrone-MD')
      } else {
        await s('🕯️ No encontre info sobre *' + args + '*... 🖤')
      }
    } catch(e) { await s('🕯️ Error al buscar... intenta mas tarde. 🖤') }
    return true
  }

  if (['play','tiktok','clima','ytmp3','ytmp4','spotifydl','fb','instagram','ia','trad','sticker','emojimix','tweet','neko','waifu','pinterest','morse','ss','ssweb','style','tts','zodiac','afk'].includes(cmd)) {
    await s(NO_DISPONIBLE(cmd, nombre))
    return true
  }

  return false
}
