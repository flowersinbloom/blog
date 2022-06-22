import { currentUser } from '@/services/ant-design-pro/api'
import { uploadFile2COS } from '@/utils'
import { UploadOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Form, Input, message, Radio, Upload } from 'antd'
import { useEffect, useState } from 'react'
const UserInfo: React.FC = () => {
  const [userFile, setUserFile] = useState<string>()
  const [avatarFile, setAvatarFile] = useState<object>()
  const [avatarUrl, setAvatarUrl] = useState<string>()
  const [userForm] = Form.useForm()

  useEffect(() => {
    const getUserForm = async () => {
      const res = await currentUser()
      userForm.setFieldsValue({
        email: res.email!,
        gender: res.gender!,
        phone: res.phone!,
        userInfo: res.userInfo!,
        username: res.username!
      })
    }
    getUserForm()
  }, [userForm])

  useEffect(() => {
    setAvatarUrl(avatarUrl)
  }, [avatarUrl])

  const props = {
    name: 'avatarUrl',
    headers: {
      authorization: 'authorization-text'
    },
    maxCount: 1,

    onRemove: () => {
      setUserFile('')
      setAvatarFile({})
    },

    beforeUpload: (file: any) => {
      // 允许当作头像进行上传的图片类型
      const allowTypes = ['image/jpeg', 'image/png', 'image/gif']
      // 判断当前选择的文件类型，是否为允许的文件类型
      const isAllowType = allowTypes.includes(file.type)
      // 判断文件大小是否在 2M 之内
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isAllowType) {
        message.error('上传头像图片只能是 JPG/PNG/GIF 格式!')
        // 阻止 upload 自带的头像上传行为
        return false
      }

      if (!isLt2M) {
        message.error('上传头像图片大小不能超过 2MB!')
        // 阻止 eupload 自带的头像上传行为
        return false
      }

      // 1. 把用户选中的文件，显示到页面上
      setUserFile(URL.createObjectURL(file))

      // 2. 把用户选中的文件，存储到 data 中，供上传时候使用
      setAvatarFile(file)

      // 阻止 upload 自带的头像上传行为
      return false
    }
  }
  const onFinish = async (values: any) => {
    // 证明选择了要上传的头像
    if (avatarFile) {
      // 需要调用文件上传的函数
      // console.log('选择了头像')
      const uploadResult = await uploadFile2COS(avatarFile)
      // 把 COS 图片的访问地址，存储到 this.form 表单中
      const avatarSrc = 'https://' + uploadResult.Location
      setAvatarUrl(avatarSrc)
    }
    const a = { ...values, avatarUrl: avatarUrl }
    console.log(a)
    // const res = await edit({ ...values, avatarUrl: avatarUrl })
    // console.log(res)
    // setAvatarUrl(res.avatarUrl)

    // setUserForm({
    //   avatarUrl: res.avatarUrl!,
    //   email: res.email!,
    //   gender: res.gender!,
    //   phone: res.phone!,
    //   userInfo: res.userInfo!,
    //   username: res.username!
    // })
  }

  const onFinishFailed = () => {
    message.error('修改失败')
  }

  // const genderChange = (e: any) => {
  //   setUserForm({ ...userForm, gender: e.target.value })
  // }
  // const nameChange = (e: any) => {
  //   setUserForm({ ...userForm, username: e.target.value })
  // }
  // const phoneChange = (e: any) => {
  //   setUserForm({ ...userForm, phone: e.target.value })
  // }
  // const emailChange = (e: any) => {
  //   setUserForm({ ...userForm, email: e.target.value })
  // }
  // const infoChange = (e: any) => {
  //   setUserForm({ ...userForm, userInfo: e.target.value })
  // }
  const formChange = (e: any) => {
    // console.log(e)
    // console.log(userForm)
  }
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }
  return (
    <>
      <Form
        name="userInfo"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        form={userForm}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={formChange}
        autoComplete="off"
      >
        <Form.Item label={'用户头像'} name="avatarUrl" valuePropName="fileList" getValueFromEvent={normFile}>
          <>
            <Avatar size={64} icon={<UserOutlined />} src={userFile ? userFile : avatarUrl} />
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>上传头像</Button>
            </Upload>
          </>
        </Form.Item>
        <Form.Item label="用户名" name="username">
          <Input />
        </Form.Item>
        <Form.Item label="性别" name="gender">
          <Radio.Group>
            <Radio value={0}>男</Radio>
            <Radio value={1}>女</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="手机号" name="phone">
          <Input />
        </Form.Item>
        <Form.Item label="电子邮件" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="自我介绍" name="userInfo">
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            修改
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default UserInfo
