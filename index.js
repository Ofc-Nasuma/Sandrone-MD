const { default: makeWASocket, useMultiFileAuthState, downloadContentFromMessage } = require('@whiskeysockets/baileys')
const pino = require('pino')

const OWNER = ['51954507582', '527971165432', '259145894772784', '100026164445290']
const MENU_IMG = 'https://raw.githubusercontent.com/Ofc-Nasuma/Sandrone-MD/main/73790c757ba9bdbb8f1b331dc99e41ea.jpg'
const BIENVENIDA_IMG = 'https://raw.githubusercontent.com/Ofc-Nasuma/Sandrone-MD/main/a8ba730192c31074b72c982a63bb3e66.jpg'
const INICIO = Date.now()

const antispamActivo = {}
const advertencias = {}
const mensajesRecientes = {}
const juegoAhorcado = {}
const juegoTrivia = {}
const juegoNumero = {}
const juegoPPT = {}

const config = { OWNER, MENU_IMG, BIENVENIDA_IMG, INICIO, antispamActivo, advertencias, mensajesRecientes, juegoAhorcado, juegoTrivia, juegoNumero, juegoPPT }

const generales = require('./comandos/generales')
const juegos = require('./comandos/juegos')
const admins = require('./comandos/admins')
const propietario = require('./comandos/propietario')

async function startSandrone() {
  const { state, saveCreds } = await useMultiFileAuthState('session')
  const sock = makeWASocket({
    auth: state,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: false
  })
  sock.ev.on('creds.update', saveCreds)
  sock.ev.on('connection.update', async ({ connection, qr }) => {
    if (connection === 'open') console.log('🖤 Sandrone en linea.')
    if (connection === 'close') { console.log('Reconectando...'); startSandrone() }
    if (qr) {
      try {
        const code = await sock.requestPairingCode('527971165432')
        console.log('🖤 Codigo: ' + code)
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
        const caption = '*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n๑ " Bienvenido al grupo *@' + nombre + '* ❄ "\n︶ ⏝ ︶ ୨୧ ︶ ⏝ ︶\n\nੈ✰ֵ‧₊˚ 🖤 Que tu estancia sea agradable\nੈ✿ֵ‧₊˚ 🕯️ Estamos felices de tenerte\nੈ❀ֵ‧₊˚ ✨ Bienvenido a las sombras\n\n*───────────୨ৎ───────────*\n> [ ✰ ] Sandrone-MD'
        if (imgBuffer) {
          await sock.sendMessage(id, { image: imgBuffer, caption, mentions: [jid] })
        } else {
          await sock.sendMessage(id, { image: { url: BIENVENIDA_IMG }, caption, mentions: [jid] })
        }
      } catch(e) {}
    }
  })

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message || msg.key.fromMe) return

    const textoRaw = (msg.message.conversation || msg.message.extendedTextMessage?.text || '').trim()
    const from = msg.key.remoteJid
    const nombre = msg.pushName || 'visitante'
    const sender = msg.key.participant || msg.key.remoteJid
    const senderNum = sender.replace('@s.whatsapp.net', '').replace('@lid', '').replace(/[^0-9]/g, '')
    const isOwner = OWNER.includes(senderNum)
    const isGroup = from.endsWith('@g.us')
    const s = async (t) => await sock.sendMessage(from, { text: t })

    const prefijos = ['#', '/', '.']
    const tienePrefijo = prefijos.some(p => textoRaw.startsWith(p))
    const cmd = tienePrefijo ? textoRaw.slice(1).split(' ')[0].toLowerCase() : ''
    const args = tienePrefijo ? textoRaw.slice(1 + cmd.length).trim() : ''

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

    const ctx = { sock, msg, from, nombre, sender, senderNum, isOwner, isGroup, isAdmin, botIsAdmin, cmd, args, textoRaw, s, config }

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
            await sock.sendMessage(from, { text: '*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n🚨 *' + nombre + '* eliminado por spam. 🖤\n\n> [ ✰ ] Sandrone-MD' })
            await sock.groupParticipantsUpdate(from, [sender], 'remove')
            delete advertencias[sender]
            delete mensajesRecientes[sender]
          }
        } else {
          await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ ⚠️ *Advertencia ' + advertencias[sender] + '/3*\nੈ✿ֵ‧₊˚ 👤 *' + nombre + '*\n\n🚫 Evita el spam o seras retirado.\n\n> [ ✰ ] Sandrone-MD')
          mensajesRecientes[sender] = []
        }
        return
      }
    }

    if (await generales(ctx)) return
    if (await juegos(ctx)) return
    if (await admins(ctx)) return
    if (await propietario(ctx)) return

    if (tienePrefijo) await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n๑ " Ese comando aun no lo conozco, ' + nombre + '... ❄ "\n\n🕯️ Escribe *#menu* para ver lo disponible. 🖤\n\n> [ ✰ ] Sandrone-MD')
  })
}
startSandrone()
