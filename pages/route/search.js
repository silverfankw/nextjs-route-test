import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import useSWR from "swr"

import { NormalFetcher } from "../../helper/fetcher"

const routeSearch = props => {
  const [criteria, setCriteria] = useState({co: "kmb", route: ""})
  const [cookie, setCookie] = useCookies(["token"])
  const [result, setResult] = useState([])

  console.log(result)  
  useEffect(() => console.log(criteria), [criteria])

  const handleCriteriaChange = (e, key) => setCriteria({...criteria, [key]: e.target.value})

  const searchRoute = async () => {
    const apiResult = await fetch(`http://localhost:4000/routes/details?co=${criteria.co}&route=${criteria.route}`, 
      {mode: "cors", headers: {"Content-Type": 'application/json', "X-jwt-token": cookie.token}}
    )
    .then(resp => resp.json()).then(data => setResult(data))
  }

  return (
  <div className="container">
    <div className={`flex border w-1/3 rounded-md p-5 gap-3`}>
      <select className="select-input w-1/4" onChange={e => handleCriteriaChange(e, "co")}>
        <option value="kmb">K</option>
        <option value="ctb">C</option>
        <option value="nwfb">NW</option>
        <option value="lwb">L</option>
        <option value="nlb">NL</option>
        <option value="gmb">G</option>
      </select>
      <input className="form-input w-1/2" placeholder="route no." onChange={e => handleCriteriaChange(e, "route")}/>
      <div className="flex flex-row justify-center">        
        <button className="h-8 border rounded-md text-md" name="login" onClick={() => searchRoute()}>Search</button>
      </div>
    </div>
    {
      result.length > 0 &&
      <div className="flex flex-col text-xs">
        {result.map(r => <div>{`${r.co}-${r.route}-${r.orig.en}-${r.dest.en}`}</div>)}
      </div>
    }
   </div>
  )
}

export default routeSearch