"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface User {
  id: string
  name: string
  email: string
  role: "ADMINISTRATOR" | "EDITOR"
  isActive: boolean
}

interface UserSelectorProps {
  value?: string
  onValueChange: (value: string) => void
  label?: string
  placeholder?: string
  required?: boolean
  roleFilter?: "ADMINISTRATOR" | "EDITOR" | "ALL"
  error?: string
}

export function UserSelector({
  value,
  onValueChange,
  label = "User",
  placeholder = "Select a user",
  required = false,
  roleFilter = "ALL",
  error,
}: UserSelectorProps) {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users")
        const data = await response.json()

        if (data.success) {
          let filteredUsers = data.users.filter((user: User) => user.isActive)

          if (roleFilter !== "ALL") {
            filteredUsers = filteredUsers.filter((user: User) => user.role === roleFilter)
          }

          setUsers(filteredUsers)
        }
      } catch (error) {
        console.error("Error fetching users:", error)
      } finally {
        setLoading(false)
      }
    }

    void fetchUsers()
  }, [roleFilter]) // Add roleFilter as dependency since it affects the filtered results

  if (loading) {
    return (
      <div className="space-y-2">
        <Label>{label}</Label>
        <Select disabled>
          <SelectTrigger>
            <SelectValue placeholder="Loading users..." />
          </SelectTrigger>
        </Select>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <Label>
        {label} {required && "*"}
      </Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className={error ? "border-red-500" : undefined}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {!required && <SelectItem value="none">No User</SelectItem>}
          {users.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              {user.name} ({user.role.toLowerCase()}) - {user.email}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
