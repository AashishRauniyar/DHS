/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"
import { Plus, Edit, Trash2, User, Shield, Users, Mail, Calendar, FileText } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface UserType {
  id: string
  email: string
  name: string
  role: "ADMINISTRATOR" | "EDITOR"
  isActive: boolean
  createdAt: string
  updatedAt: string
  _count: {
    articles: number
  }
}

interface UserFormData {
  email: string
  name: string
  role: "ADMINISTRATOR" | "EDITOR"
  isActive: boolean
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserType[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<UserType | null>(null)
  const [formData, setFormData] = useState<UserFormData>({
    email: "",
    name: "",
    role: "EDITOR",
    isActive: true,
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/users")
      const data = await response.json()

      if (data.success) {
        setUsers(data.users)
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to fetch users",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching users:", error)
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email.trim() || !formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Email and name are required",
        variant: "destructive",
      })
      return
    }

    try {
      const url = editingUser ? `/api/users/${editingUser.id}` : "/api/users"
      const method = editingUser ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success",
          description: `User ${editingUser ? "updated" : "created"} successfully`,
        })
        setIsDialogOpen(false)
        resetForm()
        fetchUsers()
      } else {
        toast({
          title: "Error",
          description: data.message || `Failed to ${editingUser ? "update" : "create"} user`,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error saving user:", error)
      toast({
        title: "Error",
        description: `Failed to ${editingUser ? "update" : "create"} user`,
        variant: "destructive",
      })
    }
  }

  const handleEdit = (user: UserType) => {
    setEditingUser(user)
    setFormData({
      email: user.email,
      name: user.name,
      role: user.role,
      isActive: user.isActive,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success",
          description: "User deleted successfully",
        })
        fetchUsers()
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to delete user",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting user:", error)
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      email: "",
      name: "",
      role: "EDITOR",
      isActive: true,
    })
    setEditingUser(null)
  }

  const getRoleIcon = (role: string) => {
    return role === "ADMINISTRATOR" ? <Shield className="h-4 w-4" /> : <User className="h-4 w-4" />
  }

  const getRoleBadge = (role: string) => {
    if (role === "ADMINISTRATOR") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
          <Shield className="h-3 w-3" />
          Administrator
        </span>
      )
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
        <User className="h-3 w-3" />
        Editor
      </span>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="animate-pulse space-y-6">
            <div className="flex justify-between items-center">
              <div className="h-10 bg-slate-200 rounded-lg w-64"></div>
              <div className="h-10 bg-slate-200 rounded-lg w-32"></div>
            </div>
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-slate-200 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-5 bg-slate-200 rounded w-48"></div>
                      <div className="h-4 bg-slate-200 rounded w-64"></div>
                      <div className="h-3 bg-slate-200 rounded w-32"></div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="h-8 w-16 bg-slate-200 rounded"></div>
                      <div className="h-8 w-8 bg-slate-200 rounded"></div>
                      <div className="h-8 w-8 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">User Management</h1>
            <p className="text-slate-600">Manage user accounts and permissions</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="bg-blue-600 hover:bg-blue-700 shadow-lg text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">
                  {editingUser ? "Edit User" : "Add New User"}
                </DialogTitle>
                <DialogDescription className="text-slate-600">
                  {editingUser ? "Update the user information below." : "Create a new user account for the system."}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="user@example.com"
                      className="h-11"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-slate-700">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter full name"
                      className="h-11"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="role" className="text-sm font-medium text-slate-700">
                      Role
                    </Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value: "ADMINISTRATOR" | "EDITOR") =>
                        setFormData((prev) => ({ ...prev, role: value }))
                      }
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EDITOR">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Editor
                          </div>
                        </SelectItem>
                        <SelectItem value="ADMINISTRATOR">
                          <div className="flex items-center gap-2">
                            <Shield className=" h-4 w-4" />
                            Administrator
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border">
                    <div className="space-y-1">
                      <Label htmlFor="isActive" className="text-sm font-medium text-slate-700">
                        Account Status
                      </Label>
                      <p className="text-xs text-slate-500">
                        {formData.isActive ? "User can access the system" : "User access is disabled"}
                      </p>
                    </div>
                    <Switch
                      id="isActive"
                      checked={formData.isActive}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isActive: checked }))}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                    {editingUser ? "Update" : "Create"} User
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Users List */}
        <div className="space-y-4">
          {users.length === 0 ? (
            <Card className="shadow-lg border-0 bg-white">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-10 w-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">No Users Found</h3>
                <p className="text-slate-500 mb-6 max-w-md mx-auto">
                  Get started by creating your first user account. You can manage roles and permissions once users are
                  added.
                </p>
                <Button onClick={() => setIsDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add First User
                </Button>
              </CardContent>
            </Card>
          ) : (
            users.map((user) => (
              <Card
                key={user.id}
                className="shadow-sm hover:shadow-md transition-shadow duration-200 border-0 bg-white"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* User Info */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-lg">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg text-slate-900 truncate">{user.name}</h3>
                          {getRoleBadge(user.role)}
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-slate-600 mb-2">
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            <span className="truncate">{user.email}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="h-4 w-4" />
                            <span>{user._count.articles} articles</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Calendar className="h-3 w-3" />
                          <span>Created {new Date(user.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                          user.isActive
                            ? "bg-green-100 text-green-800 border border-green-200"
                            : "bg-red-100 text-red-800 border border-red-200"
                        }`}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </div>

                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(user)}
                          className="h-9 w-9 p-0 hover:bg-blue-50 hover:border-blue-200"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-9 w-9 p-0 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete User</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete <strong>{user.name}</strong>? This action cannot be
                                undone.
                                {user._count.articles > 0 && (
                                  <span className="block mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800">
                                    <strong>Warning:</strong> This user has {user._count.articles} articles that must be
                                    reassigned or deleted first.
                                  </span>
                                )}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(user.id)}
                                disabled={user._count.articles > 0}
                                className="bg-red-800 text-white hover:bg-red"
                              >
                                Delete User
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
