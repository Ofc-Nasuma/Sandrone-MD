module.exports = async (ctx) => {
  const { sock, from, nombre, cmd, args, s, isAdmin, botIsAdmin, config } = ctx
  const { antispamActivo } = config

  if (!cmd) return false

  if (cmd === 'tagall') {
    if (!isAdmin) { await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n⛔ Solo *administradores*, ' + nombre + '. 🖤\n\n> [ ✰ ] Sandrone-MD'); return true }
    try {
      const meta = await sock.groupMetadata(from)
      const participantes = meta.participants.map(p => p.id)
      const menciones = participantes.map(p => '@' + p.split('@')[0]).join(' ')
      await sock.sendMessage(from, { text: '*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ 📢 *Tag All*\n\n' + menciones + '\n\n' + (args || '🕯️ Sandrone los convoca... 🖤') + '\n\n> [ ✰ ] Sandrone-MD', mentions: participantes })
    } catch(e) { await s('🕯️ No pude mencionar a todos... 🖤') }
    return true
  }

  if (cmd === 'link') {
    if (!isAdmin) { await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n⛔ Solo *administradores*, ' + nombre + '. 🖤\n\n> [ ✰ ] Sandrone-MD'); return true }
    try {
      const code = await sock.groupInviteCode(from)
      await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ 🔗 *Link del Grupo*\n\nhttps://chat.whatsapp.com/' + code + '\n\n🕯️ Comparte con cuidado... 🖤\n\n> [ ✰ ] Sandrone-MD')
    } catch(e) { await s('🕯️ No pude obtener el link... 🖤') }
    return true
  }

  if (cmd === 'onantispam') {
    if (!isAdmin) { await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n⛔ Solo *administradores*, ' + nombre + '. 🖤\n\n> [ ✰ ] Sandrone-MD'); return true }
    if (!botIsAdmin) { await s('⚠️ Necesito ser *admin* del grupo para el antispam. 🖤'); return true }
    antispamActivo[from] = true
    await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ 🛡️ *Antispam Activado*\n\n👁️ Vigilando el grupo...\n⚠️ 3 advertencias = expulsion\n\n> [ ✰ ] Sandrone-MD')
    return true
  }

  if (cmd === 'offantispam') {
    if (!isAdmin) { await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n⛔ Solo *administradores*, ' + nombre + '. 🖤\n\n> [ ✰ ] Sandrone-MD'); return true }
    antispamActivo[from] = false
    await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ 🔕 *Antispam Desactivado*\n\n😴 Sin vigilancia por ahora...\n\n> [ ✰ ] Sandrone-MD')
    return true
  }

  if (cmd === 'anuncio') {
    if (!isAdmin) { await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n⛔ Solo *administradores*, ' + nombre + '. 🖤\n\n> [ ✰ ] Sandrone-MD'); return true }
    if (!args) { await s('🕯️ Escribe: *#anuncio* Tu mensaje 🖤'); return true }
    await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ 📢 *Anuncio Oficial*\n\n' + args + '\n\n✦ _Ofic_Nasuma_ 🖤\n> [ ✰ ] Sandrone-MD')
    return true
  }

  if (cmd === 'ban') {
    if (!isAdmin) { await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n⛔ Solo *administradores*, ' + nombre + '. 🖤\n\n> [ ✰ ] Sandrone-MD'); return true }
    if (!botIsAdmin) { await s('⚠️ Necesito ser *admin* para expulsar. 🖤'); return true }
    const mentioned = ctx.msg.message.extendedTextMessage?.contextInfo?.mentionedJid
    if (!mentioned || mentioned.length === 0) { await s('🕯️ Menciona al usuario: *#ban @usuario* 🖤'); return true }
    const botNum = sock.user.id.split(':')[0].replace(/[^0-9]/g,'')
    const filtrados = mentioned.filter(m => m.replace('@s.whatsapp.net','').replace('@lid','').replace(/[^0-9]/g,'') !== botNum)
    if (filtrados.length === 0) { await s('🖤 No me puedo eliminar a mi misma...'); return true }
    await sock.groupParticipantsUpdate(from, filtrados, 'remove')
    await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n🚪 El visitante ha sido retirado... 🖤\n\n> [ ✰ ] Sandrone-MD')
    return true
  }

  if (cmd === 'agregar') {
    if (!isAdmin) { await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n⛔ Solo *administradores*, ' + nombre + '. 🖤\n\n> [ ✰ ] Sandrone-MD'); return true }
    if (!botIsAdmin) { await s('⚠️ Necesito ser *admin* para agregar. 🖤'); return true }
    const numero = args.replace(/[^0-9]/g, '')
    if (!numero) { await s('🕯️ Escribe: *#agregar 521234567890* 🖤'); return true }
    try {
      await sock.groupParticipantsUpdate(from, [numero + '@s.whatsapp.net'], 'add')
      await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n🌸 Un nuevo visitante ha sido invitado... 🖤\n\n> [ ✰ ] Sandrone-MD')
    } catch(e) { await s('🕯️ No pude agregar ese numero... 🖤') }
    return true
  }

  return false
}
