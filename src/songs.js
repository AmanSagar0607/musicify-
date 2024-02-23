export const songs = [...Array(10).keys()].map((n) => ({
  title: 'Song ' + Number(n + 1),
  src: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${Number(
    n + 1
  )}.mp3`,
}));
