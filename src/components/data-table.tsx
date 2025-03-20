"use client"

import type React from "react"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Pencil, Trash2, Eye } from "lucide-react"
import Image from "next/image"

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

type DataTableProps = {
  data: any[]
  columns: ColumnDefinition[]
  tableType?: string
  detailView?: DetailViewConfig
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
}

export function DataTable({
  data,
  columns,
  tableType = "default",
  detailView = { enabled: false },
  actions = { view: false, edit: true, delete: true },
  onView,
  onEdit,
  onDelete,
  onRowClick,
}: DataTableProps) {
  const [selectedItem, setSelectedItem] = useState<any | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleItemClick = (item: any) => {
    if (onRowClick) {
      onRowClick(item)
      return
    }

    if (detailView.enabled) {
      setSelectedItem(item)
      setIsModalOpen(true)
    }
  }

  const handleViewClick = (e: React.MouseEvent, item: any) => {
    e.stopPropagation()
    if (onView) {
      onView(item)
    } else if (detailView.enabled) {
      setSelectedItem(item)
      setIsModalOpen(true)
    }
  }

  const handleEditClick = (e: React.MouseEvent, item: any) => {
    e.stopPropagation()
    if (onEdit) {
      onEdit(item)
    }
  }

  const handleDeleteClick = (e: React.MouseEvent, item: any) => {
    e.stopPropagation()
    if (onDelete) {
      onDelete(item)
    }
  }

  const getDetailTitle = () => {
    if (!selectedItem) return ""
    if (detailView.title) return detailView.title(selectedItem)

    // Default titles based on table type
    if (tableType === "orders") return `Order #${selectedItem[detailView.idField || "orderId"]}`
    if (tableType === "customers") return `Customer: ${selectedItem.name || selectedItem.fullName}`
    if (tableType === "riders") return `Rider: ${selectedItem.name || selectedItem.fullName}`
    if (tableType === "inventory") return `Product: ${selectedItem.name}`

    return `Details #${selectedItem.id || ""}`
  }

  return (
    <>
      <div className="rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              {columns.map((column) => (
                <TableHead key={column.id} className="font-medium text-base py-4 px-6">
                  {column.header}
                </TableHead>
              ))}
              {(actions.view || actions.edit || actions.delete || actions.custom) && (
                <TableHead className="text-right py-4 px-6">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + (actions ? 1 : 0)} className="h-32 text-center">
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className={`${detailView.enabled || onRowClick ? "cursor-pointer hover:bg-muted/50" : ""} ${
                    rowIndex % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                  }`}
                  onClick={() => handleItemClick(row)}
                >
                  {columns.map((column) => (
                    <TableCell key={column.id} className="py-4 px-6">
                      {column.cell ? column.cell(row) : row[column.accessorKey]}
                    </TableCell>
                  ))}
                  {(actions.view || actions.edit || actions.delete || actions.custom) && (
                    <TableCell className="text-right py-4 px-6">
                      <div className="flex justify-end gap-3">
                        {actions.view && (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={(e) => handleViewClick(e, row)}
                            className="h-9 w-9 text-muted-foreground"
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                        )}
                        {actions.edit && onEdit && (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={(e) => handleEditClick(e, row)}
                            className="h-9 w-9 text-muted-foreground"
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        )}
                        {actions.delete && onDelete && (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={(e) => handleDeleteClick(e, row)}
                            className="h-9 w-9 text-destructive border-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        )}
                        {actions.custom && actions.custom(row)}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Detail View Modal */}
      {detailView.enabled && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{getDetailTitle()}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {selectedItem && (
                <>
                  {detailView.content ? (
                    detailView.content(selectedItem)
                  ) : (
                    // Default content based on table type
                    <DefaultDetailContent item={selectedItem} tableType={tableType} />
                  )}
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

// Default detail content component based on table type
function DefaultDetailContent({ item, tableType }: { item: any; tableType: string }) {
  if (tableType === "orders") {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">Order Date</h3>
            <p>{item.orderDate}</p>
          </div>
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">Status</h3>
            <p>{item.orderStatus}</p>
          </div>
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">Total Amount</h3>
            <p>{item.totalAmount}</p>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-sm text-muted-foreground mb-2">Customer Information</h3>
          <div className="bg-muted p-3 rounded-md">
            <p>{item.customerInformation}</p>
          </div>
        </div>

        {item.items && (
          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-2">Order Items</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {item.items.map((orderItem: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{orderItem.name}</TableCell>
                    <TableCell>{orderItem.quantity}</TableCell>
                    <TableCell>{orderItem.price}</TableCell>
                    <TableCell className="text-right">{orderItem.subtotal}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    )
  }

  if (tableType === "customers") {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4 mb-4">
          {item.avatar && (
            <div className="h-16 w-16 rounded-full overflow-hidden">
              <Image
                src={item.avatar || "/placeholder.svg"}
                alt={item.name || "Customer"}
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
          )}
          <div>
            <h2 className="text-xl font-semibold">{item.name || item.fullName}</h2>
            <p className="text-muted-foreground">{item.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">Phone</h3>
            <p>{item.phone}</p>
          </div>
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">Customer Since</h3>
            <p>{item.joinDate}</p>
          </div>
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">Total Orders</h3>
            <p>{item.totalOrders}</p>
          </div>
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">Total Spent</h3>
            <p>{item.totalSpent}</p>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-sm text-muted-foreground mb-2">Address</h3>
          <div className="bg-muted p-3 rounded-md">
            <p>{item.address}</p>
          </div>
        </div>
      </div>
    )
  }

  if (tableType === "riders") {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4 mb-4">
          {item.avatar && (
            <div className="h-16 w-16 rounded-full overflow-hidden">
              <Image
                src={item.avatar || "/placeholder.svg"}
                alt={item.name || "Rider"}
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
          )}
          <div>
            <h2 className="text-xl font-semibold">{item.name || item.fullName}</h2>
            <p className="text-muted-foreground">{item.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">Phone</h3>
            <p>{item.phone}</p>
          </div>
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">Status</h3>
            <p>{item.status}</p>
          </div>
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">Vehicle Type</h3>
            <p>{item.vehicleType}</p>
          </div>
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">License Number</h3>
            <p>{item.licenseNumber}</p>
          </div>
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">Total Deliveries</h3>
            <p>{item.totalDeliveries}</p>
          </div>
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">Rating</h3>
            <p>{item.rating} / 5</p>
          </div>
        </div>
      </div>
    )
  }

  if (tableType === "inventory") {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4 mb-4">
          {item.image && (
            <div className="h-24 w-24 rounded-md overflow-hidden">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
          )}
          <div>
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-muted-foreground">{item.category}</p>
            <p className="font-medium text-lg">{item.price}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">SKU</h3>
            <p>{item.sku || "N/A"}</p>
          </div>
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">Stock</h3>
            <p>{item.stock || "N/A"}</p>
          </div>
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">Status</h3>
            <p>{item.status ? "Active" : "Inactive"}</p>
          </div>
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">Recommended</h3>
            <p>{item.recommended ? "Yes" : "No"}</p>
          </div>
        </div>

        {item.description && (
          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-2">Description</h3>
            <div className="bg-muted p-3 rounded-md">
              <p>{item.description}</p>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Generic fallback for other table types
  return (
    <div className="space-y-4">
      {Object.entries(item).map(([key, value]) => (
        <div key={key}>
          <h3 className="font-medium text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1")}</h3>
          <p>{String(value)}</p>
        </div>
      ))}
    </div>
  )
}