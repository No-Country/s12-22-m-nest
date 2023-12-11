'use client'
import { Tabs as TabsUI, Tab } from '@nextui-org/react'
import { type FunctionComponent, type ComponentProps } from 'react'

interface CustomProps {
  items: TabBarItemProps[]
  tabClassName?: string
  tabContentClassName?: string
  cursorClassName?: string
}

type DefaultProps = ComponentProps<typeof TabsUI>
type ExtendedProps = DefaultProps & CustomProps

const Tabs: FunctionComponent<ExtendedProps> = ({ ...props }) => (
  <TabsUI
    selectedKey={props.selectedKey}
    classNames={{
      tab: props.tabClassName,
      tabContent: props.tabContentClassName ?? 'p-4',
      cursor: props.cursorClassName
    }}
    variant={props.variant}
    onSelectionChange={(index) => {
      props.onSelectionChange?.(index)
    }}
    radius='full'
  >
    {props.items?.map(
      ({ title, content, visible = true }, index) =>
        visible && (
          <Tab key={title} title={title} className='px-0'>
            {content}
          </Tab>
        )
    )}
  </TabsUI>
)

export default Tabs
