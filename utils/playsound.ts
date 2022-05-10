export const playsound = (action: string) => {
  const audio = document.getElementById(`${action}-audio`) as HTMLAudioElement
  audio.play()
}
