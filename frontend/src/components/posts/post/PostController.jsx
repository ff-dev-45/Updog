import { useContext } from 'react'
// eslint-disable-next-line import/no-cycle
import PostView from './PostView'
import useApi from '../../../hooks/useApi'
import { TagContext } from '../../../contexts/TagProvider'
import { HandleContext } from '../../../contexts/HandleProvider'

/**
 * Creates a post. One of either id or data must be provided
 * @prop {string} activity - optional, POSTED, SHARED or LIKED
 * @prop {number} id - optional, data will be fetched using the id
 * @prop {object} data - optional, use this post data to render the post
 * @prop {boolean} condensed - optional, makes the post take up less space
 * @prop {boolean} showReplies - optional, also renders each 1st level reply to the post
 */
const PostController = ({
  activity = 'POSTED',
  id = 0,
  data = null,
  condensed = false,
  showReplies = false,
}) => {
  const { tags } = useContext(TagContext)
  const { handles } = useContext(HandleContext)
  let postData = data
  if (id) {
    const { data: resData, loading, err } = useApi(`posts/${id}`)

    if (loading) {
      return <div>Loading...</div>
    }

    if (err) {
      return <div>Error: {err}</div>
    }

    postData = resData
  } else if (!data) {
    // true if neither id or data is given
    return <div>Error retrieving post data</div>
  }

  return (
    <PostView
      activity={activity}
      condensed={condensed}
      postData={postData}
      showReplies={showReplies}
      tags={tags}
      handles={handles}
    />
  )
}

export default PostController
