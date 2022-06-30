import { useCookies } from "react-cookie"
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { debounce } from "lodash"

const login = props => {

  const router = useRouter()
  const [loginInfo, setLoginInfo] = useState({username: "", password: ""})
  const [authenticated, setAuthenticated] = useState("")
  const [cookie, setCookie] = useCookies(["token"])

  useEffect(() => {
    console.log(cookie)
  }, [cookie])

  const handleChange = (e, key) => setLoginInfo({...loginInfo, [key]: e.target.value})
  // const debounceOnChange = useCallback(debounce(handleChange, 200))

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
        if (resp.status == 200) {
          setAuthenticated(true)
          return resp.json()
        }
        else {
          setAuthenticated(false)
          return
        }
      })
      .then(json => {
        setCookie("token", json.token, {
          path: "/",
          maxAge: 36000, // Expires after 12hr
          sameSite: true,
        })
        router.push("/")
      })
    }
    catch (err) { console.log(err) }
  }


  return (
    <div className="container">
      
      <div className={`border w-1/4 h-1/3 rounded-md p-5 flex flex-col gap-3`}>
        <div className="flex justify-center text-xs">
          Authenticated - {authenticated}
        </div>
        <input className="form-input" placeholder="user" onChange={e => handleChange(e, "username")}/>
        <input className="form-input" type="password" placeholder="password" onChange={e => handleChange(e, "password")}/>
        <div className="flex flex-row justify-center">        
          <button className="h-8 border rounded-md text-md w-1/3" name="login" onClick={e => login()}>login</button>
        </div>

      </div>
    </div>
  )
}

export default login