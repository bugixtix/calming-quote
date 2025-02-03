
import MP3_DATA from '@/pages/mp3_list.json'

export function shuffledMP3(){
    return MP3_DATA.sort(() => Math.random() - 0.5);
}