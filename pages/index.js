import styles from '../styles/Home.module.css'
import Test from './Test'

export default function Home(props) {
  const {routeList, stopList} = props

  console.log(props)
  return (
    <div className={styles.container}>
      /route/search
    </div>
  )
}


export const getStaticProps = async () => {
  // const data = await fetch("https://hkbus.github.io/hk-bus-crawling/routeFareList.min.json").then(resp => resp.json())
  const routeList = await fetch("http://localhost:4000/routes").then(resp => resp.json())
  const stopList = await fetch("http://localhost:4000/stops").then(resp => resp.json())

  return { props: {stopList, routeList: Object.values(routeList)} }
}

