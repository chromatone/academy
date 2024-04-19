export default oauth.discordEventHandler({

  async onSuccess(event, { user }) {
    console.log(user)
    return sendRedirect(event, `/me/?discord_id=${user?.id}&discord_username=${user?.username}`)
  }
})

let a = {
  id: '',
  username: 'davay42',
  avatar: '064ecb81438551a34719fca36164093a',
  discriminator: '0',
  public_flags: 0,
  flags: 0,
  banner: null,
  accent_color: 12756337,
  global_name: 'Davay',
  avatar_decoration_data: null,
  banner_color: '#c2a571',
  clan: null,
  mfa_enabled: true,
  locale: 'en-US',
  premium_type: 0
}