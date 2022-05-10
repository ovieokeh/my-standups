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
      <audio id="create-audio" src="/sound-effects/pop.flac"></audio>
      <audio id="complete-audio" src="/sound-effects/ding.wav"></audio>
      <audio id="delete-audio" src="/sound-effects/swipe.mp3"></audio>
    </>
  )
}
