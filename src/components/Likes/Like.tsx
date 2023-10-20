import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../config/firebase'

const Like = () => {
    const [user] = useAuthState(auth)

    
  return (
    <div>Like</div>
  )
}

export default Like