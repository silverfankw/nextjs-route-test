import { useCookies } from "react-cookie"
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { debounce } from "lodash"

const login = props => {

  const router = useRouter()
  const [loginInfo, setLoginInfo] = useState({username: "", password: ""})
  const [serverMsg, setServerMsg] = useState("Not logged in")
  const [cookie, setCookie] = useCookies([])

  const isLoggedIn = () => Boolean(cookie.token)

  useEffect(() => {
    console.log(cookie)
  }, [cookie])

  const handleChange = (e, key) => setLoginInfo({...loginInfo, [key]: e.target.value})
  const debounceOnChange = useCallback(debounce(handleChange, 200))

  const login = async () => {
    try {
      await fetch(
        "http://localhost:4000/login", 
        {
          mode: "cors", 
          headers: {'Content-Type': 'application/json'}, 
          method: "POST", 
          body: JSON.stringify(loginInfo)
        }
      )
      .then(resp => {
        setServerMsg(`${resp.status} ${resp.statusText}`)
        return resp.json()
      })
      .then(json => {
        setCookie("token", json.token, {
          path: "/",
          maxAge: 36000, // Expires after 12hr
          sameSite: true,
        })
      })
    }
    catch (err) { console.log(err) }
  }

  return (
    <div className="container">
      
      <div className={`border w-1/4 h-${isLoggedIn ? '1/4' : '1/3'} rounded-md p-5 flex flex-col gap-3`}>
        <div className="flex justify-center text-xs">
          Status - {isLoggedIn ? `Already logged in` : serverMsg}
        </div>
        <input className="form-input" placeholder="user" onChange={e => debounceOnChange(e, "username")} disabled={isLoggedIn}/>
        <input className="form-input" placeholder="password" onChange={e => debounceOnChange(e, "password")} disabled={isLoggedIn}/>
        <div className="flex flex-row justify-center">        
          <button className="h-8 border rounded-md text-md w-1/3" name="login" onClick={login} disabled={isLoggedIn}>login</button>
        </div>

      </div>
    </div>
  )
}

export default login