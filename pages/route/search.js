import { useRouter } from "next/router"
import { useEffect } from "react"

const routeSearch = props => {
  const { result, status } = props
  const router = useRouter()

  useEffect(() => { if (status !== 200) router.push("/login") }, [status])

  return (
   
  <div className="container">
    <div className={`border w-1/3 rounded-md p-5 flex gap-3`}>
      <select name="co"><option value="test"></option></select>
      <input placeholder="route no."/>
      <div className="flex flex-row justify-center">        
        <button className="h-8 border rounded-md text-md" name="login" onClick={console.log("s")}>Search</button>
      </div>
    </div>
    {
      status === 200 ?  
      result.map(r => <p>{`${r.route}-${r.orig.en}-${r.dest.en}`}</p>):
      <div>Authentication Error</div>
    }
   </div>
  )
}

export async function getServerSideProps({query, req, res}) {

  const { token } = req.cookies

  if (token) {
    const {co, route} = query
    const response = await fetch(`http://localhost:4000/routes/details?co=${co}&route=${route}`
    , {headers: {"X-jwt-token": token}})

    return {props: {status: response.status, result: await response.json()}}

  }
  else return {props: {result: [], status: 401}}

}

export default routeSearch