import { Button, Input } from "~/components"

export default function Home() {
  return (
    <div>
      <Input label="Name" name="name" />
      <Input label="Bio" name="bio" type="textarea" />
      <Input label="Age" name="age" type="number" />
      <Button>Click me!</Button>
    </div>
  )
}
