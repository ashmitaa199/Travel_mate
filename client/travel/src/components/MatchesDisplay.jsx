import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { useCookies } from "react-cookie";

const MatchesDisplay = ({matches, setClickedUser}) => {

    const [matchedProfiles, setMatchedProfiles] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const matchedUserIds = matches.map(({user_id}) => user_id)
    const userId = cookies.UserId;
  const getMatches = async ()=> {

    try{

      const response = await axios.get('http://localhost:8000/users', {
        params: {userIds: JSON.stringify(matchedUserIds)}

      })
      setMatchedProfiles(response.data)
    } catch (error){
      console.log(error)
    }
  }

  useEffect(() => {
    getMatches()

  }, [matches])

  // const filteredMatchedProfiles = matchedProfiles?.filter(
  //   (matchedProfile) =>
  //     matchedProfile.matches.filter((profile) => profile.user_id == userId)
  //       .length > 0
  // );

  // console.log(matchedProfiles)

  return (
    <div className='matches-dispaly justify-center items-center mt-4 flex flex-col '>

      {matchedProfiles?.map((match, _index) => (
        <div
          key={match.user_id}
          className="match-card flex mb-2 bg-slate-900 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border rounded-lg border-teal-700" 
          onClick={() => setClickedUser(match)}
        >
        

          <div className="img-container">
            <img src={match?.url} alt={match?.first_name + " profile"} />
          </div>
          <h3 className='p-2'>{match?.first_name}</h3>

          </div>
         
      ))}
     
    </div>
  )
}

export default MatchesDisplay