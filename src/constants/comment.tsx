/**
 * @file Comment constant
 * @author Surmon <https://github.com/surmon-china>
 */

import React from 'react'
import {
  DeleteOutlined,
  EditOutlined,
  CheckOutlined,
  StopOutlined,
} from '@ant-design/icons'
import { GeneralExtend } from './general'

/** 留言板 */
export const COMMENT_GUESTBOOK_POST_ID = 0

/** 单个评论 */
export interface Comment {
  ip?: number
  id?: number
  _id?: string
  pid?: number
  post_id: number
  content: string
  agent: string
  state: CommentState
  likes: number
  dislikes: number
  author: {
    name: string
    site?: string
    email?: string
    email_hash: string | null
  }
  ip_location?: Partial<{
    country: string
    country_code: string
    region: string
    region_code: string
    city: string
    zip: string
  }>
  update_at?: string
  create_at?: string
  extends: Array<GeneralExtend>
}

/** 评论状态 */
export enum CommentState {
  Auditing = 0, // 待审核
  Published = 1, // 通过正常
  Deleted = -1, // 已删除
  Spam = -2, // 垃圾评论
}

const commentStateMap = new Map(
  [
    {
      id: CommentState.Auditing,
      name: '待审核',
      icon: <EditOutlined />,
      color: 'blue',
    },
    {
      id: CommentState.Published,
      name: '已发布',
      icon: <CheckOutlined />,
      color: 'green',
    },
    {
      id: CommentState.Spam,
      name: '垃圾评论',
      icon: <StopOutlined />,
      color: 'red',
    },
    {
      id: CommentState.Deleted,
      name: '回收站',
      icon: <DeleteOutlined />,
      color: 'orange',
    },
  ].map((item) => [item.id, item])
)

export const cs = (state: CommentState) => {
  return commentStateMap.get(state)!
}

export const commentStates = Array.from<ReturnType<typeof cs>>(commentStateMap.values())
