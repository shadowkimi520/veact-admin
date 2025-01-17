/**
 * @file System store
 * @author Surmon <https://github.com/surmon-china>
 */

import nodepress from '@/services/nodepress'
import { Option } from '@/constants/option'

export const OPTION_API_PATH = '/option'
export const ARCHIVE_API_PATH = '/archive'
export const EXPANSION_API_PATH = {
  UP_TOKEN: '/expansion/uptoken',
  STATISTIC: '/expansion/statistic',
  GOOGLE_TOKEN: '/expansion/google-token',
  DATA_BASE_BACKUP: '/expansion/database-backup',
}

export interface Statistics {
  [key: string]: number
}
/** 获取全站统计信息 */
export function getStatistics() {
  return nodepress
    .get<Statistics>(EXPANSION_API_PATH.STATISTIC)
    .then((response) => response.result)
}

export interface ArticleCalendarItem {
  date: string
  count: number
}
/** 获取文章创作日历信息 */
export function getArticleCalendar() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  return nodepress
    .get<Array<ArticleCalendarItem>>('/article/calendar', { params: { timezone } })
    .then((response) => response.result)
}

/** 获取 GA Token */
export function getGAToken(): Promise<string> {
  return nodepress
    .get<any>(EXPANSION_API_PATH.GOOGLE_TOKEN)
    .then(({ result: credentials }) => credentials.access_token as string)
}

/** 更新 Archive 缓存 */
export function updateArchiveCache() {
  return nodepress.patch<void>(ARCHIVE_API_PATH).then((response) => response.result)
}

/** 更新数据库备份 */
export function updateDatabaseBackup() {
  return nodepress
    .patch(EXPANSION_API_PATH.DATA_BASE_BACKUP)
    .then((response) => response.result)
}

/** 获取系统配置 */
export function getOption() {
  return nodepress.get<Option>(OPTION_API_PATH).then((response) => response.result)
}

/** 更新系统配置 */
export function putOption(option: Option) {
  return nodepress
    .put<Option>(OPTION_API_PATH, option)
    .then((response) => response.result)
}

export interface AliYunOSSUpToken {
  AccessKeyId: string
  AccessKeySecret: string
  SecurityToken: string
  Expiration: string
}

/** 获取 AliYun OSS 上传 Token */
export function getOSSUpToken() {
  return nodepress
    .get<AliYunOSSUpToken>(EXPANSION_API_PATH.UP_TOKEN)
    .then((response) => response.result)
}
