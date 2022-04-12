import Head from 'next/head'

import styles from '../styles/Home.module.css'
import BoardMap from '../components/BoardMap/BoardMap.jsx'

import { InstabilityDisc, NegotiationDisc, ScottishControlDisc, EnglishControlDisc, WelshControlDisc } from '../components/Disc/Disc.jsx';
import { EnglishFollower, ScottishFollower, WelshFollower } from '../components/Follower/Follower';
import ActionCard, { AssembleCard, EnglishSupportCard, NegotiateCard, ManouevreCard, OutmanouevreCard, ScottishSupport, WelshSupport } from '../components/ActionCard/ActionCard';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>The King Is Dead</title>        
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <BoardMap/>
        <EnglishFollower/>
        <ScottishFollower/>
        <WelshFollower/>

        <InstabilityDisc/>
        <NegotiationDisc/>
        <ScottishControlDisc/>
        <EnglishControlDisc/>
        <WelshControlDisc/>
        
        <AssembleCard/>
        <EnglishSupportCard/>
        <ManouevreCard/>
        <NegotiateCard/>
        <OutmanouevreCard/>
        <ScottishSupport/>
        <WelshSupport/>
      </main>
    </div>
  )
}
