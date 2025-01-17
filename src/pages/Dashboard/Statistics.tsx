import React from 'react'
import { useRef, onMounted } from 'veact'
import { useLoading } from 'veact-use'
import { Row, Col, Card, Statistic, Space, Divider } from 'antd'
import { HeartOutlined, CommentOutlined, CoffeeOutlined } from '@ant-design/icons'
import { APP_LAYOUT_GUTTER_SIZE } from '@/config'
import { Statistics, getStatistics } from '@/store/system'

import styles from './style.module.less'

export const StatisticsComponent: React.FC = () => {
  const statistics = useRef<Statistics>({})
  const loading = useLoading()

  const fetchStatistics = () => {
    loading.promise(getStatistics()).then((result) => {
      statistics.value = result
    })
  }

  onMounted(() => {
    fetchStatistics()
  })

  return (
    <Row gutter={APP_LAYOUT_GUTTER_SIZE} className={styles.statistic}>
      <Col span={6}>
        <Card bordered={false} className={styles.statisticCard}>
          <Space size="middle">
            <Statistic
              loading={loading.state.value}
              title="今日阅读"
              value={statistics.value.todayViews}
            />
            <Divider type="vertical" />
            <Statistic
              loading={loading.state.value}
              title="累计文章阅读"
              value={statistics.value.totalViews}
            />
          </Space>
        </Card>
      </Col>
      <Col span={6}>
        <Card bordered={false} className={styles.statisticCard}>
          <Row>
            <Col span={16}>
              <Statistic
                loading={loading.state.value}
                title="累计获得喜欢"
                value={statistics.value.totalLikes}
              />
            </Col>
            <Col span={8} className={styles.icon}>
              <HeartOutlined />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={6}>
        <Card bordered={false} className={styles.statisticCard}>
          <Row>
            <Col span={16}>
              <Statistic
                loading={loading.state.value}
                title="全站评论"
                value={statistics.value.comments}
              />
            </Col>
            <Col span={8} className={styles.icon}>
              <CommentOutlined />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={6}>
        <Card bordered={false} className={styles.statisticCard}>
          <Row>
            <Col span={16}>
              <Statistic
                loading={loading.state.value}
                title={
                  <>
                    全站文章
                    <Divider type="vertical" />
                    标签
                  </>
                }
                value={statistics.value.articles}
                suffix={
                  <>
                    <Divider type="vertical" />
                    &nbsp;
                    {statistics.value.tags}
                  </>
                }
              />
            </Col>
            <Col span={8} className={styles.icon}>
              <CoffeeOutlined />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}
