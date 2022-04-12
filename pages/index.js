import Head from 'next/head'
//import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Container from '../components/Container'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Image Uploader</title>
        <meta name="description" content="Image uploader to cloudinary cloud storage." />
        <link rel="icon" href="/devchallenges.png" />
      </Head>

      <main className={styles.main}>
        <h1>Upload your image</h1>
        <p>File should be Jpeg, Png...</p>
        <DndProvider backend={HTML5Backend}>
					<Container />
				</DndProvider>
      </main>
    </div>
  )
}