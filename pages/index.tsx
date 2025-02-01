
import {BackgroundBeamsDemo} from '@/pages/components/background-beams-demo'
import {ShootingStarsAndStarsBackgroundDemo} from '@/pages/components/shooting-stars-demo'
import Blockquote from '@/pages/components/blockquote'
import {MusicPlayer} from '@/pages/components/music-player.jsx'
export default function Home() {
  return (
    <div className={`Home`}>
      <div className={'HomeBody'}>
        {/* <Blockquote/>
        <ShootingStarsAndStarsBackgroundDemo/> */}
        <MusicPlayer/>
      </div>
    </div>
  );
}
