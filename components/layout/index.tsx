import Head from 'next/head'

export default function Layout({ children, title = 'Easy Standups' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/icons8-create-pastel-16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/icons8-create-pastel-32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicons/icons8-create-pastel-96.png"
        />
      </Head>
      {children}
      <audio id="create-audio" src="/sound-effects/create-audio.flac"></audio>
      <audio id="delete-audio" src="/sound-effects/delete-audio.mp3"></audio>
      <audio id="edit-audio" src="/sound-effects/edit-audio.wav"></audio>
      <audio id="finish-audio" src="/sound-effects/finish-audio.wav"></audio>
      <audio id="undo-audio" src="/sound-effects/undo-audio.wav"></audio>
    </>
  )
}
