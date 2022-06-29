
export default function Home(props) {
  const {routeList, stopList} = props

  console.log(props)
  return (
    <div className="container">
      <h1>Homepage</h1>
      <div>
        <a className="text-sm" href="./route/search">Route Search</a>
      </div>
    </div>
  )
}


export const getStaticProps = async () => {
  // const data = await fetch("https://hkbus.github.io/hk-bus-crawling/routeFareList.min.json").then(resp => resp.json())
  const routeList = await fetch("http://localhost:4000/routes").then(resp => resp.json())
  const stopList = await fetch("http://localhost:4000/stops").then(resp => resp.json())

  return { props: {stopList, routeList: Object.values(routeList)} }
}

