import { ComponentStory, ComponentMeta } from '@storybook/react'
import MainLayout from './MainLayout'
import ProductDetail from 'src/pages/ProductDetail'
export default {
  title: 'Layouts/MainLayout',
  component: MainLayout,
  argTypes: {
    children: {
      description: 'Body of layout',
      table: { type: { summary: 'React.ReactNode' } }
    }
  }
} as ComponentMeta<typeof MainLayout>

const Template: ComponentStory<typeof MainLayout> = (props) => <MainLayout {...props} />

export const Primary = Template.bind({})
export const PageProductDetail = Template.bind({})

PageProductDetail.args = {
  children: <ProductDetail />
}

PageProductDetail.story = {
  parameters: {
    reactRouter: {
      routePath: '/:nameId',
      routeParams: { nameId: 'Phone-OPPO-A12-3GB32GB--Authentic-i-60afb2426ef5b902180aacb9' }
    }
  }
}
