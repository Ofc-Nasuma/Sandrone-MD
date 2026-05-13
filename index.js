const { default: makeWASocket, useMultiFileAuthState, downloadContentFromMessage } = require('@whiskeysockets/baileys')
const pino = require('pino')
const sharp = require('sharp')

const OWNER = ['51954507582', '527971165432', '259145894772784']

async function startSandrone() {
  const { state, saveCreds } = await useMultiFileAuthState('session')
  const sock = makeWASocket({
    auth: state,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: false
  })
  sock.ev.on('creds.update', saveCreds)
  sock.ev.on('connection.update', async ({ connection, qr }) => {
    if (connection === 'open') console.log('🖤 Sandrone en línea.')
    if (connection === 'close') { console.log('Reconectando...'); startSandrone() }
    if (qr) {
      try {
        const code = await sock.requestPairingCode('527971165432')
        console.log('🖤 Código: ' + code)
      } catch(e) {}
    }
  })
  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message || msg.key.fromMe) return
    const texto = (msg.message.conversation || msg.message.extendedTextMessage?.text || '').trim().toLowerCase()
    const from = msg.key.remoteJid
    const nombre = msg.pushName || 'visitante'
    const sender = msg.key.participant || msg.key.remoteJid
    const senderNum = sender.replace('@s.whatsapp.net', '').replace(/[^0-9]/g, '')
    const isOwner = OWNER.includes(senderNum)
console.log('Número detectado: ' + senderNum)
    const s = async (t) => await sock.sendMessage(from, { text: t })

    if (texto === '#menu') await s(
'╔═══════════════════╗\n║   🖤 *S A N D R O N E* 🖤\n╚═══════════════════╝\n\n✦ *Creada por:* Ofic_Nasuma\n✦ *Versión:* 1.0\n\n━━━━━━ 🕯️ *MENÚ* 🕯️ ━━━━━━\n\n📋 *Generales*\n◈ #menu — Este menú\n◈ #info — Sobre mí\n◈ #hora — La hora actual\n◈ #dado — Número del destino\n◈ #saludo — Un saludo especial\n◈ #s — Convertir imagen a sticker\n\n🔒 *Propietario*\n◈ #anuncio — Anuncio al grupo\n◈ #ban — Expulsar miembro\n◈ #agregar — Agregar miembro\n◈ #apagar — Apagar el bot\n\n━━━━━━━━━━━━━━━━━━━\n_Poco a poco iré revelando más... 🖤_')

    else if (texto === '#info') await s('┌─────────────────┐\n│  🌙 *SANDRONE*  │\n└─────────────────┘\n\nSoy una presencia silenciosa, ' + nombre + '...\nCreada con cuidado por *Ofic_Nasuma*.\n\nEstoy aquí para acompañarte con calma y discreción.\nNo hay prisa... 🖤')

    else if (texto === '#hora') {
      const h = new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
      await s('🕰️ *' + h + '*\n\nEl tiempo es silencioso, ' + nombre + '...\npero nunca se detiene. 🖤')
    }

    else if (texto === '#dado') {
      const n = Math.floor(Math.random() * 6) + 1
      await s('🎲 El destino habló, ' + nombre + '...\n\nTu número es *' + n + '*. 🖤')
    }

    else if (texto === '#saludo') await s('🌸 *Bienvenido, ' + nombre + '...*\n\nEs un placer tenerte en este espacio.\nQue tu estancia sea tranquila y agradable. 🖤')

    else if (texto === '#s') {
      const quoted = msg.message.extendedTextMessage?.contextInfo?.quotedMessage
      const imgMsg = quoted?.imageMessage
      if (!imgMsg) return await s('🖤 Responde una imagen con *#s* para convertirla en sticker, ' + nombre + '.')
      try {
        const stream = await downloadContentFromMessage(imgMsg, 'image')
        let buffer = Buffer.from([])
        for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk])
        const webp = await sharp(buffer).webp().toBuffer()
        await sock.sendMessage(from, { sticker: webp })
      } catch(e) {
        await s('🕯️ No pude convertir esa imagen, ' + nombre + '... intenta con otra. 🖤')
      }
    }

    else if (texto.startsWith('#anuncio')) {
      if (!isOwner) return await s('🔒 Ese comando es solo para mi creador, ' + nombre + '. 🖤')
      const anuncio = texto.replace('#anuncio', '').trim()
      if (!anuncio) return await s('🖤 Escribe el anuncio así:\n*#anuncio* Tu mensaje aquí')
      await s('📢 *— ANUNCIO DE SANDRONE —*\n\n' + anuncio + '\n\n✦ _Ofic_Nasuma_ 🖤')
    }

    else if (texto === '#apagar') {
      if (!isOwner) return await s('🔒 Ese comando es solo para mi creador, ' + nombre + '. 🖤')
      await s('🕯️ Me retiro en silencio...\nHasta pronto. 🖤')
      process.exit(0)
    }

    else if (texto.startsWith('#ban')) {
      if (!isOwner) return await s('🔒 Ese comando es solo para mi creador, ' + nombre + '. 🖤')
      const mentioned = msg.message.extendedTextMessage?.contextInfo?.mentionedJid
      if (!mentioned || mentioned.length === 0) return await s('🖤 Menciona al usuario así:\n*#ban @usuario*')
      await sock.groupParticipantsUpdate(from, mentioned, 'remove')
      await s('🚪 El visitante ha sido retirado del espacio... 🖤')
    }

    else if (texto.startsWith('#agregar')) {
      if (!isOwner) return await s('🔒 Ese comando es solo para mi creador, ' + nombre + '. 🖤')
      const numero = texto.replace('#agregar', '').trim().replace(/[^0-9]/g, '')
      if (!numero) return await s('🖤 Escribe el número así:\n*#agregar 521234567890*')
      await sock.groupParticipantsUpdate(from, [numero + '@s.whatsapp.net'], 'add')
      await s('🌸 Un nuevo visitante ha sido invitado... 🖤')
    }

    else if (texto.startsWith('#')) await s('🕯️ Ese comando aún no lo conozco, ' + nombre + '...\n\nEscribe *#menu* para ver lo que puedo ofrecerte. 🖤')
  })
}
startSandrone()
