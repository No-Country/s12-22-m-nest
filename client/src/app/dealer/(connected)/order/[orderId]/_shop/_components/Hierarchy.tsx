import { type FunctionComponent } from 'react'
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'

const Hierarchy: FunctionComponent = () => (
    <Breadcrumbs>
        <BreadcrumbItem>Pedido en curso</BreadcrumbItem>
        <BreadcrumbItem>En la tienda</BreadcrumbItem>
    </Breadcrumbs>
)

export default Hierarchy
