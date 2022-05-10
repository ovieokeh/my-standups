export const playsound = async (action: string) => {
  const audioElement = document.getElementById(
    `${action}-audio`
  ) as HTMLAudioElement
  const audio = new Audio(audioElement.src)

  console.log(action, audio)
  await audio.play()
}
