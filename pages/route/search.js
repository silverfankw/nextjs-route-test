import { useRouter } from 'next/router'

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjJiYTZhMDhiZTdiZGQ0MDhmNWExY2RlIiwiZW1haWwiOiJ1c2VyMUBhYmMuY29tLmhrIiwiaWF0IjoxNjU2NDA5NTcxLCJleHAiOjE2NTY0MTMxNzF9.bdhjDBMgs6_MoEZHKlRH1eb7kM2dZtIgZwWZX__BzEw"

const Routes = props => {

  const { results } = props
  console.log(results)
  
  return results.map(result => <p>{`${result.co}-${result.route}-${result.orig.en}-${result.dest.en}`}</p>)
}

export async function getServerSideProps(context) {
  const {co, route} = context.query
  const result = await fetch(`http://localhost:4000/routes/details?co=${co}&route=${route}`, 
    {headers: {"X-jwt-token": token}}
  ).then(resp => resp.json())

  return {props: {results: result}}
}

export default Routes