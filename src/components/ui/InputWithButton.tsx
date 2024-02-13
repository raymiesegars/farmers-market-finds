import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function InputWithButton() {
  return (
    <div className="flex w-full md:w-3/5 items-center space-x-2">
      <Input type="text" placeholder="Search Upcoming Farmers Markets Now!" />
      <Button type="submit">Search</Button>
    </div>
  )
}
