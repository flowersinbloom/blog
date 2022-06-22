import Footer from '@/components/Footer'
import { PLANET_LINK, SYSTEM_LOGO } from '@/constants'
import { login } from '@/services/ant-design-pro/api'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-form'
import { message, Tabs } from 'antd'
import React, { useState } from 'react'
import { history, Link, useModel } from 'umi'
import styles from './index.less'

const Login: React.FC = () => {
  const [type, setType] = useState<string>('account')
  const { initialState, setInitialState } = useModel('@@initialState')

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.()

    if (userInfo) {
      await setInitialState(s => ({ ...s, currentUser: userInfo }))
    }
  }

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const user = await login({ ...values, type })

      if (user) {
        const defaultLoginSuccessMessage = '登录成功！'
        message.success(defaultLoginSuccessMessage)
        await fetchUserInfo()
        /** 此方法会跳转到 redirect 参数所在的位置 */

        if (!history) return
        console.log(history)

        const { query } = history.location
        const { redirect } = query as {
          redirect: string
        }
        history.push(redirect || '/admin')
        return
      }
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！'
      message.error(defaultLoginFailureMessage)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src={SYSTEM_LOGO} />}
          title="编程导航知识星球"
          subTitle={
            <a href={PLANET_LINK} target="_blank" rel="noreferrer">
              最好的编程学习知识圈子
            </a>
          }
          initialValues={{
            autoLogin: true
          }}
          onFinish={async values => {
            await handleSubmit(values as API.LoginParams)
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'账号密码登录'} />
          </Tabs>

          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />
                }}
                placeholder={'请输入账号'}
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！'
                  }
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！'
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '密码最小是8位！'
                  }
                ]}
              />
            </>
          )}

          <div
            style={{
              marginBottom: 24
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <Link
              style={{
                float: 'right'
              }}
              to={'/user/register'}
            >
              去注册
            </Link>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  )
}

export default Login
