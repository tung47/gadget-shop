import React from 'react'
import { Alert } from 'react-bootstrap'

import {MessageProps} from '../types'

const Message = ({ variant, children }: MessageProps) => {
  return <Alert variant={variant}>{children}</Alert>
}

export default Message
