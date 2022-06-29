const useDebounce = (fn, delayMs, defaultInput = "") => {
  const [input, setInput] = useState(defaultInput)

  return setTimeout((...args) => fn(args), delayMs)
}

export default useDebounce