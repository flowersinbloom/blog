import { PLANET_LINK } from '@/constants'
import { GithubOutlined } from '@ant-design/icons'
import { DefaultFooter } from '@ant-design/pro-layout'

const Footer: React.FC = () => {
  const defaultMessage = '城南出品'
  const currentYear = new Date().getFullYear()
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Ant Design Pro',
          title: '知识星球',
          href: `${PLANET_LINK}`,
          blankTarget: true
        },
        {
          key: 'codenav',
          title: '编程导航',
          href: 'https://www.code-nav.cn/',
          blankTarget: true
        },
        {
          key: 'github',
          title: (
            <>
              <GithubOutlined /> 城南 GitHub
            </>
          ),
          href: 'https://github.com/flowersinbloom',
          blankTarget: true
        }
      ]}
    />
  )
}

export default Footer
