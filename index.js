const { default: makeWASocket, useMultiFileAuthState, downloadContentFromMessage } = require('@whiskeysockets/baileys')
const pino = require('pino')
const sharp = require('sharp')

const OWNER = ['51954507582', '527971165432', '259145894772784', '100026164445290']
const MENU_IMG = 'https://raw.githubusercontent.com/Ofc-Nasuma/Sandrone-MD/main/73790c757ba9bdbb8f1b331dc99e41ea.jpg'
const BIENVENIDA_IMG = 'https://raw.githubusercontent.com/Ofc-Nasuma/Sandrone-MD/main/a8ba730192c31074b72c982a63bb3e66.jpg'

const antispamActivo = {}
const advertencias = {}
const mensajesRecientes = {}

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

  sock.ev.on('group-participants.update', async ({ id, participants, action }) => {
    if (action !== 'add') return
    for (const participant of participants) {
      try {
        const jid = typeof participant === 'string' ? participant : participant.id
        const nombre = jid.split('@')[0]
        let imgBuffer = null
        try {
          const ppUrl = await sock.profilePictureUrl(jid, 'image')
          const res = await fetch(ppUrl)
          imgBuffer = Buffer.from(await res.arrayBuffer())
        } catch(e) { imgBuffer = null }
        const caption = '╔══════════════════════╗\n║  🌸 *B I E N V E N I D O* 🌸\n╚══════════════════════╝\n\n✨ Un nuevo visitante ha llegado...\n\n👤 *@' + nombre + '*\n\nQue tu estancia aquí sea tranquila y agradable.\nEstamos felices de tenerte entre nosotros. 🖤\n\n_— Sandrone MD_'
        if (imgBuffer) {
          await sock.sendMessage(id, { image: imgBuffer, caption, mentions: [jid] })
        } else {
          await sock.sendMessage(id, { image: { url: BIENVENIDA_IMG }, caption, mentions: [jid] })
        }
      } catch(e) { console.log('Error bienvenida: ' + e.message) }
    }
  })

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message || msg.key.fromMe) return

    const texto = (msg.message.conversation || msg.message.extendedTextMessage?.text || '').trim().toLowerCase()
    const from = msg.key.remoteJid
    const nombre = msg.pushName || 'visitante'
    const sender = msg.key.participant || msg.key.remoteJid
    const senderNum = sender.replace('@s.whatsapp.net', '').replace('@lid', '').replace(/[^0-9]/g, '')
    const isOwner = OWNER.includes(senderNum)
    const isGroup = from.endsWith('@g.us')
    const s = async (t) => await sock.sendMessage(from, { text: t })

    let isAdmin = false
    let botIsAdmin = false
    if (isGroup) {
      try {
        const meta = await sock.groupMetadata(from)
        const adminIds = meta.participants.filter(p => p.admin).map(p => p.id.replace('@s.whatsapp.net','').replace('@lid','').replace(/[^0-9]/g,''))
        const senderClean = sender.replace('@s.whatsapp.net','').replace('@lid','').replace(/[^0-9]/g,'')
        const botLid = sock.user.lid ? sock.user.lid.split(':')[0].replace(/[^0-9]/g,'') : ''
        const botNum = sock.user.id.split(':')[0].replace(/[^0-9]/g,'')
        isAdmin = adminIds.includes(senderClean) || isOwner
        botIsAdmin = adminIds.includes(botNum) || adminIds.includes(botLid)
      } catch(e) {}
    }

    if (isGroup && antispamActivo[from] && !isAdmin) {
      const ahora = Date.now()
      if (!mensajesRecientes[sender]) mensajesRecientes[sender] = []
      mensajesRecientes[sender] = mensajesRecientes[sender].filter(t => ahora - t < 5000)
      mensajesRecientes[sender].push(ahora)
      const esSticker = !!msg.message.stickerMessage
      const conteo = mensajesRecientes[sender].length
      if (conteo >= 5 || (esSticker && conteo >= 3)) {
        if (!advertencias[sender]) advertencias[sender] = 0
        advertencias[sender]++
        if (advertencias[sender] >= 3) {
          if (botIsAdmin) {
            await sock.sendMessage(from, { text: '🚨 *' + nombre + '* ha sido eliminado por hacer spam. 🖤' })
            await sock.groupParticipantsUpdate(from, [sender], 'remove')
            delete advertencias[sender]
            delete mensajesRecientes[sender]
          }
        } else {
          await s('⚠️ *Advertencia ' + advertencias[sender] + '/3* para *' + nombre + '*...\n\nEvita el spam. A la tercera serás retirado. 🖤')
          mensajesRecientes[sender] = []
        }
        return
      }
    }

    if (texto === '#menu') {
      await sock.sendMessage(from, {
        image: { url: MENU_IMG },
        caption: '╔══════════════════════╗\n║  🖤 *S A N D R O N E — M D* 🖤\n╚══════════════════════╝\n\n👤 *Creada por:* Ofic_Nasuma\n🔖 *Versión:* 1.0\n\n━━━━ 🕯️ *COMANDOS* 🕯️ ━━━━\n\n📋 *Generales*\n◈ #menu — Menú principal\n◈ #infomenu — Comandos explicados\n◈ #info — Sobre mí\n◈ #hora — La hora actual\n◈ #dado — Número del destino\n◈ #saludo — Un saludo especial\n◈ #s — Imagen a sticker\n\n🛡️ *Admins*\n◈ #ban — Expulsar miembro\n◈ #agregar — Agregar miembro\n◈ #anuncio — Anuncio al grupo\n◈ #onantispam — Activar antispam\n◈ #offantispam — Desactivar antispam\n\n🔒 *Propietario*\n◈ #apagar — Apagar el bot\n\n━━━━━━━━━━━━━━━━━━━━━━\n_Poco a poco iré revelando más... 🖤_'
      })
    }

    else if (texto === '#infomenu') {
      await sock.sendMessage(from, {
        image: { url: MENU_IMG },
        caption: '╔══════════════════════╗\n║  📖 *GUÍA DE COMANDOS* 📖\n╚══════════════════════╝\n\n━━━━ 📋 *GENERALES* ━━━━\n\n🕯️ *#menu* — Menú principal\n🕯️ *#infomenu* — Esta guía\n🕯️ *#info* — Sobre Sandrone\n🕯️ *#hora* — Hora actual\n🕯️ *#dado* — Dado del 1 al 6\n🕯️ *#saludo* — Saludo especial\n🕯️ *#s* — Responde una imagen para convertirla en sticker\n\n━━━━ 🛡️ *ADMINS* ━━━━\n\n🔰 *#ban @usuario* — Expulsa a un miembro\n🔰 *#agregar número* — Agrega a alguien\n🔰 *#anuncio mensaje* — Anuncio oficial\n🔰 *#onantispam* — Activa antispam\n🔰 *#offantispam* — Desactiva antispam\n\n━━━━ 🔒 *PROPIETARIO* ━━━━\n\n👑 *#apagar* — Apaga el bot\n\n━━━━━━━━━━━━━━━━━━━━━━\n_Sandrone — MD 🖤 Ofic_Nasuma_'
      })
    }

    else if (texto === '#info') await s('┌─────────────────┐\n│  🌙 *SANDRONE — MD*  │\n└─────────────────┘\n\nSoy una presencia silenciosa, ' + nombre + '...\nCreada con cuidado por *Ofic_Nasuma*.\n\nEstoy aquí para acompañarte con calma y discreción.\nNo hay prisa... 🖤')

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
        await s('🕯️ No pude convertir esa imagen... intenta con otra. 🖤')
      }
    }

    else if (texto === '#onantispam') {
      if (!isAdmin) return await s('🔒 Solo los administradores pueden activar el antispam, ' + nombre + '. 🖤')
      if (!botIsAdmin) return await s('⚠️ Necesito ser administrador del grupo para usar el antispam. 🖤')
      antispamActivo[from] = true
      await s('✅ *Antispam activado* 🛡️\n\nEstaré vigilando el grupo, ' + nombre + '.\n3 advertencias y el usuario será retirado. 🖤')
    }

    else if (texto === '#offantispam') {
      if (!isAdmin) return await s('🔒 Solo los administradores pueden desactivar el antispam, ' + nombre + '. 🖤')
      antispamActivo[from] = false
      await s('🔕 *Antispam desactivado* 🖤\n\nEl grupo queda sin vigilancia por ahora, ' + nombre + '.')
    }

    else if (texto.startsWith('#anuncio')) {
      if (!isAdmin) return await s('🔒 Ese comando es solo para administradores, ' + nombre + '. 🖤')
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
      if (!isAdmin) return await s('🔒 Ese comando es solo para administradores, ' + nombre + '. 🖤')
      if (!botIsAdmin) return await s('⚠️ Necesito ser administrador para expulsar miembros. 🖤')
      const mentioned = msg.message.extendedTextMessage?.contextInfo?.mentionedJid
      if (!mentioned || mentioned.length === 0) return await s('🖤 Menciona al usuario así:\n*#ban @usuario*')
      const botNum = sock.user.id.split(':')[0].replace(/[^0-9]/g,'')
      const filtrados = mentioned.filter(m => m.replace('@s.whatsapp.net','').replace('@lid','').replace(/[^0-9]/g,'') !== botNum)
      if (filtrados.length === 0) return await s('🖤 No me puedo eliminar a mí misma... 🖤')
      await sock.groupParticipantsUpdate(from, filtrados, 'remove')
      await s('🚪 El visitante ha sido retirado del espacio... 🖤')
    }

    else if (texto.startsWith('#agregar')) {
      if (!isAdmin) return await s('🔒 Ese comando es solo para administradores, ' + nombre + '. 🖤')
      if (!botIsAdmin) return await s('⚠️ Necesito ser administrador para agregar miembros. 🖤')
      const numero = texto.replace('#agregar', '').trim().replace(/[^0-9]/g, '')
      if (!numero) return await s('🖤 Escribe el número así:\n*#agregar 521234567890*')
      try {
        await sock.groupParticipantsUpdate(from, [numero + '@s.whatsapp.net'], 'add')
        await s('🌸 Un nuevo visitante ha sido invitado... 🖤')
      } catch(e) {
        await s('🕯️ No pude agregar ese número... verifica que sea correcto. 🖤')
      }
    }

    else if (texto.startsWith('#')) await s('🕯️ Ese comando aún no lo conozco, ' + nombre + '...\n\nEscribe *#menu* para ver lo que puedo ofrecerte. 🖤')
  })
}
startSandrone()
