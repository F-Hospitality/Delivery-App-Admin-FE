export type ColumnDefinition = {
    id: string
    header: string
    accessorKey: string
    cell?: (info: any) => React.ReactNode
    enableSorting?: boolean
  }
  
  export type DetailViewConfig = {
    enabled: boolean
    idField?: string
    title?: (item: any) => string
    content?: (item: any) => React.ReactNode
  }
  
    export type DataTableProps = {
    data: any[]
    columns: ColumnDefinition[]
    tableType?: string
    detailView?: DetailViewConfig
    isControl?: boolean
    actions?: {
      view?: boolean
      edit?: boolean
      delete?: boolean
      custom?: (item: any) => React.ReactNode
    }
    onView?: (item: any) => void
    onEdit?: (item: any) => void
    onDelete?: (item: any) => void
    onRowClick?: (item: any) => void
    onAssignOrder?: (item: any, riderId: string) => void
    onChangeOrderStatus?: (item: any, status: string) => void
  }